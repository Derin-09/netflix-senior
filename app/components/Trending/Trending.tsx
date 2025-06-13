'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import NextIcon from '@/public/images/next.svg'

type Movie = {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
}

const Trending = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [active, setActive] = useState<Movie | null>(null)

  const Numnum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

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

  const handleClick = (movie: Movie) => {
    setActive(movie)
    setIsClicked(true)
  }

  return (
    <main className='select-none'>
      <p className="font-bold pl-10 text-white text-xl mb-4">Trending Now</p>

      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={30}
        slidesPerView={6}
        loop
        breakpoints={{
          300: { slidesPerView: 3 },
          414: { slidesPerView: 4},
          640: { slidesPerView: 4 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7 },
          1280: { slidesPerView: 7 },
          1600: { slidesPerView: 8 },
        }}

        className="overflow-hidden shadow-xl ml-10 pl-10 pr-10"
          
      >
        {!loading &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                onClick={() => handleClick(movie)}
                className="min-w-[170px] h-[250px] rounded-md mb-7 ml-10 bg-cover bg-center cursor-pointer shadow-md relative"
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
          <div className="flex justify-between gap-[20px] ml-10 mb-7 overflow-auto">
            {Numnum.map((value, index) => (
              <div
                key={index}
                className="min-w-[130px] h-[170px] bg-neutral-400 rounded-md"
              ></div>
            ))}
          </div>
        )}
      </Swiper>

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
            <Link href="/components/Presignup" className="inline-block">
              <button className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition">
                Get Started
                <Image src={NextIcon} width={20} height={20} alt="next" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

export default Trending
