import React from 'react'
import House from "../House/House";
import Trending from "../Trending/Trending";
import More from "../More/More";
import Faq from "../FAQ/Faq";
import Footer from "../Footer/Footer";
import LoadingPage from '../LoadingPage/LoadingPage';

const Mainpage = () => {
  return (
    <main className='z-20 min-w-[500px] relative '>
    <House/>
    <section>
        <hr className='w-full   relative p-0.5  bg-gradient-to-r from-orange-500 via-red-500 to-purple-500'/>
        <div className='h-2xl pt-15 bg-gradient-to-b from-blue-950 to-black '>
            <Trending/>
        </div>
        <div className='bg-black pb-10'>
            <More/>
        </div>
        <Faq/>
        <div className='bg-black pb-10 pt-3'>
            <Footer/>
            <LoadingPage/>
        </div>
       
    </section>
</main>
  )
}

export default Mainpage