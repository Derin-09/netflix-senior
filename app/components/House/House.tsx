import React from 'react'
import Image from 'next/image'
import Background from '@/public/images/istockphoto-1522058576-612x612.jpg'
import Logo from '@/public/images/netflix.svg'
import Next from '@/public/images/next.svg'
import Link from 'next/link'

const Home = () => {
  
  return (
    <main>
        <section className=''>
        <div className='relative pt-0 '>
            <div className=''>
                <Image src={Background} width={960} height={100} alt='Backdrop' className='z-0  w-full h-auto min-h-[600px] opacity-50' />
            </div>
            <div className='absolute  top-0 left-0 w-full'>
                <div className='flex justify-between items-start w-full'>
                <Image src={Logo} width={90} height={40} alt='logo' className='flex-[3fr] ml-8'/>
                <button className='py-1.5 px-4 bg-red-700 text-white text- rounded-md flex-[1fr] float-end mr-8 mt-7 mb-9'>Sign in</button>
                </div>
                <div className='flex justify-center text-wrap text-center  z-30  w-full'>
                    <div className='mt-24'>
                    <p className='text-4xl font-semibold w-96 m-auto text-wrap text-center'>Unlimited movies, TV shows, and more</p>
                    <p className='text-lg my-1.5  w-80 m-auto break-words '>Starts at ₦2,200. Cancel Anytime.</p>
                    <p className='mt-5 w-[400px] ml-3'>Ready to watch? Enter your Email to create or start your membership.</p>
            <form  className='flex gap-[10px] mt-4 w-full'>
                        <input type='email' placeholder='Email Address' className='w-[100%] p-3 rounded-sm text-white border-white border-1
                        bg-black opacity-70'/>
                        <button className='w-64 flex items-center max-w-[200px] px-[2em]  bg-red-700 rounded-md'><Link href={'./components/Presignup'}>Get Started</Link>
                            <Image src={Next} width={20} height={20} alt='' className='text-white stroke-current ml-1  float-right'/>
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