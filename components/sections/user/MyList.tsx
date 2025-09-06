'use client'
import { useEffect, useState } from 'react'
import { db, auth } from '@/app/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDocs, collection, where, query, deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'
import LoadingPage from '../LoadingPage/LoadingPage'

type Movie = {
  docId: string        // Firestore document id (for deletion)
  tmdbId: number       // original TMDB id
  title: string
  poster_path: string
  overview: string
  release_date: string
  backdrop_path: string
  genres?: { id: number; name: string }[]
}

async function getUserMovieList(userId: string): Promise<Movie[]> {
  try {
    const q = query(collection(db, 'list'), where('userId', '==', userId))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(d => {
      const raw = d.data().movie
      return {
        docId: d.id,               // Firestore doc id
        tmdbId: raw.id,            // keep TMDB id separate
        title: raw.title,
        poster_path: raw.poster_path,
        overview: raw.overview,
        release_date: raw.release_date,
        backdrop_path: raw.backdrop_path,
        genres: raw.genres || []
      } as Movie
    })
  } catch (err) {
    console.error('Error fetching user movie list:', err)
    return []
  }
}

async function deleteMovie(docId: string) {
  if (!docId) throw new Error('No Firestore doc id provided')
  const movieRef = doc(db, 'list', docId) // must be a plain string
  await deleteDoc(movieRef)
  console.log('Movie removed')
}

const MyList = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [list, setList] = useState<Movie[]>()

  const refreshList = async (uid: string) => {
    const data = await getUserMovieList(uid)
    setList(data)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email) setUserId(user.email)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (userId) refreshList(userId)
  }, [userId])

  if (!list) return <LoadingPage />

  return (
    <div className="text-white pl-5 bg-gradient-to-b min-h-screen from-blue-950 to-black">
      <p className="text-4xl mb-3 p-2 font-bold">My List</p>
      <hr className="border-0.5 mb-2 mt-2 text-gray-500" />

      {list.length === 0 && (
        <p className="text-gray-400 mt-4">No movies saved yet.</p>
      )}

      {list.map((value) => (
        <section
          key={value.docId}
          className="flex justify-between items-center gap-4 p-4 hover:bg-neutral-700 rounded-md"
        >
          <Link href={`/${value.tmdbId}`} className="flex gap-4 items-center">
            <div
              className="w-[50px] h-[70px] rounded-md"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${value.poster_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <p className="text-xl font-semibold">{value.title}</p>
          </Link>

          <button
            onClick={async () => {
              await deleteMovie(value.docId)
              if (userId) await refreshList(userId)
            }}
            className="p-1 text-red-500 hover:text-red-700 transition-colors"
            title="Remove from list"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </section>
      ))}
    </div>
  )
}

export default MyList












// 'use client'
// import { useEffect, useState } from 'react'
// import { db, auth } from '@/app/firebase'
// import { onAuthStateChanged } from 'firebase/auth'
// import { getDocs, collection, where, query, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
// import Link from 'next/link'
// import { TrashIcon } from '@heroicons/react/24/outline'
// import LoadingPage from '../LoadingPage/LoadingPage'

// type Movie = {
//   id: string // changed to string since Firestore doc.id is a string
//   title: string
//   poster_path: string
//   overview: string
//   release_date: string
//   backdrop_path: string
//   genres: { id: number; name: string }[]
// }

// async function getUserMovieList(userId: string) {
//   try {
//     if (!userId) throw new Error("User ID is missing");

//     const q = query(collection(db, "list"), where("userId", "==", userId));
//     const snapshot = await getDocs(q);

//     const movies = snapshot.docs.map(doc => {
//       const data = doc.data();
//       return {
//         id: doc.id, // Firestore doc ID (used for deletion)
//         ...data.movie,
//       };
//     });

//     return movies;
//   } catch (error) {
//     console.error("Error fetching user movie list:", error);
//     return [];
//   }
// }



// async function deleteMovie(docId: string) {
//   console.log("Deleting doc with ID:", docId, "Type:", typeof docId);
//   try {
//     const movieRef = doc(db, "list", `${docId}`); // just the list collection
//     await deleteDoc(movieRef);
//     console.log("Movie removed");
//   } catch (error) {
//     console.error("Error removing movie:", error);
//   }
// }


// const MyList = () => {
//   const [id, setId] = useState<string | null>("")
//   const [list, setList] = useState<Movie[]>()

//   const refreshList = async (userId: string) => {
//     const data = await getUserMovieList(userId);
//     setList(data);
//   }

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (!user) return;
//       setId(user.email)
//     })
//   }, [])

//   // useEffect(() => {
//   //   if (!id) return;
//   //   refreshList(id);
//   // }, [id])

//   useEffect(() => {
//   if (!id) return;

//   const q = query(collection(db, "list"), where("userId", "==", id));
//   const unsub = onSnapshot(q, (snapshot) => {
//     const movies = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data().movie
//     }));
//     setList(movies);
//   });

//   return () => unsub();
// }, [id]);


//   if (!list) return <LoadingPage />

//   return (
//     <div className="text-white pl-5 bg-gradient-to-b min-h-screen from-blue-950 to-black">
//       <ul>
//         <li>
//           <div>
//             <p className='text-4xl mb-3 p-2 font-bold'>My List</p>
//             <hr className='border-0.5 mb-2 mt-2 text-gray-500' />
//             {
//               list?.map((value: Movie, index: number) => {
//                 return (
//                   <div key={index} className='relative'>
//                     <section className='flex justify-between items-center gap-4 p-4 hover:bg-neutral-700 rounded-md'>
//                       <Link href={`/${value.id}`} className='flex gap-4 items-center'>
//                         <div
//                           className='w-[50px] h-[70px] rounded-md'
//                           style={{
//                             backgroundImage: `url(https://image.tmdb.org/t/p/w500/${value.poster_path})`,
//                             backgroundRepeat: "no-repeat",
//                             backgroundSize: "cover",
//                             backgroundPosition: "center"
//                           }}
//                         ></div>
//                         <p className='text-xl font-semibold'>{value.title}</p>
//                       </Link>

//                       <button onClick={async () => {
//                           await deleteMovie(value.id);
//                           if (id) await refreshList(id);
//                         }}

//                         className='p-1 text-red-500 hover:text-red-700 transition-colors'
//                         title="Remove from list"
//                       >
//                         <TrashIcon className='w-6 h-6' />
//                       </button>
//                     </section>
//                   </div>

//                 )
//               })
//             }
//           </div>
//         </li>
//       </ul>
//     </div>
//   )
// }

// export default MyList
