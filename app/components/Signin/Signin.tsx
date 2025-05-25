'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Logo from '@/public/images/netflix.svg'
import Sign from '@/public/images/Sign.png'
import Link from 'next/link'
import { useState } from 'react'
import { auth } from '@/app/firebase'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import LoadingPage from '../LoadingPage/LoadingPage'


//signInWithEmailAndPassword(auth, email, password).then(() => route).catch(() => seterr)



  
const Signin = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState<boolean>(true)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    // Clear any previous errors
      setLoad(false)

    try {
      // Firebase signup method
      if(email === "" || password === ""){
        alert("email and password cannot be empty")
        return;
      }
      await signInWithEmailAndPassword(auth, email, password)
      //alert('User signed up successfully');
      router.push("./Firstpage")
    } catch (err) {
      //setError(err.message);  // Handle signup 
      alert(err)
    }
  };
  if (load)  return <LoadingPage/>


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
            
            <p className='text-3xl text-neutral-700 font-bold max-w-[450px]'>Sign in</p>
            <form onSubmit={(e) => handleSignIn(e)}>
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
                placeholder='Enter your password...'
                onChange={(e) => setPassword(e.target.value)}
                required 
                className='w-[450px] border-1 p-5 rounded-sm'/><br/>
                {error && <div>{error}</div>}
                <Link href={''}><p className='mt-3'>forgot password?</p></Link>
                <div className='flex gap-1.5'>
                    <p className='text-neutral-500 '>New to Netflix?</p>
                    <span className='font-bold  hover:text-red-600'><Link href={'./Presignup'}> Sign up</Link></span>
                </div>
                 <button type='submit' className='text-2xl font-bold  text-center mt-7 py-5 px-5 bg-red-600 rounded-md  w-[450px] text-white mb-5 hover:cursor-pointer hover:bg-red-700'>Sign in</button>
            </form>
            
            </div>
          </section>
        </section>
    </main>
 
  )
}

export default Signin