import React from 'react'
import {BsCreditCard, BsPlus} from 'react-icons/bs'
import { GiBreakingChain } from "react-icons/gi";

const SecondCardComponent = () => {
  return (
   <>
   <div className='min-h-svh bg-transparent py-10 flex flex-col justify-between items-center text-textGreen px-4 md:px-15'>
       

        <div className='flex flex-col space-y-5 border-t border-gray-200 md:py-10'>

             <h1 className='text-center leading-[1.2] text-textGreen text-2xl font-roboto font-bold py-12 md:text-6xl'>A new world of possibilities</h1>
            {/* Opportunities  4 */}

            <div className='grid grid-cols-1 gap-8 px-5 md:grid-cols-3'>
                 <div className='flex flex-col justify-between items-center space-y-4 py-4'>

                <div className='p-3 rounded-full border-none bg-green-200'><BsCreditCard className='w-17 h-17 '/></div>
                <h3 className='font-roboto font-extrabold text-lg'>Secure cards</h3>
                <p className='text-center text-lg font-roboto'>Cards with independent balances to distribute as you wish.</p>

            </div>

            <div className='flex flex-col justify-between items-center space-y-4 py-4'>

                <div className='p-3 rounded-full border-none bg-green-200'><BsPlus className='w-17 h-17 '/></div>
                <h3 className='font-roboto font-extrabold text-lg'>Banking made effortless.</h3>
                <p className='text-center text-lg font-roboto'>From opening your account to managing your daily finances, every step is designed to be simple. No jargon, no complexity</p>

            </div>

            <div className='flex flex-col justify-between items-center space-y-4 py-4'>

                <div className='p-3 rounded-full border-none bg-green-200'><GiBreakingChain className='w-17 h-17 '/></div>
                <h3 className='font-roboto font-extrabold text-lg'>Banking with zero limitations​ </h3>
                <p className='text-center text-lg font-roboto'>No hidden fees, no paperwork, no waiting. Open your account, manage your finances, and access all features</p>

            </div>
            </div>
           

            

        </div>

        
                   

   </div>
   
   </>
  )
}

export default SecondCardComponent