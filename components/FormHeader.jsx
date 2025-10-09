'use client'

import React from 'react'
import { IoMdClose } from "react-icons/io"
import { IoMenuOutline } from 'react-icons/io5'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from './LocalSwitcher'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const FormHeader = ({ description }) => {
  const t = useTranslations("formheader")

  return (
    <div className={`sticky top-0 left-0 w-full bg-primary-foreground shadow-md py-7 text-textGreen font-roboto z-1000`}>
      <div className="flex flex-row px-8 mx-auto justify-between items-center w-full z-1000">
        <div className='flex flex-row items-center gap-4'>
          <IoMenuOutline className='size-8 cursor-pointer' />
          <span className='text-lg font-semibold '>{description}</span>
        </div>

        <LocaleSwitcher />

        <Sheet>
          <SheetTrigger asChild>
            <IoMdClose className='size-8 cursor-pointer' />
          </SheetTrigger>
          <SheetContent className={'z-100000'}>
            <SheetHeader className={'py-7 px-4 md:px-15 shadow-sm '}>
              <div className='flex flex-row items-center gap-3'>
                <ChevronLeft className='size-6 text-textGreen font-bold' />
                <span className='text-textGreen font-bold text-lg'>{t("back")}</span>
              </div>
            </SheetHeader>

            <div className="grid flex-1 auto-rows-min gap-6 px-4 pt-8 md:px-15">
              <h3 className='font-bold text-xl text-textGreen leading-[1.5]'>{t("title")}</h3>
              <p className='text-left text-lg text-textGreen'>{t("paragraph1")}</p>

              <h3 className='font-bold text-xl text-textGreen'>{t("subtitle")}</h3>
              <p className='text-lg text-textGreen'>{t("paragraph2")}</p>
            </div>

            <SheetFooter className={'pb-6'}>
              <SheetClose asChild>
                <div className="flex flex-col space-y-3 justify-between md:flex-row md:justify-center md:space-x-20 md:items-center">
                  <Link
                    href={'#'}
                    className="bg-primary-foreground border-2 border-borderGreen disabled:opacity-50 rounded-full py-2 flex flex-row justify-center items-center w-full md:w-[200px] cursor-pointer text-textGreen font-inter font-semibold text-lg"
                  >
                    <span>{t("no")}</span>
                  </Link>

                  <Link
                    href={'/'}
                    className='rounded-full bg-goldButton py-2 flex flex-row justify-center items-center w-full md:w-[200px] cursor-pointer text-textGreen font-inter font-semibold text-lg'
                  >
                    <span>{t("yes")}</span>
                  </Link>
                </div>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default FormHeader
