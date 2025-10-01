'use client'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import {IoMenuOutline} from 'react-icons/io5'
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const FormHeader = ({description}) => {
  return (
    <>
    <div className={`sticky top-0 left-0 w-full bg-primary-foreground shadow-md py-7 text-textGreen font-roboto z-1000`}>
        <div className="flex flex-row px-8 mx-auto justify-between items-center w-full z-1000">
            <div className='flex flex-row items-center gap-4'>
                <IoMenuOutline className='size-8 cursor-pointer'/>
                <span className='text-lg font-semibold '>{description}</span>
            </div>

            

              <Sheet>
      <SheetTrigger asChild>
        <IoMdClose className='size-8 cursor-pointer'/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className={'py-3 px-4 md:px-15 md:py-10 shadow-sm'}>
          <div className='flex flex-row items-center gap-3'>
            <ChevronLeft className='size-6 text-textGreen font-bold'/>
            <span className='text-textGreen font-bold text-lg'>Back</span>

          </div>
         
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 pt-8 md:px-15">
          <h3 className='font-bold text-xl text-textGreen leading-[1.5]'>Do you really want to finish your order?</h3>

          <p className='text-left text-lg text-textGreen'>Please note that previously provided information is no longer available.
Click on the button "Ok" to actually finish the job. After clicking on the "Back" link above, please return to your details.</p>

           <h3 className='font-bold text-xl text-textGreen'>Do you have questions?</h3>
           <p className='text-lg text-textGreen'>Join us. We are there for you every 24 hours every day at bilsabank.com </p>
        </div>
        <SheetFooter className={'pb-6'}>
          
          <SheetClose asChild>
            <div className="flex flex-col space-y-3 justify-between">
            
            <Link
              href={'#'}
                     
                     className="bg-primary-foreground border border-black  disabled:opacity-50 rounded-full py-2 flex flex-row justify-center items-center w-full md:w-[200px] cursor-pointer"
                   >
                     
                     <span>No, continue order</span>
                   </Link>
           
                                             <Link href={'/'} className='rounded-full bg-goldButton py-2 flex flex-row justify-center items-center w-full md:w-[200px] cursor-pointer '
                                             
                                             >
                                                  <span>Yes, finish order</span>
                                                
                                                </Link>
                                            </div>
            
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

        </div>
    </div>
    </>
  )
}

export default FormHeader