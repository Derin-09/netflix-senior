'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import NextIcon from '@/public/images/next.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import LoadingPage from '../LoadingPage/LoadingPage'



type Movie = {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  backdrop_path: string
  genres: { id: number; name: string }[]
  genre_ids: number[]
}

const Selected = () => {
  const [movieData, setMovieData] = useState<Movie | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [active, setActive] = useState<Movie | null>(null)
  const [movieGenre, setMovieGenre] = useState<Movie[]>([])
  const params = useParams()
  const movieId = params.movie as string
  const key = process.env.API_READ_ACCESS_TOKEN

  const filteredSci = movies.filter((movie: Movie) =>
    movie.genre_ids.includes(878)
  )

  const handleClick = (movie: Movie) => {
    setActive(movie)
    setIsClicked(true)
  }


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTNiNzMxODQzZjgyYTI5ZTBkZjZhODlmOTkzMjlkNCIsIm5iZiI6MTc0NDI5NTM0Ny43MDEsInN1YiI6IjY3ZjdkNWIzZDNhYjdkN2E4YmFkNTJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gPACKRazm9HtNi8UeezxgYRzoCl18zXvmShmVGR4jw   `,
            },
          }
        )

        const data = await res.json()
        setMovieData(data)
      } catch (err) {
        console.error('Error fetching movie:', err)
      }
    }

    if (movieId) fetchMovie()
  }, [movieId])

  if (!movieData) return <div className="text-white"><LoadingPage/></div>

  return (
    <div className="text-white ">
      <div className='bg-gray-700'>
        <div className='w-full h-[200px]' style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}></div>
      </div>
      <div className='p-6'>
        <h1 className="text-3xl font-bold">{movieData.title}</h1>
        <p className="mt-4">{movieData.overview}</p>
        <p className="mt-2 text-gray-400">Release Date: {movieData.release_date}</p>
        <Link href={`https://www.youtube.com/`}>
          <button className="flex items-center gap-2 bg-red-700 px-4 py-2 mt-2 rounded hover:bg-red-600 transition">
            Watch Now
            <Image src={NextIcon} width={20} height={20} alt="next" />
          </button>
        </Link>
        <div>
          <p className="text-2xl font-bold mt-3">More Like This</p>
          <div className=''>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
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
              {
                filteredSci.map((movie) => (
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


            </Swiper>



          </div>
        </div>
      </div>
    </div>
  )
}

export default Selected
