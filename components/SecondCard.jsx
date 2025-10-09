'use client'
import React from 'react';
import { BsCreditCard, BsPlus } from 'react-icons/bs';
import { GiBreakingChain } from "react-icons/gi";
import { useTranslations } from 'next-intl';

const SecondCardComponent = () => {
  const t = useTranslations("Homepage.secondCard");
  const cards = t.raw("cards");

  return (
    <div className="min-h-svh bg-transparent py-10 flex flex-col justify-between items-center text-textGreen px-4 md:px-15">
      <div className="flex flex-col space-y-5 border-t border-gray-200 md:py-10">
        <h1 className="text-center leading-[1.2] text-textGreen text-2xl font-roboto font-bold py-12 md:text-6xl">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 gap-8 px-5 md:grid-cols-3">
          <div className="flex flex-col justify-between items-center space-y-4 py-4">
            <div className="p-3 rounded-full border-none bg-green-200">
              <BsCreditCard className="w-17 h-17" />
            </div>
            <h3 className="font-roboto font-extrabold text-lg">{cards[0].heading}</h3>
            <p className="text-center text-lg font-roboto">{cards[0].body}</p>
          </div>

          <div className="flex flex-col justify-between items-center space-y-4 py-4">
            <div className="p-3 rounded-full border-none bg-green-200">
              <BsPlus className="w-17 h-17" />
            </div>
            <h3 className="font-roboto font-extrabold text-lg">{cards[1].heading}</h3>
            <p className="text-center text-lg font-roboto">{cards[1].body}</p>
          </div>

          <div className="flex flex-col justify-between items-center space-y-4 py-4">
            <div className="p-3 rounded-full border-none bg-green-200">
              <GiBreakingChain className="w-17 h-17" />
            </div>
            <h3 className="font-roboto font-extrabold text-lg">{cards[2].heading}</h3>
            <p className="text-center text-lg font-roboto">{cards[2].body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondCardComponent;
