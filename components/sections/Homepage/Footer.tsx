import React from 'react'
import Link from 'next/link'
import { FaChevronRight } from "react-icons/fa" 

const Footer = () => {
    return (
        <section style={{ fontFamily: 'var(--font-inter)'}}>
            <section className='md:pt-17 pt-10'>
                <div className=' md:flex gap-2 justify-center text-center'>
                    <p>Ready to join? </p>
                    <p>Enter your email to join or restart your membership.</p></div>
                <form className='md:flex gap-[10px] md:justify-center mt-4  ml-10 mr-8'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        className='md:flex-1 p-3 rounded-sm text-white border-white border bg-black bg-opacity-70 mb-2 md:mb-0 '
                    />
                    <button
                        className='flex gap-2 items-center md:justify-center bg-red-700 rounded-md cursor-pointer px-14 py-3 text-white  md:flex-1'
                    >
                        <Link href={'/Presignup'}>Get Started</Link>
                        <FaChevronRight />
                    </button>
                </form>

                <a
                    href="mailto:aderinsolasamashimi@gmail.com">
                    <p className='mt-15 ml-10 text-neutral-400 underline'>Questions? Contact us.</p>
                </a>

                <div className='mt-9 ml-10 mr-8 text-neutral-400 underline flex md:gap-[300px] gap-[100px] leading-[34px] text-sm'>
                    <section>
                        <ul>
                            <li className='hover:text-red-600'><Link href={""} >FAQ</Link></li>
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
        </section>
    )
}

export default Footer