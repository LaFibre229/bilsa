import React from 'react'
import Image from 'next/image'
import image from '../app/assets/n26-banking2.png'


const AcceuilCardComponent = () => {
  return (
    <>

    <div className='min-h-screen md:px-25 md:py-25'>
          <div className='flex flex-col-reverse space-y-8 px-3 md:items-center md:flex-row md:space-y-0 justify-between'>
                     
    
                     <div className='flex flex-col space-y-8 pb-10 md:w-[45%]'>
                      <h1 className='text-center md:text-left md:text-5xl text-3xl  leading-[1.2] font-bold'>Prise en main simple et efficace</h1>
                      <p className='text-center md:text-left text-xl leading-[1.5] text-gray-700'>Ouvrez votre compte en quelques minutes et profitez d'une banque 100 % mobile. Bénéficiez d'une carte virtuelle gratuite et de plusieurs retraits sans frais par mois.</p>

                     </div>

                     <div >
                      <Image src={image} alt="phone image" className='bg-transparent pb-8' />
                     </div>
          </div>
    
        </div>
    
    
    </>
  )
}

export default AcceuilCardComponent