'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'use-intl'

const legalLinks = [
  { key: "0" },
  { key: "1" },
  { key: "2" },
  { key: "3" }
]

const contactLinks = [
  { key: "0" },
  { key: "1" }
]

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className='bg-textGreen text-primary-foreground'>
      <div className='px-3 pt-20 flex flex-col md:flex-row md:px-25 md:items-start md:justify-between md:pb-10'>
        <div className='flex flex-col space-y-10 pb-5'>
          <div className='flex items-center gap-4 font-playfair font-extrabold text-5xl'>
            {t('brand')}
          </div>
          <p className='text-xl font-montserrat font-medium'>{t('slogan')}</p>
        </div>

        <div className='py-5 font-montserrat'>
          <h2 className='font-semibold text-xl pb-2'>{t('legal.title')}</h2>
          <div className='flex flex-col space-y-4 items-start'>
            {t.raw('legal.links', { returnObjects: true }).map((l, index) => (
              <Link className='text-lg' key={index} href={l.url}>{l.title}</Link>
            ))}
          </div>
        </div>

        <div className='py-5 font-montserrat'>
          <h2 className='font-semibold text-xl pb-2'>{t('contact.title')}</h2>
          <div className='flex flex-col space-y-4 items-start'>
            {t.raw('contact.links', { returnObjects: true }).map((l, index) => (
              <Link className='text-lg' key={index} href={l.url}>{l.title}</Link>
            ))}
          </div>
        </div>
      </div>

      <hr className='border-b border-darkGrayishBlue m-none'/>

      <div className='pt-15 pb-24 md:px-25'>
        <p className='px-3 text-justify font-roboto leading-[1.5] text-lg'>
          {t('description')}
        </p>
      </div>
    </footer>
  )
}

export default Footer
