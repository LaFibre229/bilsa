'use client'
import { useState} from 'react';
import React from 'react'
import { LiaCreditCardSolid } from "react-icons/lia";
import { PiHandWithdraw } from "react-icons/pi";
import { RiTodoLine } from "react-icons/ri";
import {FaChevronDown, FaChevronUp} from 'react-icons/fa'
import { AccordionCard } from '@/components/Accordion';



const faq =[
    {
      index : "pitem-1",
     title :  "Is there a cost for the card ?",
     body : "The maximum cost of the plastic card is 20€. The maximum cost of the virtual card is 5€."
    },

     {
      index: "pitem-2",
     title :  "Is there any cost for transfers ?",
     body : "Transfers to another entity that is not the same holder or Pecunpay will be charged a fee of 1.50€."
    },

     {
      index : "pitem-3",
     title :   "Do it have any commission for payment ?",
     body : "Purchases in Spain and in international stores within Europe (Euro zone) will have no commission. In international establishments within Europe ( non Euro zone) the commission will be 1.75% on the exchange rate. In international establishments and in the rest of the world, it will be 2% over the exchange rate."
    },

    
    
  ]




const plansPage = () => {
  const[showMonthlyPlans , setShowMonthlyPlans] = useState(true);
  const [showRes, setShowRes] = useState(null);
  
 
  return (
    <>
    <div className='pt-15 px-3 flex flex-col space-y-8'>

      <div className="flex flex-col justify-between items-center py-6 space-y-4 text-textGreen">
        <h1 className='font-playfair font-bold text-4xl '>Our plans</h1>
        <p className=' text-lg font font-montserrat'>Discover all that Billsa has to offer you</p>

      </div>
                {/* Toggle button */}
                <div className='w-full flex justify-center items-center'>
                    <div className={`flex flex-row gap-3 cursor-pointer p-1 items-center rounded-xl border border-moveGreen bg-blue-100`}>
                  <span onClick={()=>setShowMonthlyPlans(true)}  className={`${showMonthlyPlans ? 'py-2 px-4 text-textGreen bg-freeGreen rounded-full' : 'text-borderGreen  p-1'} text-sm font-inter`}>Monthly</span>
                  <span onClick={()=>setShowMonthlyPlans(false)} className={`${showMonthlyPlans ? 'text-borderGreen p-1':'py-2 px-4 text-textGreen bg-freeGreen rounded-full' } text-sm font-inter`}>Yearly</span>


                </div>
                
                </div>
                

                {showMonthlyPlans 
                ? (
                  
            // Monthly Plans
      <div className='flex flex-col space-y-10 py-8 md:grid md:grid-cols-3 md:gap-5 md:px-25'>
         
         {/* Plan 1 */}
        
        <div className='rounded-[20px] font-roboto'>
            {/* Plan 1 header */}
          <div className='flex flex-col items-start rounded-t-[20px] space-y-4 bg-freeGreen py-6 px-4'>
          
            <h2 className=' font-bold text-3xl'>Free</h2>
            <span className=' font-semibold text-xl'>0,00 € / monthly</span>
          </div>

          <div className='px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] border border-gray-200 text-textGreen'>
           
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><LiaCreditCardSolid /></span>
              <span className='text-xl'>Cards with shared balance</span>
            </div>

            <span className='text-gray-600 text-sm pl-10'>1 virtual</span>
            </div>
         
        <span className='text-xl pl-10'>Maximum balance : €2,500 </span>

        <span className='text-xl pl-10'>Limit on purchases : 1.500 </span>

        <div className='flex flex-col space-y-2 pl-10'>
               
             
              <span className='text-xl '>Top Ups : 500/day</span>
            

            <span className='text-gray-600 text-sm'>1.000 / month and 2500/year</span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              
              <span className='text-xl '>POS Top Ups : 2/day</span>
            

            <span className='text-gray-600 text-sm'>4/month and 48/year (2 first 2 FREE)</span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              <span className='text-xl '>1 % commission per transfer</span>
            

            <span className='text-gray-600 text-sm'>Minimum 0.50</span>
            </div>


            <span className='text-xl  pl-10'>SEPA Instant Transfers at 1</span>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><PiHandWithdraw /></span>
              <span className='text-xl '>ATM withdrawwals : 1/day</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>Maximum 350</span>
            </div>




          </div>
      </div>

      


      

        {/* Plan 2 */}
        <div className='rounded-[20px] font-roboto'>
            {/* Plan 2 header */}
          <div className='flex flex-col items-start rounded-t-[20px] space-y-4 bg-moveGreen py-6 px-4 text-primary-foreground'>
            
            <h2 className=' font-bold text-3xl'>Move</h2>
            <span className='font-semibold text-xl'>0,00 € / monthly</span>
          </div>

          <div className='px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] text-textGreen border border-moveGreen'>
           
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><LiaCreditCardSolid /></span>
              <span className='text-xl '>2 Cards with shared balance and 3 with independent balance</span>
            </div>

            <span className='text-gray-600 text-sm pl-10'>2 plastic and 3 virtual</span>
            </div>
         
        <span className='text-xl  pl-10'>Maximum balance: €15,000 </span>

        <span className='text-xl  pl-10'>Limit on purchases: 5.000€. </span>

        <div className='flex flex-col space-y-2 pl-10'>
               
             
              <span className='text-xl '>Top Ups: €1,500/day </span>
            

            <span className='text-gray-600 text-sm'>5,000/month and 15,000€/year </span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              
              <span className='text-xl '>POS Top Ups: 3/day </span>
            

            <span className='text-gray-600 text-sm'>10/month and 120/year (3 FREE per month) </span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              <span className='text-xl '>Transfer limit €1,200/day </span>
            

            <span className='text-gray-600 text-sm'>5,000/month and 15,000€/year </span>
            </div>


            <span className='text-xl  pl-10'>1 FREE SEPA Instant transfer</span>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><PiHandWithdraw /></span>
              <span className='text-xl '>ATM withdrawals: 2/day</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>Maximum 350€.</span>
            </div>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><RiTodoLine /></span>
              <span className='text-xl'>Cashback: up to 15%.</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>In participating stores </span>
            </div>




          </div>
      </div>

           
   {/* Plan 3 */}
        <div className='rounded-[20px] font-roboto'>
          {/* Plan 3 header */}
          <div className='flex flex-col items-start rounded-t-[20px] space-y-4 bg-proGreen py-6 px-4 text-primary-foreground'>
            
            <h2 className=' font-bold text-3xl'>Pro</h2>
            <span className='font-semibold text-xl'>9,99 € / monthly</span>
          </div>

          <div className='px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] border border-proGreen text-textGreen'>
           
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><LiaCreditCardSolid /></span>
              <span className='text-xl '>2 Cards with shared balance and 6 with independent balance</span>
            </div>

            <span className='text-gray-600 text-sm pl-10'>4 Plastic and 4 Virtual</span>
            </div>
         
        <span className='text-xl  pl-10'>Maximum balance UNLIMITED</span>

        <span className='text-xl  pl-10'>Limit on purchases: 15.000€.  </span>

        <div className='flex flex-col space-y-2 pl-10'>
               
             
              <span className='text-xl '>Top Ups: €4,000/day</span>
            

            <span className='text-gray-600 text-sm'>30,000/month and 360,000/year  </span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              
              <span className='text-xl '>POS Top Ups: 4/day </span>
            

            <span className='text-gray-600 text-sm'>15/month and 180/year (4 FREE per month) </span>
            </div>


             <span className='text-xl  pl-10'>Transfers UNLIMITED </span>


            <span className='text-xl  pl-10'>2 FREE SEPA Instant transfers </span>

  
<span className='text-xl  pl-10'>Transfers NO COMMISSIONS</span>

            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><PiHandWithdraw /></span>
              <span className='text-xl '>ATM withdrawals: 4/day </span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>Maximum 900€.</span>
            </div>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><RiTodoLine /></span>
              <span className='text-xl '>Cashback: up to 15%.</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>In participating stores </span>
            </div>




          </div>
      </div>



      </div>
      ) 
            : (
              // Yearly plans
               <div className='flex flex-col space-y-10 py-8 md:grid md:grid-cols-3 md:gap-5 md:px-25'>
         
         {/* Plan 1 */}
        
        <div className='rounded-[20px] font-roboto'>
            {/* Plan 1 header */}
          <div className='flex flex-col items-start rounded-t-[20px] space-y-4 bg-freeGreen py-6 px-4'>
          
            <h2 className=' font-bold text-3xl'>Free</h2>
            <span className=' font-semibold text-xl'>0,00 € / yearly</span>
          </div>

          <div className='px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] border border-freeGreen text-textGreen'>
           
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><LiaCreditCardSolid /></span>
              <span className='text-xl '>2 Cards with shared balance</span>
            </div>

            <span className='text-gray-600 text-sm pl-10'>1 plastic and 1 virtual</span>
            </div>
         
        <span className='text-xl  pl-10'>Maximum balance : €2,500 </span>

        <span className='text-xl  pl-10'>Limit on purchases : 1.500 </span>

        <div className='flex flex-col space-y-2 pl-10'>
               
             
              <span className='text-xl '>Top Ups : 500/day</span>
            

            <span className='text-gray-600 text-sm'>1.000 / month and 2500/year</span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              
              <span className='text-xl '>POS Top Ups : 2/day</span>
            

            <span className='text-gray-600 text-sm'>4/month and 48/year (2 first 2 FREE)</span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              <span className='text-xl '>1 % commission per transfer</span>
            

            <span className='text-gray-600 text-sm'>Minimum 0.50</span>
            </div>


            <span className='text-xl  pl-10'>SEPA Instant Transfers at 1</span>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><PiHandWithdraw /></span>
              <span className='text-xl '>ATM withdrawwals : 1/day</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>Maximum 350</span>
            </div>




          </div>
      </div>

      


      

        {/* Plan 2 */}
        <div className='rounded-[20px] roboto'>
            {/* Plan 2 header */}
          <div className='flex flex-col items-start rounded-t-[20px] space-y-4 bg-moveGreen py-6 px-4 text-primary-foreground'>
            
            <h2 className=' font-bold text-3xl'>Move</h2>
            <span className='font-semibold text-xl'>0,00 € / yearly</span>
          </div>

          <div className='px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] border border-moveGreen text-textGreen'>
           
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><LiaCreditCardSolid /></span>
              <span className='text-xl '>2 Cards with shared balance and 3 with independent balance</span>
            </div>

            <span className='text-gray-600 text-sm pl-10'>2 plastic and 3 virtual</span>
            </div>
         
        <span className='text-xl  pl-10'>Maximum balance: €15,000 </span>

        <span className='text-xl  pl-10'>Limit on purchases: 5.000€. </span>

        <div className='flex flex-col space-y-2 pl-10'>
               
             
              <span className='text-xl '>Top Ups: €1,500/day </span>
            

            <span className='text-gray-600 text-sm'>5,000/month and 15,000€/year </span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              
              <span className='text-xl '>POS Top Ups: 3/day </span>
            

            <span className='text-gray-600 text-sm'>10/month and 120/year (3 FREE per month) </span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              <span className='text-xl '>Transfer limit €1,200/day </span>
            

            <span className='text-gray-600 text-sm'>5,000/month and 15,000€/year </span>
            </div>


            <span className='text-xl  pl-10'>1 FREE SEPA Instant transfer</span>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><PiHandWithdraw /></span>
              <span className='text-xl '>ATM withdrawals: 2/day</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>Maximum 350€.</span>
            </div>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><RiTodoLine /></span>
              <span className='text-xl '>Cashback: up to 15%.</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>In participating stores </span>
            </div>




          </div>
      </div>

           
   {/* Plan 3 */}
        <div className='rounded-[20px] font-roboto'>
          {/* Plan 3 header */}
          <div className='flex flex-col items-start rounded-t-[20px] space-y-4 bg-proGreen py-6 px-4 text-primary-foreground'>
            
            <h2 className=' font-bold text-3xl'>Pro</h2>
            <span className='font-semibold text-xl'>9,99 € / yearly</span>
          </div>

          <div className='px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] border border-proGreen text-textGreen'>
           
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><LiaCreditCardSolid /></span>
              <span className='text-xl '>2 Cards with shared balance and 6 with independent balance</span>
            </div>

            <span className='text-gray-600 text-sm pl-10'>4 Plastic and 4 Virtual</span>
            </div>
         
        <span className='text-xl  pl-10'>Maximum balance UNLIMITED</span>

        <span className='text-xl  pl-10'>Limit on purchases: 15.000€.  </span>

        <div className='flex flex-col space-y-2 pl-10'>
               
             
              <span className='text-xl '>Top Ups: €4,000/day</span>
            

            <span className='text-gray-600 text-sm'>30,000/month and 360,000/year  </span>
            </div>


            <div className='flex flex-col space-y-2 pl-10'>
                
              
              <span className='text-xl '>POS Top Ups: 4/day </span>
            

            <span className='text-gray-600 text-sm'>15/month and 180/year (4 FREE per month) </span>
            </div>


             <span className='text-xl  pl-10 font-bold'>Transfers UNLIMITED </span>


            <span className='text-xl  pl-10'>2 FREE SEPA Instant transfers </span>
            <span className='text-xl  pl-10 font-bold'>Transfers NO COMMISSIONS </span>

            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><PiHandWithdraw /></span>
              <span className='text-xl '>ATM withdrawals: 4/day </span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>Maximum 900€.</span>
            </div>


            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row gap-4 items-center'>
              <span className='text-moveGreen text-xl'><RiTodoLine /></span>
              <span className='text-xl '>Cashback: up to 15%.</span> 
            </div>

            <span className='text-gray-600 text-sm pl-10'>In participating stores </span>
            </div>




          </div>
      </div>



      </div>

            )}

            {/* FAQ */}
            
              <h2 className='font-playfair font-bold text-4xl text-textGreen text-center'>Some Frequent Questions</h2>
            <AccordionCard table={faq}/>
            
           
            {/* <h1 className='font-bold text-3xl text-center'>Some frequent titles</h1> */}
        {/* <div className='pb-6 md:w-[70%]'>
        {faq.map((q,index)=>
        <div key={`${index}`} className='flex flex-col'>
             <div  className="shadow-sm flex flex-row justify-between items-center py-3 px-10 border-b border-gray-300 ">
            <p className=' text-lg'>{q.title}</p>
            {showRes === index
            ? (
              <FaChevronUp className=' text-sm cursor-pointer text-gray-400' onClick={()=>setShowRes(null)} />
            ) 
            : (
              <FaChevronDown  onClick={()=>setShowRes(index)} className=' text-sm cursor-pointer text-gray-400'/>
            )}
            
          </div>

          <div className={`${showRes === index ? 'block' : 'hidden'} px-8 text-lg border-x border-gray-300 py-6` } >
           {q.body}
          </div>
        </div>
          


        )}
        

        </div> */}

     
    </div>
    
    </>
  )
}

export default plansPage