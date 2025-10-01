import React from 'react'
import { IoIosMailUnread } from "react-icons/io";
import { FaWhatsapp, FaLongArrowAltLeft } from "react-icons/fa";
import Link from 'next/link';
const ContactsComponent = () => {
  return (
    <>
    <div className='flex flex-col space-y-30 pt-6 pb-30'>
  
<Link href={'/'} className=' pl-3 flex flex-row items-center gap-4 text-textGreen font-inter font-semibold text-lg'>
        <FaLongArrowAltLeft />
        back
    </Link>
    <div className='flex flex-col items-center px-15 py-9 space-y-5 rounded-xl bg-goldButton text-textGreen font-inter md:flex-row md:justify-between md:py-12 md:px-22'>
        <h4 className='text-xl font-bold'>24 hours for you</h4>

        <div className="flex flex-row items-center space-x-4">
            <div className='flex flex-col items-center space-y-3'>
               <span className='p-4 rounded-full border-2 border-textGreen hover:border-3 cursor-pointer'><IoIosMailUnread  className='h-10 w-10'/></span>
               <span className='text-sm font-semibold'>Email</span>
            </div>
            <div className='flex flex-col items-center space-y-3'>
                 <span className='p-4 rounded-full border-2 border-textGreen hover:border-3 cursor-pointer'><FaWhatsapp  className='h-10 w-10'/></span>
               <span className='text-sm font-semibold'>WhatsApp</span>
            </div>
        </div>
    </div>

    </div>
    
    </>
  )
}

export default ContactsComponent