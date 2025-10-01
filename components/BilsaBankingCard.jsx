import React from 'react'
import bilaBanking from '@/app/assets/bilsaBankingAPP.jpg'
import Image from 'next/image'
import bilsaFlexible from '@/app/assets/bilsaFlexible.jpg'
import bilsaSaving from '@/app/assets/bilsaSaving.jpg'
import bilsaTrap from '@/app/assets/bilsaTrap.jpg'
import Link from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'
const BilsaBankingCard = () => {
  return (
    <div className="min-h-svh px-3 text-textGreen flex flex-col justify-between space-y-10 items-center py-6 md:px-15">

        <h1 className='text-center leading-[1.2] text-textGreen text-2xl font-roboto font-bold py-12 md:text-6xl'>Freedom to Save, Power to Choose</h1>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
         {/* Flexibility, saving, Freedom,Banquing App */}
            <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
                {/* Flexibility */}

               <div className='rounded-t-md'>
                {/* Image content */}
                <Image src={bilsaFlexible} alt='card image'/>
               </div>

            <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
              {/* Description content */}
              <h4 className='font-montserrat font-semibold'>You needs change — so do we :  Always remain flexible</h4>

              <p className='font-roboto font-normal'>From adjusting your limits to managing your accounts in real time, our platform is built to adapt. Enjoy full control, seamless customization, and a banking experience that moves with you — not the other way around.</p>
              
        
            </div>

            </div >

            <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
                {/* Saving*/}

                 <div className='rounded-t-md'>
                {/* Image content */}
                <Image src={bilsaSaving} alt='Card image'/>
               </div>

            <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
              {/* Description content */}
              <h4 className='font-montserrat font-semibold'>Saving — Smart tools to grow your money</h4>

              <p className='font-roboto font-normal'>Set your goals, automate your savings, and watch your progress in real time. Whether you're building an emergency fund or planning something big, we make saving effortless — and rewarding.</p>
              
        
            </div>
            </div>

            <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
                {/* Freedom */}

                 <div className='rounded-t-md'>
                {/* Image content */}
                <Image src={bilsaTrap} alt='Card image'/>
               </div>

            <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
              {/* Description content */}
              <h4 className='font-montserrat font-semibold'>Your bank for free use  — Bank the way you want </h4>

              <p className='font-roboto font-normal'>No branches, no queues, no limits. Enjoy complete freedom to manage your money anytime, from anywhere. Our digital-first approach gives you control — without the constraints of traditional banking.</p>
              
        
            </div>
            </div>

            <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
                {/* Banking app */}

                 <div className='rounded-t-md h-[60%]'>
                {/* Image content */}
                <Image src={bilaBanking} className='h-full' alt='A card image'/>
               </div>

            <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
              {/* Description content */}
              <h4 className='font-montserrat font-semibold'>Banking App  — Your bank always in your pocket </h4>

              <p className='font-roboto font-normal'>Track your spending, send money, and stay in control — anytime, anywhere. Our intuitive mobile app puts powerful banking features at your fingertips, designed for speed, security, and simplicity.</p>
              
        
            </div>
            </div>
      
    </div>

    {/* button */}

    <Link href='/register' className ='flex flex-row items-center gap-4 rounded-lg border-none bg-goldButton hover:goldButtonHover font-inter px-5 py-3 font-semibold md:text-lg'>
    Open free bank account

    <FaLongArrowAltRight />
    </Link>

    </div>
  )
}

export default BilsaBankingCard

{/* <>
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
    
    </> */}