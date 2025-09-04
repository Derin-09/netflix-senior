"use client"
import React from 'react'
import Image from 'next/image'
import Sign from '@/public/images/Sign.png'
import Link from 'next/link'
import Logo from '@/public/images/netflix.svg'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/firebase'


const Successful = () => {
    const [email, setEmail] = useState<string | null>("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
            } else {
                console.log("uususu");

            }
        })
    })
    return (
        <main className='bg-white '>
            <div className='flex justify-between items-start w-full '>
                <Image src={Logo} width={90} height={40} alt='logo' className='flex-[3fr] ml-8' />
                <button className='py-1.5 px-4 bg-red-700 text-white text- rounded-md flex-[1fr] float-end mr-8 mt-7 mb-9'>Sign in</button>
            </div>
            <hr className='h-[0.5px] bg-neutral-700' />
            <div className={`flex justify-center text-black bg-white h-screen`}>
                <div>
                    <Image src={Sign} width={200} height={200} alt='devices' className='mb-[20px] m-auto' />
                    <p className='text-sm text-center '>STEP 3 OF 3</p>
                    <p className='text-4xl text-neutral-700 font-bold max-w-[350px]'>Account Created</p>
                    <p className='text-xl  mt-7 max-w-[350px]'>Use this email to access your account:</p>
                    <p>{email ? email : ""}</p>
                    <Link
                        href={'/SignIn'}>
                        <button className='text-2xl font-bold  text-center mt-7 py-5 px-5 bg-red-600 rounded-md  w-[350px] text-white mb-5 hover:cursor-pointer hover:bg-red-700 '>Next</button></Link>
                </div>
            </div>

        </main>
    )
}

export default Successful