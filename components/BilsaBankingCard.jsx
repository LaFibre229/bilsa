import React from 'react'
import bilaBanking from '@/app/assets/bilsaBankingApp.jpg'
import Image from 'next/image'
import bilsaFlexible from '@/app/assets/bilsaFlexible.jpg'
import bilsaSaving from '@/app/assets/bilsaSaving.jpg'
import bilsaTrap from '@/app/assets/bilsaTrap.jpg'
import Link from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

const BilsaBankingCard = () => {
  const t = useTranslations("Homepage.bilsaBankingCard")

  return (
    <div className="min-h-svh px-3 text-textGreen flex flex-col justify-between space-y-10 items-center py-6 md:px-15">

      {/* Main title */}
      <h1 className='text-center leading-[1.2] text-textGreen text-2xl font-roboto font-bold py-12 md:text-6xl'>
        {t("title")}
      </h1>

      {/* Cards grid */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>

        {/* Flexibility */}
        <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
          <div className='rounded-t-md'>
            <Image src={bilsaFlexible} alt='Flexibility image'/>
          </div>
          <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
            <h4 className='font-montserrat font-semibold'>{t("flexibility.title")}</h4>
            <p className='font-roboto font-normal'>{t("flexibility.description")}</p>
          </div>
        </div>

        {/* Saving */}
        <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
          <div className='rounded-t-md'>
            <Image src={bilsaSaving} alt='Saving image'/>
          </div>
          <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
            <h4 className='font-montserrat font-semibold'>{t("saving.title")}</h4>
            <p className='font-roboto font-normal'>{t("saving.description")}</p>
          </div>
        </div>

        {/* Freedom */}
        <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
          <div className='rounded-t-md'>
            <Image src={bilsaTrap} alt='Freedom image'/>
          </div>
          <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
            <h4 className='font-montserrat font-semibold'>{t("freedom.title")}</h4>
            <p className='font-roboto font-normal'>{t("freedom.description")}</p>
          </div>
        </div>

        {/* Banking App */}
        <div className='flex flex-col space-y-0 p-0 rounded-md border border-borderGreen'>
          <div className='rounded-t-md h-[60%]'>
            <Image src={bilaBanking} className='h-full' alt='Banking app image'/>
          </div>
          <div className='py-5 px-3 flex flex-col justify-between items-start space-y-5'>
            <h4 className='font-montserrat font-semibold'>{t("bankingApp.title")}</h4>
            <p className='font-roboto font-normal'>{t("bankingApp.description")}</p>
          </div>
        </div>
      </div>

      {/* Call to action button */}
      <Link 
        href='/register' 
        className='flex flex-row items-center gap-4 rounded-lg border-none bg-goldButton hover:goldButtonHover font-inter px-5 py-3 font-semibold md:text-lg'
      >
        {t("cta")}
        <FaLongArrowAltRight />
      </Link>
    </div>
  )
}

export default BilsaBankingCard
