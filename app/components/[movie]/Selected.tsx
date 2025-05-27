'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import NextIcon from '@/public/images/next.svg'
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
  const params = useParams()
  const movieId = params.movie as string
  
 // const filteredSci = movies.filter((movie: Movie) =>
    //movie.genre_ids.includes(878))

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

  if (!movieData) return <div className="text-white"><LoadingPage /></div>

  return (
    <div className="text-white w-full h-screen relative"
     style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
          <section className='absolute pl-6 pt-4 bg-black/70 h-screen'>
      <div className='bg-gray-700 w-[190px] h-[250px] rounded-xl '>
        <div className='w-full h-full rounded-xl'
         style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
          
        </div>
      </div>
      <div className='pt-6'>
        <h1 className="text-3xl font-bold">{movieData.title}</h1>
        <p className="mt-4">{movieData.overview}</p>
        <p className="mt-2 text-gray-400">Release Date: {movieData.release_date}</p>
        <Link href={`https://www.youtube.com/`}>
          <button className="flex items-center gap-2 bg-red-700 px-2  py-2 mt-2 rounded hover:bg-red-600 transition">
            Watch Now
            <Image src={NextIcon} width={20} height={20} alt="next" />
          </button>
        </Link>
      </div>
      </section>
    </div>
  )
}

export default Selected
