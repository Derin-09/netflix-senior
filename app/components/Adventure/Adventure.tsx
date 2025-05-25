'use client'
import React, { act } from 'react'
import Image from 'next/image'
import Backdrop from '@/public/images/background.avif'
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

type Movie = {
    id: number
    title: string
    poster_path: string
    overview: string
    release_date: string
    backdrop_path: string
    genre_ids: number[]
}


const Adventure = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [active, setActive] = useState<Movie | null>(null)

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
                        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12',
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

    //const filteredAdventure = movies.filter((movie: Movie) =>
      //  movie.genre_ids.includes(12)
    //)

    const handleClick = (movie: Movie) => {
        setActive(movie)
        setIsClicked(true)
    }
    return (
        <main >
            <section>
                <p className='text-3xl font-bold pt-7 pb-3'>Adventure</p>
                <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                    navigation
                    spaceBetween={30}
                    slidesPerView={6}
                    loop
                    breakpoints={{
                        320: { slidesPerView: 2 },         // Mobile (small screens)
                        480: { slidesPerView: 2 },         // Mobile (larger screens)
                        640: { slidesPerView: 3 },         // Small tablet
                        768: { slidesPerView: 6 },         // Tablet
                        1024: { slidesPerView: 6 },        // Small desktop
                        1280: { slidesPerView: 6 },        // Medium desktop
                        1600: { slidesPerView: 8 },        // Large desktop
                    }}

                    className="rounded-2xl overflow-hidden shadow-xl"
                >
                    {!loading && movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div
                                onClick={() => handleClick(movie)}
                                className="min-w-[130px] h-[170px]  rounded-md mb-7 bg-cover bg-gray-300 bg-center cursor-pointer shadow-md relative"
                                
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
                            <Link
                                href={`/components/${active.id}`}
                                key={movie.id}
                                className="inline-block">
                                <button className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition">
                                    Watch Now
                                    <Image src={NextIcon} width={20} height={20} alt="next" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Adventure