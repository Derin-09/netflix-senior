'use client'
import { useEffect, useState } from 'react'
import { db, auth } from '@/app/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDocs, collection, where, query, deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'
import LoadingPage from '../LoadingPage/LoadingPage'

type Movie = {
  id: string // changed to string since Firestore doc.id is a string
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
        id: doc.id, // Firestore doc ID (used for deletion)
        ...data.movie,
      };
    });

    return movies;
  } catch (error) {
    console.error("Error fetching user movie list:", error);
    return [];
  }
}



async function deleteMovie(docId: string) {
  console.log("Deleting doc with ID:", docId, "Type:", typeof docId);
  try {
    const movieRef = doc(db, "list", `${docId}`); // just the list collection
    await deleteDoc(movieRef);
    console.log("Movie removed");
  } catch (error) {
    console.error("Error removing movie:", error);
  }
}


const MyList = () => {
  const [id, setId] = useState<string | null>("")
  const [list, setList] = useState<Movie[]>()

  const refreshList = async (userId: string) => {
    const data = await getUserMovieList(userId);
    setList(data);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setId(user.email)
    })
  }, [])

  useEffect(() => {
    if (!id) return;
    refreshList(id);
  }, [id])

  if (!list) return <LoadingPage />

  return (
    <div className="text-white pl-5 bg-gradient-to-b min-h-screen from-blue-950 to-black">
      <ul>
        <li>
          <div>
            <p className='text-4xl mb-3 p-2 font-bold'>My List</p>
            <hr className='border-0.5 mb-2 mt-2 text-gray-500' />
            {
              list?.map((value: Movie, index: number) => {
                return (
                  <div key={index} className='relative'>
                    <section className='flex justify-between items-center gap-4 p-4 hover:bg-neutral-700 rounded-md'>
                      <Link href={`/components/${value.id}`} className='flex gap-4 items-center'>
                        <div
                          className='w-[50px] h-[70px] rounded-md'
                          style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${value.poster_path})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                          }}
                        ></div>
                        <p className='text-xl font-semibold'>{value.title}</p>
                      </Link>

                      <button onClick={async () => {
                          await deleteMovie(value.id);
                          if (id) await refreshList(id);
                        }}

                        className='p-1 text-red-500 hover:text-red-700 transition-colors'
                        title="Remove from list"
                      >
                        <TrashIcon className='w-6 h-6' />
                      </button>
                    </section>
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
