'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import bankCover from '@/app/assets/bankCover1.jpg'

const ElementorComponent = () => {
   const words = ["Us","Freedom", "Safety", "Ease"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    const handleTyping = () => {
      if (!isDeleting && text.length < currentWord.length) {
        // écrire lettre par lettre
        setText(currentWord.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        // effacer lettre par lettre
        setText(currentWord.slice(0, text.length - 1));
      } else if (!isDeleting && text.length === currentWord.length) {
        // attendre avant de supprimer
        setTimeout(() => setIsDeleting(true), 1000);
        return;
      } else if (isDeleting && text.length === 0) {
        // passer au mot suivant
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  return (
   <div className='h-screen md:min-h-screen flex flex-col justify-end pb-30 md:pb-22'
   style={{ backgroundImage: `url(${bankCover.src})`}}
   >
  <div className='flex flex-col items-center px-4 md:pb-8 md:space-y-12 space-y-6'>
        

<h3 className="text-primary-foreground font-playfair font-bold text-4xl md:text-6xl">
      Choose {""}
      <span className="border-r-4 border-borderGreen  text-textGreen pr-1 animate-blink font-extrabold">
        {text}
      </span>
    </h3>

     <h1 className='font-montserrat font-semibold text-xl text-primary-foreground'>Success Stories Begin here</h1>

    {/* <p className='text-lg text-primary-foreground text-center md:text-center pt-5 md:text-2xl leading-[1.5] pb-10'>Simplifiez la gestion de votre argent : économisez et faites fructifier vos revenus avec une appli moderne, déjà choisie par des millions de clients.</p> */}
  <Link href={'/register'}>
     <div className='mt-4 text-textGreen font-inter font-semibold p-2 rounded-md bg-goldButton border-none cursor-pointer hover:bg-goldButtonHover flex flex-row gap-3 items-center md:text-lg md:w-[300px] '>
              Open free bank account
            <FaLongArrowAltRight />
           </div>
</Link>
       </div>
   </div>
  )
}

export default ElementorComponent