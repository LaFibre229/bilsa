import React from 'react'
import image from '../app/assets/creditCard.png'
import Image from 'next/image'
import Link from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'


const FirdCardComponent = () => {
  return (
    <div className='min-h-9/10 md:px-20 py-6  px-5'>
        
           <div className='flex flex-col  h-full justify-between items-center bg-primary-foreground  py-10 space-y-8 md:rounded-[50px] md:px-8 md:bg-backBlue'>
           <h1 className='text-center  md:text-6xl text-4xl leading-[1.2] font-bold'>Changez de banque en quelques minutes</h1>
           <p className=' text-center text-xl leading-[1.5]'>Ouvrez votre compte Billsa et transférez-y tous vos paiements récurrents en un clin d'œil.</p>
          
                        <Link href={'/register'} className=' hidden md:flex text-goldButton flex-row gap-3 text-xl font-bold'>
                        Open free bank account
                        <FaLongArrowAltRight />
                        </Link>
                       
                        <Link href={'/register'}>
                        <div className=' mt-4 text-cadetkBlue p-3 rounded-xl bg-goldButton border-none cursor-pointer md:w-[230px] flex flex-row gap-3 items-center md:hidden'>
                                      Open free bank account
                                    <FaLongArrowAltRight />
                                   </div>
                         </Link>
                       
                      
           <Image src={image} alt='card' className='bg-backBlue h-80 w-100 hidden md:flex'/>
           </div>
        

   </div>
  )
}

export default FirdCardComponent