import House from "./components/House/House";
import Trending from "./components/Trending/Trending";
import More from "./components/More/More";
import Faq from "./components/FAQ/Faq";
import Footer from "./components/Footer/Footer";

export default function Home() {
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
            
        </div>
       
    </section>
</main>
  );
}
