'use client'
import React from 'react'
import Image from 'next/image'
import Logo from '@/public/images/netflix.svg'
import Sign from '@/public/images/Sign.png'
import { useState } from 'react'
import firebase from 'firebase/compat/app'
import { auth } from '@/app/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

//signInWithEmailAndPassword(auth, email, password).then(() => route).catch(() => seterr)


const Signup = () => {
    const[isClicked, setIsclicked] = useState<boolean>(false)
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');  // Clear any previous errors

    try {
      // Firebase signup method
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User signed up successfully');
    } catch (err) {
      //setError(err.message);  // Handle signup errors
    }
  };

  return (
    <main className='bg-white '>
        <section >
        <div className='flex justify-between items-start w-full '>
                <Image src={Logo} width={90} height={40} alt='logo' className='flex-[3fr] ml-8'/>
                <button className='py-1.5 px-4 bg-red-700 text-white text- rounded-md flex-[1fr] float-end mr-8 mt-7 mb-9'>Sign in</button>
        </div>
        <hr className='h-[0.5px] bg-neutral-700'/>
          <section className='flex justify-center text-black'>
            <div>
            <p className='text-sm mt-7'>STEP 1 OF 3</p>
            <p className='text-3xl text-neutral-700 font-bold max-w-[450px]'>Create a password to start your membership</p>
            <p className='text-xl  mt-4 max-w-[450px]'>Just a few more steps and you're done!
            We hate paperwork, too.</p>
            <form onSubmit={(e) => handleSignUp}>
                <input 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address...' 
                required
                className='w-[450px] my-3 border-1 p-5 rounded-sm'
                /><br/>
                <input 
                type='password' 
                value={password} 
                placeholder='Add a password'
                onChange={(e) => setPassword(e.target.value)}
                required 
                className='w-[450px] border-1 p-5 rounded-sm'/><br/>
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