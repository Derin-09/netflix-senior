'use client'
import { useEffect, useState } from 'react'
import {  db, auth } from '@/app/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDocs, collection, where, query} from 'firebase/firestore'
import Link from 'next/link'
import LoadingPage from '../LoadingPage/LoadingPage'




type Movie = {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  backdrop_path: string
  genres: { id: number; name: string }[]
}


async function getUserMovieList(userId: string) {
    try {
      if (!userId) throw new Error("User ID is missing");
  

      const q = query(collection(db, "list"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
  
      const movies = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id, 
          ...data.movie,
        };
      });
  
      return movies; 
    } catch (error) {
      console.error("Error fetching user movie list:", error);
      return [];
    }
  }

  
  

const  MyList = () => {
  const [id, setId] = useState<string | null>("")
  const [list, setList] = useState<Movie[]>()
 


  useEffect(() =>{
    onAuthStateChanged(auth, (user) =>{
        if(!user) return;
        setId(user.email)
    })
  }, [])
  
  useEffect(() =>{
    if(!id) return;
    getUserMovieList(id).then((data: Movie[]) => {
        setList(data)
    })
  }, [id])

 

if (!list) return <LoadingPage/>

  return (
    <div className="text-white pl-5 bg-gradient-to-b min-h-screen from-blue-950 to-black">
     <ul>
        <li>
            <div>
                <p className='text-4xl mb-3 p-2 font-bold '>My List</p>
                <hr className='border-0.5 mb-2 mt-2 text-gray-500'/>
                {
                    list?.map((value: Movie, index: number) =>{
                        return (
                            
                            <div key={index}>
                                
                                <Link href={`/components/${value.id}`}>
                                <section className='flex gap-4 p-4 hover:bg-neutral-500'>
                                    <div className='w-[50px] h-[70px] rounded-md'
                                    style={{
                                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${value.poster_path})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"}}></div>
                                    <p className='text-2xl font-bold'>{value.title}</p>
                                </section>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </li>
        
     </ul>
    </div>
  )
}

export default MyList
