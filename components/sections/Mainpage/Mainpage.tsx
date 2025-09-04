import React from 'react'
import House from "../Homepage/House";
import Trending from "../Homepage/Trending";
import More from "../Homepage/More";
import Faq from "../Homepage/Faq";
import Footer from "../Homepage/Footer";

const Mainpage = () => {
    return (
        <main className='z-20  w-full relative '>
            <section>
                
            <House />
                <hr className='w-full   relative p-0.5  bg-gradient-to-r from-orange-500 via-red-500 to-purple-500' />
                <div className='pt-15 bg-gradient-to-b from-blue-950 to-black '>
                    <Trending />
                </div>
                <div className='bg-black pb-10'>
                    <More />
                </div>
                <Faq />
                <div className='bg-black pb-10 pt-3'>
                    <Footer />
                </div>

            </section>
        </main>
    )
}

export default Mainpage