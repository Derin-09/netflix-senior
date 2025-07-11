
import React from 'react'
import Image from 'next/image'
import Logo from '@/public/images/netflix.svg'
import Next from '@/public/images/next.svg'
import Link from 'next/link'

const Home = () => {
    return (
        <main className='select-none h-screen bg-cover bg-center bg-no-repeat bg-black' style={{ backgroundImage: "url('/images/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset.jpg')" }}>
            
            <section className=' relative bg-black/70 h-[100%]' >
                <div className=''>
                    <div className=' w-full'>
                        <div className='flex justify-between items-start w-full'>
                            <Image src={Logo} width={90} height={40} alt='logo' className='flex-[3fr] ml-8' />
                            <Link href={'/components/Signin'}>
                                <button
                                    className='py-1.5 px-4 bg-red-700 text-white  rounded-md flex-[1fr] float-end mr-8 mt-7 mb-9 hover:cursor-pointer'>
                                    Sign in
                                </button>
                            </Link>

                        </div>
                        <div className='flex justify-center  h-full  items-center top-0  text-wrap text-center m-auto  z-10   w-full'>
                            <div className='mt-24'>
                                <p className='text-3xl font-semibold w-96 m-auto text-wrap text-center'>Unlimited movies, TV shows, and more</p>
                                <p className='text-lg my-1.5  w-80 m-auto break-words '>Let&apos;s Pick the Perfect Movie For You.</p>
                                <p className='mt-5 w-[400px] ml-3'>Movie picks without the chaos. Enter your Email to create or start your membership.</p>
                                <form className='md:flex gap-[10px]  mt-4 w-full'>
                                    <input type='email' placeholder='Email Address' className='md:w-[100%] w-[70%] p-3  rounded-sm text-white border-white border-1
                         bg-black opacity-70 mb-2 md:mb-0'/>
                                    <button
                                        className='md:w-64 w-[69%] md:py-0 py-3 md:ml-0 ml-16 flex items-center md:max-w-[200px] md:gap-0 gap-2 px-3 md:px-[2em]  bg-red-700 rounded-md cursor-pointer'
                                    >
                                        <Link href={'/components/Presignup'}>Get Started</Link>
                                        <Image src={Next} width={20} height={20} alt='' className='text-white stroke-current ml-1  float-right' />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home