import React from 'react'
import Image from 'next/image'
import Sign from '@/public/images/Sign.png'
import Link from 'next/link'
import Logo from '@/public/images/netflix.svg'

const Presignup = () => {
  return (
    <main className='bg-white h-screen'>
      <div className='flex justify-between items-start w-full '>
        <Image src={Logo} width={90} height={40} alt='logo' className='flex-[3fr] ml-8' />
        <Link href={'./Signin'}>
          <button className='py-1.5 px-4 bg-red-700 text-white text- rounded-md flex-[1fr] float-end mr-8 mt-7 mb-9'>Sign in</button>
        </Link>

      </div>
      <hr className='h-[0.5px] bg-neutral-700' />
      <div className={`flex justify-center text-black `}>
        <div>
          <Image src={Sign} width={200} height={200} alt='devices' className='mb-[20px] m-auto' />
          <p className='text-sm text-center '>STEP 1 OF 3</p>
          <p className='text-4xl text-neutral-700 text-center font-bold max-w-[350px]'>Finish setting up your account</p>
          <p className='text-xl text-center mt-7 max-w-[350px]'>MyFlix is personalized for you. Create a password to watch on any device at any time.</p>
          <Link
            href={'/SignUp'}>
            <button className='text-2xl font-bold  text-center mt-7 py-5 px-5 bg-red-600 rounded-md w-full max-w-[350px] text-white mb-5 hover:cursor-pointer hover:bg-red-700'>Next</button></Link>
        </div>
      </div>

    </main>
  )
}

export default Presignup