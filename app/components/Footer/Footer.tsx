import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Next from '@/public/images/next.svg'

const Footer = () => {
  return (
    <main>
        <section className='pt-17'>
                    <div className='flex justify-center'> <p>Ready to watch? Enter your email to join or restart your membership.</p></div>
                    <form className='flex gap-[10px] mt-4  ml-10 mr-8'>
                        <input placeholder='Email Address' className='w-[100%] p-3 rounded-sm text-white border-white border-1
                        bg-black opacity-70'/>
                        <Link href={"./components/Presignup"}>
                        <button className='w-64 flex items-center max-w-[200px] px-[2em]  bg-red-700 rounded-md'><p className='py-5'>Get Started</p>
                            <Image src={Next} width={20} height={20} alt='' className='text-white stroke-current ml-1  float-right'/>
                        </button>
                        </Link>
                    </form>

                    <p className='mt-15 ml-10 text-neutral-400 underline'>Questions? Contact us.</p>

                    <div className='mt-9 ml-10 mr-8 text-neutral-400 underline flex gap-[300px] leading-[34px] text-sm'>
                        <section>
                            <ul>
                                <li><Link href={"./components/FAQ"} >FAQ</Link></li>
                                <li><Link href={""}>Account</Link></li>
                                <li><Link href={""}>Investor Relations</Link></li>
                                <li><Link href={""}>Ways to Watch</Link></li>
                                <li><Link href={""}>Privacy</Link></li>
                                <li><Link href={""}>Corporate Information</Link></li>
                                <li><Link href={""}>Speed Test</Link></li>
                                <li><Link href={""}>Only on Netflix</Link></li>
                            </ul>
                        </section>
                        <section>
                        <ul>
                                <li><Link href={""} >Help Center</Link></li>
                                <li><Link href={""}>Media Center</Link></li>
                                <li><Link href={""}>Jobs</Link></li>
                                <li><Link href={""}>Terms of Use</Link></li>
                                <li><Link href={""}>Cookie Preferences</Link></li>
                                <li><Link href={""}>Contact Us</Link></li>
                                <li><Link href={""}>Legal Notices</Link></li>
                            </ul>
                        </section>

                        
                    </div>
                    <div className='text-white text-lg ml-10 mt-10 p-2 rounded-lg border-2 w-36'>English</div>
                    <p className='text-neutral-400 ml-10 mt-10 pb-20'>Netflix Nigeria</p>
                </section>
    </main>
  )
}

export default Footer