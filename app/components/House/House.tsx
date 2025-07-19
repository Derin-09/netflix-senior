import React from 'react'
import Image from 'next/image'
import Logo from '@/public/images/netflix.svg'
import Next from '@/public/images/next.svg'
import Link from 'next/link'

const Home = () => {
    return (
        <main className='select-none h-screen bg-cover bg-center bg-no-repeat bg-black ' style={{ backgroundImage: "url('/images/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset.jpg')" }}>
            <section className='relative bg-black/70 h-full'>
                <div className='w-full h-full flex flex-col'>
                    <div className='flex justify-between items-center w-full px-4 py-2 sm:px-8 sm:py-4'>
                        <Image src={Logo} width={90} height={40} alt='logo' />
                        <Link href='/components/Signin'>
                            <button className='py-2 px-4 bg-red-700 text-white rounded-md hover:cursor-pointer text-sm sm:text-base'>
                                Sign in
                            </button>
                        </Link>
                    </div>


                    <div className='flex justify-center items-center flex-1 w-full'>
                        <div className='text-center md:px-4 px-8 md:w-[600px] w-[350px]'>
                            <p className='text-3xl font-semibold max-w-md mx-auto text-white'>Unlimited movies, TV shows, and more</p>
                            <p className='text-lg my-1.5 max-w-sm mx-auto text-white'>Let&apos;s Pick the Perfect Movie For You.</p>
                            <p className='mt-5 max-w-md mx-auto text-white'>Movie picks without the chaos. Enter your Email to create or start your membership.</p>

                            <form className='md:flex gap-2 mt-4 max-w-lg mx-auto grid'>
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    className='flex-1 p-3 rounded-sm text-white border-white border bg-black bg-opacity-70 mb-2 md:mb-0 col-span-1'
                                />
                                <button
                                    className='flex items-center md:justify-center bg-red-700 rounded-md cursor-pointer px-6 py-3 text-white col-span-1'
                                >
                                    <Link href={'/components/Presignup'}>Get Started</Link>
                                    <Image src={Next} width={20} height={20} alt='' className='ml-2' />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
