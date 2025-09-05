'use client'
import React from 'react'
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
import Adventure from './Adventure'
import Fantasy from './Fantasy'
import Scifi from './Scifi'
import '@/components/sections/LoadingPage/LoadingPage.css'
import { toast } from 'sonner'
import { FaChevronRight } from 'react-icons/fa'


const createUserList = async (id: string | null | undefined, movie: Movie) => {
    try {
        if (!id) throw new Error("User ID is missing");
        if (!movie || !movie.id) throw new Error("Movie data is incomplete");
        const q = query(collection(db, "list"), where("userId", "==", id));
        const snapshot = await getDocs(q);
        const movieAlreadyExists = snapshot.docs.some(doc => {
            const data = doc.data();
            return data.movie?.id === movie.id;
        });

        if (movieAlreadyExists) {
            toast("Movie already in your list!");
            return;
        }
        const docRef = await addDoc(collection(db, "list"), {
            userId: id,
            movie
        });

        console.log("Document written with ID:", docRef.id);
        toast.success("Success!");
    } catch (err) {
        console.error("Error adding document:", err);
    }
};

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

    const Numnum = ['1', '2', '3', '4', '5', '6', '7', '8', '9']


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/')
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
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    //navigation
                    slidesPerView={1}
                    loop
                    className=" overflow-hidden shadow-xl"
                >
                    {!loading && movies.map((movie, index) => (
                        <section key={index} className=''>

                            <SwiperSlide key={movie.id} className=''>
                                <Link href={`/${movie.id}`}>
                                    <div
                                        className="md:h-[500px] h-[320px] mb-0 bg-cover bg-center cursor-pointer shadow-md relative "
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "top"
                                        }}
                                    >

                                        <div className='md:top-[30%]  bottom-[10px]  left-5 md:left-10 absolute'>
                                            {/*<div className='rounded-lg w-[150] h-[250]' style={{
                                                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                            }} ></div>*/}
                                            <div className='w-[300px] md:w-[700px]'>
                                                <p className='text-3xl md:text-5xl md:mb-4 font-bold'>{movie.title}</p>
                                                <p className='md:text-2xl line-clamp-3 md:line-clamp-none md:top-0'>{movie.overview}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>

                        </section>

                    ))}
                </Swiper>
                <div className='fixed max-w[1180px] xl:max-w[1460px] top-4 left-6 right-6 wfull justify-between px6 font-bold flex z-30'>
                    <Link href="./MyList" className='hover:cursor-pointer p-3 py-2  rounded-tl-md rounded-br-md bg-red-600 right-4'>My List</Link>
                    <button onClick={() => signOut(auth)} className='hover:cursor-pointer p-3 py-2 rounded-tr-md rounded-bl-md bg-red-600'><Link href={'/'}>Sign out</Link></button>
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
            <section className=' pl-5 pr-5 md:pl-10 z-20 bg-gradient-to-b from-blue-950 to-black'>
                <Adventure />
                <section>
                    <p className='text-3xl font-bold pt-7 pb-3'>Action</p>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        //pagination={{ clickable: true }}
                        //navigation
                        spaceBetween={30}
                        slidesPerView={6}
                        loop
                        breakpoints={{
                            300: { slidesPerView: 3 },
                            414: { slidesPerView: 3 },
                            640: { slidesPerView: 4 },
                            768: { slidesPerView: 6 },
                            1024: { slidesPerView: 6 },
                            1280: { slidesPerView: 6 },
                            1600: { slidesPerView: 8 },
                        }}
                        className=" overflow-hidden shadow-xl"
                    >
                        {!loading &&
                            filteredAction.map((movie) => (
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
                </section>

                <Fantasy />
                <Scifi />

                {isClicked && active && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
                        <div className="bg-neutral-800 border border-white rounded-xl max-w-xl text-white relative bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${active.poster_path})`,
                            }}>
                            <div className='bg-black/40 p-6'>
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
                                    }} className=' bg-red-700 hover:bg-red-600 py-2 px-3 rounded-md mr-2'>Add to My List</button>
                                    <Link href={`/${active.id}`}>
                                        <button className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition">
                                            See More
                                            <FaChevronRight />
                                            {/* <Image src={NextIcon} width={20} height={20} alt="next" /> */}
                                        </button>
                                    </Link>


                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </section>
        </main>
    )
}

export default Firstpage