'use client'
import React from 'react'
import { useState } from 'react'


type Freq = {
    id: number;
    question: string
    answer: string
}

const options: Freq[] = [
    { id: 1, question: "What is Netflix?", answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"}, 

    { id: 2, question: "How much does Netflix cost?", answer:  "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₦2,200 to ₦7,000 a month. No extra costs, no contracts."},

    { id: 3, question: "Where can I watch?", answer:  "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."},

    { id: 4, question: "How do I cancel?", answer:  "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."},

    { id: 5, question: "What can I watch on Netflix?", answer:  "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."},

    { id: 6, question: "Is Netflix good for kids?", answer:  "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."},
]
const Faq = () => {
    const[isClicked, setIsclicked] = useState<boolean>(false)
    const[text, setText] = useState<string>("+")
    const[active, setActive] = useState<number | null>(null)

    const handleClick = () => {
        setIsclicked(true)
        if(!isClicked) {
            setText("x")
        }
        else {
            setIsclicked(false)
            setText("+")
        }
        return(
            isClicked
        )
    }


    const handler = () => {
        //handleClick()
        //setActive(active === opt.id ? null : opt.id)
    }
  return (

    <main className='bg-black pb-10 pt-3'>
                <p className='font-bold ml-10 pb-4 text-white text-xl'>Frequently Asked Questions</p>
                
                <div>
                   {options.map((opt) => ( 
                    <div key={opt.id}>
                    <div onClick={() => {console.log("clicked", opt.id); setActive(() => active === opt.id ? null : opt.id); }}>
                    <div className='bg-neutral-800 hover:bg-neutral-700 hover:cursor-pointer ml-10 mr-8 mb-0.5 px-7 py-4 flex justify-between items-center'>
                    
                        <p className='text-lg'>{opt.question}</p>
                        <button   className='text-4xl font-extralight'>{text}
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