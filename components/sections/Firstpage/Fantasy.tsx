'use client'
import React from 'react'
import Image from 'next/image'
import NextIcon from '@/public/images/next.svg'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/app/firebase'
import { getDocs, collection, where, query, addDoc } from 'firebase/firestore'


type Movie = {
    id: number
    title: string
    poster_path: string
    overview: string
    release_date: string
    backdrop_path: string
    genre_ids: number[]
}

const createUserList = async (id: string | null | undefined, movie: Movie) => {
    try {
        if (!id) throw new Error("User ID is missing");
        if (!movie || !movie.id) throw new Error("Movie data is incomplete");

        // 1. First get all movies for this user
        const q = query(collection(db, "list"), where("userId", "==", id));
        const snapshot = await getDocs(q);

        // 2. Check if the movie already exists
        const movieAlreadyExists = snapshot.docs.some(doc => {
            const data = doc.data();
            return data.movie?.id === movie.id;
        });

        if (movieAlreadyExists) {
            alert("Movie already in your list!");
            return;
        }

        // 3. If not, add the movie
        const docRef = await addDoc(collection(db, "list"), {
            userId: id,
            movie
        });

        console.log("Document written with ID:", docRef.id);
        alert("Success!");
    } catch (err) {
        console.error("Error adding document:", err);
    }
};


const Fantasy = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [active, setActive] = useState<Movie | null>(null)
    const [email, setEmail] = useState<string | null | undefined>("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setEmail(user?.email)
        })
    })

    useEffect(() => {
        const fetchDetails = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTNiNzMxODQzZjgyYTI5ZTBkZjZhODlmOTkzMjlkNCIsIm5iZiI6MTc0NDI5NTM0Ny43MDEsInN1YiI6IjY3ZjdkNWIzZDNhYjdkN2E4YmFkNTJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gPACKRazm9HtNi8UeezxgYRzoCl18zXvmShmVGR4jw',
                },
            }

            try {
                const res = await fetch(
                    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14',
                    options
                )
                const data = await res.json()
                setMovies(data.results)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        fetchDetails()
    }, [])


    const handleClick = (movie: Movie) => {
        setActive(movie)
        setIsClicked(true)
    }

    const handleButtonClick = (id: string, movie: Movie) => {
        createUserList(id, movie).then(() => {
            console.log("done");

        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <main >
            <section>
                <p className='text-3xl font-bold pt-7 pb-3'>Fantasy</p>
                <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                    //navigation
                    spaceBetween={30}
                    slidesPerView={6}
                    loop
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        414: { slidesPerView: 3 },
                        480: { slidesPerView: 3 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 6 },
                        1024: { slidesPerView: 6 },
                        1280: { slidesPerView: 6 },
                        1600: { slidesPerView: 8 },
                    }}

                    className=" overflow-hidden shadow-xl"
                >
                    {!loading && movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div
                                onClick={() => handleClick(movie)}
                                className="min-w-[100px] h-[170px] md:h-[250px] rounded-md mb-7 bg-cover bg-center cursor-pointer shadow-md relative"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                                }}
                            >
                                <div className="absolute bottom-0 bg-black/60 w-full text-white text-xs text-center py-1">
                                    {movie.title}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

                {isClicked && active && movies.map((movie, index) =>
                (
                    <div key={index} className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
                        <div className="bg-neutral-800 border border-white rounded-xl max-w-xl text-white relative bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${active.poster_path})`,
                            }}>
                                <section className='p-6 bg-black/40'>
                            <button
                                className="absolute top-3 right-3 text-xl hover:bg-neutral-600 rounded-full p-1"
                                onClick={() => setIsClicked(false)}
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold mb-4">{active.title}</h2>
                            <p className="mb-4">{active.overview || 'No plot available'}</p>
                            <p className="text-sm text-gray-400 mb-4">
                                Release Date: {active.release_date}
                            </p>
                            <button onClick={() => {
                                if (email) {
                                    handleButtonClick(email, active)
                                }
                            }} className=' bg-red-700 hover:bg-red-600 py-2 px-3 rounded-md mr-2'>Add to My List</button>
                            <Link
                                href={`/components/${active.id}`}
                                key={movie.id}
                                className="inline-block">
                                <button className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition">
                                    See More
                                    <Image src={NextIcon} width={20} height={20} alt="next" />
                                </button>
                            </Link>
                            </section>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Fantasy