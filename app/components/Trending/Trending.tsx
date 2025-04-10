'use client'
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image'
import Next from '@/public/images/next.svg'
import Link from 'next/link';

type about = {
    Title: string;
    Year: string;
    Genre: string;
    Rated: string;
    Poster: string;
}

const Trending = () => {
    const[isClicked, setIsclicked] = useState<boolean>(false)
    const[active, setActive] = useState<number | null>(null)
    const[about, setAbout] = useState<about | undefined>()
    const[loading, setLoading] = useState<boolean>(true)

    const Num: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    const fetchDetails = async () => {
        const url = 'https://1mdb-data-searching.p.rapidapi.com/om?i=tt1285016';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key':'c3ed4799e0msh3de735be15dbbd8p14877djsn3c5cafdd735c',
                'x-rapidapi-host': '1mdb-data-searching.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
              const result = await response.json();
              console.log(result);
                setLoading(false);
                setAbout(result);
        } catch (error) {
            console.error("Fetch error:", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDetails()
        }, [])

    const handleClick = () => {
        setIsclicked(true)
        if(!isClicked) {
            
        }
        else {
            setIsclicked(false) 
        }
        return(
            isClicked
        )
    }

   
  return (
    <main>
        <p className='font-bold pl-10 text-white text-xl'>Trending Now</p>
        <div  >
                <div  className='flex gap-4 pt-3 pl-10 pr-5 pb-15 w-full overflow-x-auto whitespace-nowrap scroll-smooth'>
                { Num.map((value, index) => ( loading ?  
                    <div 
                    key={index}
                    onClick={handleClick} 
                     className='bg-gray-300 h-[180px] w-[130px] rounded-2xl hover: cursor-pointer'>
                        <p className=' font-extrabold text-black text-6xl mt-[110px] mr-[198px] z-20'>{value}</p>
                        <p>Loading...</p>
                    </div> : 
                    <div 
                    key={index}
                    onClick={() => {setIsclicked(true);
                        setActive(index);}} 
                     className='bg-gray-300 h-[180px] w-[130px] rounded-2xl hover: cursor-pointer'>
                        <img src={about?.Poster || '@/public/images/next.svg'} alt={about?.Title}/>
                        <p className=' font-extrabold text-black text-6xl mt-[110px] mr-[198px] z-20'>{value}</p>
                        </div>
                ))}
                
                </div>
                    <div className={`flex justify-center w-full h-full fixed top-[50px] z-30 ${isClicked ? 'visible' : 'hidden'}`}>
                        
                            <div 
                            
                            className='relative bg-neutral-800 border-2 border-white w-[700px] max-h-[350px] overflow-y-auto pl-9 '>
                            <p 
                            onClick={() => setIsclicked(!isClicked)} className='fixed top-[60px] right-[150px] text-3xl z-20  mt-3 hover:cursor-pointer hover:p-2 hover:bg-neutral-600 hover:rounded-xl'>X</p>
                            <p className='mt-[250px] text-xl'>{about?.Title || 'No plot available'}</p>
                            <section className='flex gap-1 '>
                                <p className='p-2 bg-neutral-700 rounded-lg'>{about?.Year}</p>
                                <p className='p-2 bg-neutral-700'>{about?.Genre}</p>
                                <p className='p-2 bg-neutral-700'>{about?.Rated}</p>
                                <p className='p-2 bg-neutral-700'>{}</p>
                                
                            </section>
                            <p className='mt-6'>{}</p>
                            <button className=' flex items-center max-w-[200px] p-3 mt-6 mb-5 bg-red-700 rounded-sm'><Link href={'./components/Presignup'}>Get Started</Link>
                                <Image src={Next} width={20} height={20} alt='' className='text-white stroke-current ml-1  float-right'/>
                            </button>
                            </div>
                        
                            
                            </div>
                            </div>
                        
    </main>
  )
}

export default Trending