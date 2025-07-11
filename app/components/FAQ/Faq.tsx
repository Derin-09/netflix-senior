'use client'
import React from 'react'
import { useState } from 'react'


type Freq = {
    id: number;
    question: string
    answer: string
}

const options: Freq[] = [
    { id: 1, question: "What is MyNetflix?", answer: "MyNetflix is a movie recommendation service that offers a wide variety of award-winning TV shows, movies, and more on thousands of internet-connected devices.Smart recommendations based on your mood, genre, or what's trending. No stress - just movies. There's always something new to discover and new TV shows and movies are added every week!" },

    { id: 2, question: "How much does MyNetflix cost?", answer: " MyNetflix is completely free to use. Just sign up and start getting movie recommendations right away - no hidden charges, no premium traps." },

    { id: 3, question: "How are the movie recommendations generated?", answer: "We use data from TMDB, along with categories, tags, and genre, to suggest movies that actually fit your vibe." },

    { id: 4, question: "Can I watch movies directly on MyNetflix?", answer: "Nope. We don't stream movies - we help you find what to watch. Think of it as your personal movie guide, not a movie player." },

    { id: 5, question: "Why do I need to sign up?", answer: "Signing up lets you save your favorite movies so you can come back to them anytime. It’s quick, easy, and helps you keep track of what you love - no more forgotten titles." },

    { id: 6, question: "Can I suggest movies to be added?", answer: "Not yet - but it's a feature we're working on. For now, we’re focused on giving solid recommendations from a large, constantly updated database. Got a favorite we missed? Let us know!" },
]
const Faq = () => {
    const [active, setActive] = useState<number | null>(null)

    return (

        <main className='bg-black pb-10 pt-3'>
            <p className='font-bold ml-10 pb-4 text-white text-xl'>Frequently Asked Questions</p>

            <div>
                {options.map((opt) => (
                    <div key={opt.id}>
                        <div onClick={() => { console.log("clicked", opt.id); setActive(() => active === opt.id ? null : opt.id); }}>
                            <div className='bg-neutral-800 hover:bg-neutral-700 hover:cursor-pointer ml-10 mr-8 mb-0.5 px-7 py-4 flex justify-between items-center'>

                                <p className='text-lg'>{opt.question}</p>
                                <button className='text-4xl font-extralight'>
                                    {active === opt.id ? "-" : "+"}
                                </button>
                            </div>
                            {active === opt.id && (
                                <div className={`bg-neutral-800  ml-10 mr-8 mb-2 px-7 py-6 flex justify-between items-center text-lg`}>
                                    {opt.answer}
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </main>
    )
}

export default Faq