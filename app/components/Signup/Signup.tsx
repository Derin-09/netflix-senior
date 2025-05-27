'use client'
import React from 'react'
import Image from 'next/image'
import Logo from '@/public/images/netflix.svg'
import Link from 'next/link'
import { useState } from 'react'
import { auth, db } from '@/app/firebase'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

//signInWithEmailAndPassword(auth, email, password).then(() => route).catch(() => seterr)


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("")
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');  // Clear any previous errors

    try {
      // Firebase signup method
      if (email === "" || password === "") {
        alert("email and password cannot be empty")
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        addDoc(collection(db, "users"), {
          name: name,
          email: email,
        })
      })
      alert('User signed up successfully');
      router.push("./SuccessSignup")
    } catch (err) {
      //setError(err.message);  // Handle signup 
      alert(err)
    }
  };

  return (
    <main className='bg-white '>
      <section >
        <div className='flex justify-between items-start w-full '>
          <Image src={Logo} width={90} height={40} alt='logo' className='flex-[3fr] ml-8' />
          <Link href={'./Signin'}>
            <button className='py-1.5 px-4 bg-red-700 text-white text- rounded-md flex-[1fr] float-end mr-8 mt-7 mb-9'>Sign in</button>
          </Link>

        </div>
        <hr className='h-[0.5px] bg-neutral-700' />
        <section className='flex justify-center text-black'>
          <div>
            <p className='text-sm mt-7'>STEP 1 OF 3</p>
            <p className='text-3xl text-neutral-700 font-bold max-w-[450px]'>Create a password to start your membership</p>
            <p className='text-xl  mt-4 max-w-[450px]'>Just a few more steps and you&apos;re done!
              We hate paperwork, too.</p>
            <form onSubmit={(e) => handleSignUp(e)}>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address...'
                required
                className='w-[450px] my-3 border-1 p-5 rounded-sm'
              /><br />
              <input
                type='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name...'
                required
                className='w-[450px] my-3 border-1 p-5 rounded-sm'
              /><br />
              <input
                type='password'
                value={password}
                placeholder='Add a password'
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-[450px] border-1 p-5 rounded-sm' /><br />
              {error && <div>{error}</div>}
              <button type='submit' className='text-2xl font-bold  text-center mt-7 py-5 px-5 bg-red-600 rounded-md  w-[450px] text-white mb-5 hover:cursor-pointer hover:bg-red-700'>Next</button>
            </form>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Signup