import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import firstImg from '../app/assets/tarjetahome.png'
import { FaLongArrowAltRight } from 'react-icons/fa'
const FirstCardComponent = () => {
  return (
    <>
    <div className='min-h-screen px-4 md:px-25 pt-25 pb-5'>
      <h1 className='text-center md:text-5xl text-4xl  leading-[1.2] font-bold  pb-18'>La banque qui tient dans votre poche</h1>
          <div className='bg-cadetkBlue  w-full h-full flex flex-col-reverse md:flex-row justify-between px-4 py-10 md:pr-8  rounded-[26px]'>
                     <div className='md:h-full border-none w-full md:w-[45%] md:flex'>
                      <Image src={firstImg} alt="phone image" className='md:rounded-[23px] border-none' />
                     </div>
    
                     <div className='flex flex-col items-start justify-between space-y-8 w-full md:w-[44%] md:py-15'>
                      <h1 className='md:text-left md:text-5xl text-3xl  leading-[1.2] font-bold text-primary-foreground'>Simplifiez la gestion de votre argent</h1>
                      <p className='md:text-left text-xl leading-[1.5] text-primary-foreground'>Ouvrez votre compte en quelques minutes et profitez d'une banque 100 % mobile. Bénéficiez d'une carte virtuelle gratuite et de plusieurs retraits sans frais par mois.</p>
                      
                      <div className='flex flex-row items-center gap-3'>
                        <Link href = {'/'} className='text-lg text-goldButton md:text-xl'>Ouvrez un compte BILSA standard </Link>
                        <FaLongArrowAltRight className='text-goldButton'/>
                      </div>
                     </div>
          </div>
    
        </div>
    
    </>
  )
}

export default FirstCardComponent