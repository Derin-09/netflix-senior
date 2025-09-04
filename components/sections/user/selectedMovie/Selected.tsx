
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { GetStaticProps } from 'next'
import LoadingPage from '../../LoadingPage/LoadingPage';
import { useEffect, useState } from 'react';

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}


type MovieInfo = {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  backdrop_path: string
  genres: { id: number; name: string }[]
  genre_ids: number[]
  origin_country: string
  production_companies: ProductionCompany[]
  vote_average: number
}


type Props = {
  movieID: string
}

// export async function generateStaticParams() {
//     const res = await fetch(
//           'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
//           {
//             method: 'GET',
//             headers: {
//               accept: 'application/json',
//               Authorization:
//                 `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTNiNzMxODQzZjgyYTI5ZTBkZjZhODlmOTkzMjlkNCIsIm5iZiI6MTc0NDI5NTM0Ny43MDEsInN1YiI6IjY3ZjdkNWIzZDNhYjdkN2E4YmFkNTJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gPACKRazm9HtNi8UeezxgYRzoCl18zXvmShmVGR4jw   `,
//             },
//           }
//         )

//         //const data = await res.json()
//   }
  
    

const Selected =  ({ movieID }: Props) =>  {
  const [data, setData] = useState<MovieInfo>()

  // const filteredSci = movies.filter((movie: Movie) =>
  //movie.genre_ids.includes(878))

  useEffect(() => {
    const fetchData = async () => {
    const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTNiNzMxODQzZjgyYTI5ZTBkZjZhODlmOTkzMjlkNCIsIm5iZiI6MTc0NDI5NTM0Ny43MDEsInN1YiI6IjY3ZjdkNWIzZDNhYjdkN2E4YmFkNTJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gPACKRazm9HtNi8UeezxgYRzoCl18zXvmShmVGR4jw   `,
            },
          }
        )
      const response = await res.json()
        setData(response) 
      }
        fetchData()
  }, [])

        

    

  if (!data) return <div className="text-white"><LoadingPage /></div>


  return (
    <div className="text-white w-full h-screen relative select-none"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      <section className='absolute pl-6 pt-4 bg-black/70 w-screen h-full'>
        <div className='bg-gray-700 w-[190px] h-[250px] rounded-xl '>
          <div className='w-full h-full rounded-xl'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>

          </div>
        </div>
        <div className='pt-6'>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="mt-4 md:max-w-[700px]">{data.overview}</p>
          <p className="mt-2 text-gray-400">Release Date: {data.release_date}</p>
          <p>{data.origin_country}</p>
          <p>Rating: <span>{data.vote_average}</span></p>
          
        </div>
         {/* { <Link href={``}>
            <button className="flex items-center gap-2 bg-red-700 px-2  py-2 mt-2 rounded hover:bg-red-600 transition">
              Watch Now
              <Image src={NextIcon} width={20} height={20} alt="next" />
            </button>
          </Link> */}
          {/* {<p>{data.production_companies.map((company: ProductionCompany, index: number) =>{

          })}</p>} */}
          
      </section>
    </div>
  )
}

export default Selected

export const getStaticProps: GetStaticProps = async () => {
  const Movie = await  fetch(
          `'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTNiNzMxODQzZjgyYTI5ZTBkZjZhODlmOTkzMjlkNCIsIm5iZiI6MTc0NDI5NTM0Ny43MDEsInN1YiI6IjY3ZjdkNWIzZDNhYjdkN2E4YmFkNTJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gPACKRazm9HtNi8UeezxgYRzoCl18zXvmShmVGR4jw   `,
            },
          }
        )
        const Movieres = await Movie.json()

  return {
      props: {
        movies: Movieres.results
      }
  }
}