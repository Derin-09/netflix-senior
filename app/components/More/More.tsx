import React from 'react'

const More = () => {
    return (
        <main>
            <p className='font-bold md:ml-10 ml-5 pb-4 text-white text-xl'>More reasons to join</p>
            <div >
                <div className='bg-gradient-to-r from-blue-950 to-purple-950 rounded-2xl md:ml-10 ml-5 md:mr-8 mr-5 pl-5 pt-6 pb-36 mb-2  z-20 relative'>
                    <div className='z-30 absolute'>
                        <p className='text-white font-bold text-xl pb-2'>Smart Recommendations</p>
                        <p className='text-gray-400'>Built on real-time data from TMDB amd not just some guy&apos;s opinion.</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-blue-950 to-purple-950 rounded-2xl md:ml-10 ml-5 md:mr-8 mr-5 pl-5 pt-6 pb-36 mb-2  z-20 relative'>
                    <div className='z-30 absolute'>
                        <p className='text-white font-bold text-xl pb-2'>Personalized Experience</p>
                        <p className='text-gray-400'>Save favorites and build your own watchlist.</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-blue-950 to-purple-950 rounded-2xl md:ml-10 ml-5 md:mr-8 mr-5 pl-5 pt-6 pb-36 mb-2  z-20 relative'>
                    <div className='z-30 absolute'>
                        <p className='text-white font-bold text-xl pb-2'>Constantly Updated Library</p>
                        <p className='text-gray-400'>Trending movies updated daily.</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-blue-950 to-purple-950 rounded-2xl md:ml-10 ml-5 md:mr-8 mr-5 pl-5 pt-6 pb-36 mb-2  z-20 relative'>
                    <div className='z-30 absolute'>
                        <p className='text-white font-bold text-xl pb-2'>Thoughtfully Curated Picks</p>
                        <p className='text-gray-400'>Every movie is chosen with purpose, no random filler.</p>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default More