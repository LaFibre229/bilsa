import React from 'react'
import Image from 'next/image'
import image from '../app/assets/npPaprasse.png'
import {FaDownload, FaLock, FaLongArrowAltRight} from 'react-icons/fa'
import {BsCreditCard} from 'react-icons/bs'
import Link from 'next/link'
import { PiIdentificationCard } from "react-icons/pi";
const LastCardComponent = () => {
  return (
    <>
    <div className='px-3 flex flex-col space-y-18 items-center py-10 md:px-20 md:py-20 text-textGreen'>
<div className='grid grid-cols-1 md:grid-cols-2 border-t border-gray-200'>
 <Image  src={image} alt='no paprasse' />
 <div className='flex flex-col justify-between items-start px-3 md:h-full space-y-10 md:pt-10'>
  <span className='font-roboto font-normal bg-goldButtonHover p-2 rounded-md'>No paperwork</span>
  <h4 className='font-montserrat font-bold text-xl '>Your account in 5 minutes</h4>
  <div className='flex flex-row gap-4 items-center font-roboto'>
    <span className=' opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer '><FaDownload /></span>
    <p className='text-lg'>Register from your browser</p>
  </div>

  <div className='flex flex-row gap-4 items-center font-roboto'>
    <span className=' opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer '><FaLock /></span>
    <p className='text-lg'>Create a key to protect your payments and movements.</p>
  </div>

  <div className='flex flex-row gap-4 items-center font-roboto'>
    <span className=' opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer '><PiIdentificationCard /></span>
    <p className='text-lg'>Verify your identity in a few simple steps</p>
  </div>

  <div className='flex flex-row gap-4 items-center font-roboto'>
    <span className=' opacity-[1] p-3 bg-green-200 rounded-full cursor-pointer '><BsCreditCard /></span>
    <p className='text-lg'>Ready, you already have your first free Bilsa ready to go.</p>
  </div>


 </div>

</div>

    <Link href='/register' className ='flex flex-row items-center gap-4 rounded-lg border-none bg-goldButton hover:goldButtonHover font-inter px-5 py-3 font-semibold md:text-lg'>
    Open free bank account

    <FaLongArrowAltRight />
    </Link>

    </div>
    
    </>
  )
}

export default LastCardComponent