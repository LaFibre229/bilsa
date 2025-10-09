'use client'
import React from 'react'
import Image from 'next/image'
import image from '../app/assets/npPaprasse.png'
import {FaDownload, FaLock, FaLongArrowAltRight} from 'react-icons/fa'
import {BsCreditCard} from 'react-icons/bs'
import Link from 'next/link'
import { PiIdentificationCard } from "react-icons/pi";
import { useTranslations } from 'next-intl';

const LastCardComponent = () => {
  const t = useTranslations("Homepage.lastCard");

  return (
    <div className='px-3 flex flex-col space-y-18 items-center py-10 md:px-20 md:py-20 text-textGreen'>
      <div className='grid grid-cols-1 md:grid-cols-2 border-t border-gray-200'>
        <Image src={image} alt={t("noPaperwork")} />
        <div className='flex flex-col justify-between items-start px-3 md:h-full space-y-10 md:pt-10'>
          <span className='font-roboto font-normal bg-goldButtonHover p-2 rounded-md'>{t("noPaperwork")}</span>
          <h4 className='font-montserrat font-bold text-xl'>{t("accountIn5Minutes")}</h4>

          <div className='flex flex-row gap-4 items-center font-roboto'>
            <span className='opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer'><FaDownload /></span>
            <p className='text-lg'>{t("registerBrowser")}</p>
          </div>

          <div className='flex flex-row gap-4 items-center font-roboto'>
            <span className='opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer'><FaLock /></span>
            <p className='text-lg'>{t("createKey")}</p>
          </div>

          <div className='flex flex-row gap-4 items-center font-roboto'>
            <span className='opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer'><PiIdentificationCard /></span>
            <p className='text-lg'>{t("verifyIdentity")}</p>
          </div>

          <div className='flex flex-row gap-4 items-center font-roboto'>
            <span className='opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer'><BsCreditCard /></span>
            <p className='text-lg'>{t("readyCard")}</p>
          </div>
        </div>
      </div>

      <Link href='/register' className='flex flex-row items-center gap-4 rounded-lg border-none bg-goldButton hover:goldButtonHover font-inter px-5 py-3 font-semibold md:text-lg'>
        {t("openAccount")}
        <FaLongArrowAltRight />
      </Link>
    </div>
  )
}

export default LastCardComponent
