'use client'
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import bankCover from '@/app/assets/bankCover1.jpg';
import { useTranslations } from 'next-intl';

const ElementorComponent = () => {
  const t = useTranslations("Homepage.elementor");
  const words = t.raw("words"); // récupération du tableau directement depuis JSON
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    const handleTyping = () => {
      if (!isDeleting && text.length < currentWord.length) {
        setText(currentWord.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(currentWord.slice(0, text.length - 1));
      } else if (!isDeleting && text.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000);
        return;
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <div 
      className="h-screen md:min-h-screen flex flex-col justify-end pb-30 md:pb-22"
      style={{ backgroundImage: `url(${bankCover.src})` }}
    >
      <div className="flex flex-col items-center px-4 md:pb-8 md:space-y-12 space-y-6">
        <h3 className="text-primary-foreground font-playfair font-bold text-4xl md:text-6xl">
          {t("title", { word: "" })}
          <span className="border-r-4 border-borderGreen text-textGreen pr-1 animate-blink font-extrabold">
            {text}
          </span>
        </h3>

        <h1 className="font-montserrat font-semibold text-xl text-primary-foreground">
          {t("subtitle")}
        </h1>

        <Link href={'/register'}>
          <div className="mt-4 text-textGreen font-inter font-semibold p-2 rounded-md bg-goldButton border-none cursor-pointer hover:bg-goldButtonHover flex flex-row gap-3 items-center md:text-lg md:w-[300px] ">
            {t("cta")}
            <FaLongArrowAltRight />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ElementorComponent;
