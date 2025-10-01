import React from 'react'
import image from '../app/assets/security2.png'
import Image from 'next/image'
const SecurityCard = () => {
  return (
   <>
       <div className='min-h-screen'>
          <div className='bg-textGreen  w-full  flex flex-col  md:flex-row justify-between md:px-30 py-8 m-auto'>
                     
    
                     <div className='flex flex-col items-start px-4 justify-center w-full md:w-[44%] md:pt-8 md:pb-10 space-y-6'>
                      <h3 className='text-left text-3xl text-primary-foreground leading-[1.2] font-bold font-playfair'>Ensuring your security is our highest priority</h3>
                      <p className='text-left text-xl leading-[1.5] text-primary-foreground font-roboto font-medium'>We leverage cutting-edge technology to protect your data, and your deposits are guaranteed up to €100,000 through the Deposit Guarantee Scheme</p>
                      
                      
                     </div>

                     <div>
                      <Image src={image} alt="phone image" className='bg-cadetkBlue text-cadetkBlue md:w-100 opacity-[1] '/>
                     </div>
          </div>
    
        </div>
   
   </>
  )
}

export default SecurityCard