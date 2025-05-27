'use client'
import React from 'react'
import Image from 'next/image'
import NextIcon from '@/public/images/next.svg'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/app/firebase'
import { getDocs, collection, where, query, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import LoadingPage from '../LoadingPage/LoadingPage'
import Adventure from '../Adventure/Adventure'
import Fantasy from '../Fantasy/Fantasy'
import Scifi from '../Scifi/Scifi'
import '@/app/components/LoadingPage/LoadingPage.css'


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

/*async function getUserMovieList(userId: string) {
    try {
        if (!userId) throw new Error("User ID is missing");

        // 1. Create a query: Get all movies where userId matches
        const q = query(collection(db, "list"), where("userId", "==", userId));
        const snapshot = await getDocs(q);

        // 2. Map the documents to movie objects
        const movies = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id, // this is the Firestore document ID, not the movie ID
                ...data.movie, // spread the movie object saved inside
            };
        });

        return movies; // returns Movie[]
    } catch (error) {
        console.error("Error fetching user movie list:", error);
        return []; // return empty array if there was an error
    }
}
*/

type Movie = {
    id: number
    title: string
    poster_path: string
    overview: string
    release_date: string
    backdrop_path: string
    genre_ids: number[]
}



const Firstpage = () => {

    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [active, setActive] = useState<Movie | null>(null)
    const [email, setEmail] = useState<string | null | undefined>("")
    const [load, setLoad] = useState(true)
    const router = useRouter()

    // const [user, setUse]

    const Numnum = ['1', '2', '3', '4', '5', '6']


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('./Signin')
                return
            }
            setEmail(user?.email)
            setLoad(false)

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
                    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
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

    const filteredAction = movies.filter((movie: Movie) =>
        movie.genre_ids.includes(28)
    )

    

    const handleClick = (movie: Movie) => {
        setActive(movie)
        setIsClicked(true)
    }

    if (load) {
        return (
            <LoadingPage />
        )
    }

    const handleButtonClick = (id: string, movie: Movie) => {
        createUserList(id, movie).then(() => {
            console.log("done");

        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <main className='text-white '>
            <section className=''>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={{
                        delay: 5000, // 5 seconds between slides
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation
                    // spaceBetween={30}
                    slidesPerView={1}
                    loop
                    className=" overflow-hidden shadow-xl"
                >
                    {!loading && movies.map((movie, index) => (
                        <section key={index}>

                            <SwiperSlide key={movie.id} className=''>
                                <Link href={`/components/${movie.id}`}>
                                    <div
                                        className="h-[320px] mb-0 bg-cover bg-center cursor-pointer shadow-md relative"
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "top"
                                        }}
                                    >

                                        <div className='top-28 left-5 absolute'>
                                            <div className='rounded-lg w-[150] h-[250]' style={{
                                                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                            }} ></div>
                                            <div className='w-[500px]'>
                                                <p className='text-3xl font-bold'>{movie.title}</p>
                                                <p>{movie.overview}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>

                        </section>

                    ))}
                </Swiper>
                <div className='absolute top-2 right-4 z-30'>
                    <Link href="./MyList" className='hover:cursor-pointer p-3 py-2 rounded-md bg-red-600'>My List</Link>
                </div>

                {loading && (
                    <div className=" overflow-auto">
                        <div
                            className="min-w-[130px] h-[170px] bg-neutral-400 "
                        ></div>
                    </div>
                )}
            </section>

            <hr className='border-1 text-white w-full' />
            <section className=' pl-10 z-20 bg-gradient-to-b from-blue-950 to-black'>
            <Adventure/>
                    <section>
                        <p className='text-3xl font-bold pt-7 pb-3'>Action</p>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            pagination={{ clickable: true }}
                            navigation
                            spaceBetween={30}
                            slidesPerView={6}
                            loop
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 6 },
                                1024: { slidesPerView: 5 },
                            }}
                            className="rounded-2xl overflow-hidden shadow-xl"
                        >
                            {!loading &&
                                filteredAction.map((movie) => (
                                    <SwiperSlide key={movie.id}>
                                        <div
                                            onClick={() => handleClick(movie)}
                                            className="min-w-[130px] h-[170px] rounded-md mb-7 bg-cover bg-center cursor-pointer shadow-md relative"
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

                            {loading && (
                                <div className="flex justify-between gap-[20px] mb-7 overflow-auto">
                                    {Numnum.map((value, index) => (
                                        <div
                                            key={index}
                                            className="min-w-[130px] h-[170px] bg-neutral-400 rounded-md"
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </Swiper>

                        {/* {isClicked && active && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
                                s;dkcnwelfnqeifhqeiojfiqejfqwpiofj
                                <div className="bg-neutral-800 border border-white p-6 rounded-xl max-w-xl text-white relative">
                                    <button
                                        className="absolute top-3 right-3 text-xl hover:bg-neutral-600 rounded-full p-1"
                                        onClick={() => setIsClicked(false)}
                                    >
                                        ✕
                                    </button>
                                    <h2 className="text-2xl font-bold mb-4">{active.title}</h2>
                                    <p className="mb-4">{active.overview || 'No plot available'}</p>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Release Datae: {active.release_date}
                                    </p>
                                    { }
                                    <div className='flex'>
                                        <Link href="/components/Selected" className="inline-block">
                                        <button onClick={() => createUserList(userId, active)} className='text-3xl text-red-600'>Add to Favourites</button>
                                            <button className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition">
                                                Watch Now hhh
                                                <Image src={NextIcon} width={20} height={20} alt="next" />
                                            </button>
                                        </Link>
                                        
                                    </div>
                                   
                                </div>
                            </div>
                        )} */}
                    </section>

                   <Fantasy/>
                   <Scifi/>

                        {isClicked && active && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
                                <div className="bg-neutral-800 border border-white p-6 rounded-xl max-w-xl text-white relative">
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
                                    <div className='flex'>

                                        <button onClick={() => {
                                            if (email) {

                                                handleButtonClick(email, active)
                                            }
                                        }} className=' bg-red-700 hover:bg-red-600 py-2 px-3 rounded-md mr-2'>Add to Favourites</button>
                                        <Link href={`/components/${active.id}`}>
                                            <button className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition">
                                                Watch Now
                                                <Image src={NextIcon} width={20} height={20} alt="next" />
                                            </button>
                                        </Link>


                                    </div>
                                </div>
                            </div>
                        )}
                    
                    </section>
            <button onClick={() => signOut(auth)}>sign out</button>
        </main>
    )
}

export default Firstpage