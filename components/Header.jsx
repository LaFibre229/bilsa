'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaLock, FaArrowRight} from 'react-icons/fa'
import {RiCloseLargeLine} from 'react-icons/ri'
import BilsaLogo from '@/app/assets/homeLogo.png'
import {LuMenu} from 'react-icons/lu'
import {GoTriangleDown} from 'react-icons/go'
import franceFlag from '../app/assets/france.png'




const Header = () => {
  const [menuState, setMenuState] = useState(false);
   useEffect(() => {
    if (menuState) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuState]);
  return (
   <header  className='sticky top-0 left-0'>
     {/* Header on small screen  */}
        <div className='bg-textGreen px-3 py-5 flex items-center  justify-between md:px-25'>
              {/* Logo */}
              <Link href={'/'}>
              <span className='font-playfair font-extrabold text-3xl px-2 text-goldButtonHover'>BILSA</span>
              </Link>

              <div className='space-x-4 flex items-center md:hidden'>
               
                  <div className='flex flex-row space-x-3 items-center'>

            
           {menuState 
           ? ( <div className=' hidden flex items-center gap-3 px-3 py-1 border border-borderGreen rounded-sm z-200'> 
           {/* Hidden . Show when setting multilanguage fonctionalities */}
              <Image src={franceFlag} alt='flag' className='h-5 w-5 rounded-full' />
             <span className='font-bold text-textGreen'>FR</span>
           </div>)
           : ( <Link href={'/login'}><div className='flex gap-3 px-3 items-center py-1 rounded-lg border border- cursor-pointer'>
            
             <FaLock className='text-goldButtonHover'/>
             <span className='text-primary-foreground'>Log in</span>
             
           </div></Link>)}

           <div className='cursor-pointer md:hidden' onClick={()=>setMenuState((prevState)=>!prevState)}>
             
           
            <LuMenu className='h-8 w-8 text-primary-foreground'/>
            

           </div>

           </div>
              </div>

              <div className='hidden justify-between  space-x-20 items-center font-roboto font-medium md:flex'>

                <div className='flex flex-row space-x-5 items-center font-roboto font-medium text-primary-foreground text-xl'> 
                <Link href='/plans'>Plans</Link>
                <Link  href='/about'>About</Link>
                <Link  href='/contact'>Contact Us</Link>
              </div>
                
                        <div className='hidden flex flex-row items-center space-x-2 pr-4 p-4 border-r-1 border-goldButton h-full'>
                        {/* Language : Hidden , show when etting multilanguage fonctionnalities */}
                        <div className='flex gap-3 px-3 py-1 rounded-sm border-none'>
              <Image src={franceFlag} alt='flag' className='h-5 w-5 rounded-full' />
             <span className='font-bold text-primary-foreground'>FR</span>
           </div>
                        <GoTriangleDown className='text-primary-foreground' />
                    </div>
              <Link href={'/login'}>
                   <div className='flex gap-3 px-3 items-center py-1 rounded-lg border border-primary-foreground cursor-pointer'>
                    
                    <FaLock className='text-goldButton' />
             <span className='text-primary-foreground'>Log in</span>
                    
                    
             
           </div>

           </Link>
                    
                  


              </div>

              
        </div>

         {menuState && (
           <div className={`flex  top-4 px-5 pt-20 flex-col fixed inset-0 z-100 bg-primary-foreground `}>
            <div className='flex flex-col space-y-10 text-textGreen text-xl font-inter font-bold'>
              <div onClick={()=>setMenuState((prevState)=>!prevState)} className='absolute top-2   right-3  cursor-pointer'><RiCloseLargeLine className='h-7 w-7' /></div>
              <Link href='/plans' onClick={()=>setMenuState(false)}>
                 <div className='flex flex-row w-full items-center justify-between'>
              <span >Plans</span>
              <FaArrowRight />
            </div>
              </Link>

              <Link href='/about' onClick={()=>setMenuState(false)}>
                 <div className='flex flex-row w-full items-center justify-between'>
              <span>About</span>
              <FaArrowRight />
            </div>
              </Link>

              <Link href='/contact' onClick={()=>setMenuState(false)}>
                 <div className='flex flex-row w-full items-center justify-between'>
              <span>Contact us</span>
              <FaArrowRight />
            </div>
              </Link>

              
            </div>

            <div className='flex flex-col justify-between items-center pt-14 space-y-8'>

              <div className='text-cadetkBlue p-3 rounded-lg bg-goldButton border-none cursor-pointer text-textGreen text-lg font-inter font-semibold'>
                <Link href={'/register'} onClick={()=>setMenuState(false)}> Open free bank account</Link>

           </div>

           <Link href={'/login'} onClick={()=>setMenuState(false)}><div className='flex gap-3 px-3 items-center py-2 rounded-sm text-textGreen font-inter font-medium cursor-pointer'>
            
            <FaLock className='text-goldButton'/>
             <span className='text-cadetkBlue'>Log in</span>
            
             
           </div>
           </Link>
            </div>






        </div>
        )}

       

   </header>
  )
}

export default Header