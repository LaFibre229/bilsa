'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLock, FaArrowRight } from 'react-icons/fa';
import { RiCloseLargeLine } from 'react-icons/ri';
import { LuMenu } from 'react-icons/lu';
import { GoTriangleDown } from 'react-icons/go';
import BilsaLogo from '@/app/assets/homeLogo.png';
import franceFlag from '../app/assets/france.png';
import { useTranslations } from 'use-intl';
import LocaleSwitcher from './LocalSwitcher';




const Header = () => {
  const t = useTranslations('header');
  const [menuState, setMenuState] = useState(false);

  useEffect(() => {
    if (menuState) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [menuState]);

  return (
    <header className='sticky top-0 left-0'>
      <div className='bg-textGreen px-3 py-5 flex items-center justify-between md:px-25'>
        <Link href={'/'}>
          <span className='font-playfair font-extrabold text-3xl px-2 text-goldButtonHover'>{t('logo')}</span>
        </Link>

        <div className='space-x-4 flex items-center md:hidden'>
          <div className='flex flex-row space-x-3 items-center'>
            {menuState ? (
              <LocaleSwitcher />
            ) : (
              <Link href={'/login'}>
                <div className='flex gap-3 px-3 items-center py-1 rounded-lg border- cursor-pointer'>
                  <FaLock className='text-goldButtonHover' />
                  <span className='text-primary-foreground'>{t('buttons.login')}</span>
                </div>
              </Link>
            )}
            <div className='cursor-pointer md:hidden' onClick={() => setMenuState((prev) => !prev)}>
              <LuMenu className='h-8 w-8 text-primary-foreground' />
            </div>
          </div>
        </div>

        <div className='hidden justify-between space-x-20 items-center font-roboto font-medium md:flex'>
          <div className='flex flex-row space-x-5 items-center font-roboto font-medium text-primary-foreground text-xl'>
            <Link href='/plans'>{t('nav.plans')}</Link>
            <Link href='/about'>{t('nav.about')}</Link>
            <Link href='/contact'>{t('nav.contact')}</Link>
          </div>

          <LocaleSwitcher />

          <Link href={'/login'}>
            <div className='flex gap-3 px-3 items-center py-1 rounded-lg border border-primary-foreground cursor-pointer'>
              <FaLock className='text-goldButton' />
              <span className='text-primary-foreground'>{t('buttons.login')}</span>
            </div>
          </Link>
        </div>
      </div>

      {menuState && (
        <div className='flex top-4 px-5 pt-20 flex-col fixed inset-0 z-100 bg-primary-foreground'>
          <div className='flex flex-col space-y-10 text-textGreen text-xl font-inter font-bold'>
            <div onClick={() => setMenuState(false)} className='absolute top-2 right-3 cursor-pointer'>
              <RiCloseLargeLine className='h-7 w-7' />
            </div>

            <Link href='/plans' onClick={() => setMenuState(false)}>
              <div className='flex flex-row w-full items-center justify-between'>
                <span>{t('nav.plans')}</span>
                <FaArrowRight />
              </div>
            </Link>

            <Link href='/about' onClick={() => setMenuState(false)}>
              <div className='flex flex-row w-full items-center justify-between'>
                <span>{t('nav.about')}</span>
                <FaArrowRight />
              </div>
            </Link>

            <Link href='/contact' onClick={() => setMenuState(false)}>
              <div className='flex flex-row w-full items-center justify-between'>
                <span>{t('nav.contact')}</span>
                <FaArrowRight />
              </div>
            </Link>
          </div>

          <div className='flex flex-col justify-between items-center pt-14 space-y-8'>
            <div className='text-cadetkBlue p-3 rounded-lg bg-goldButton border-none cursor-pointer text-textGreen text-lg font-inter font-semibold'>
              <Link href={'/register'} onClick={() => setMenuState(false)}>
                {t('buttons.register')}
              </Link>
            </div>

            <Link href={'/login'} onClick={() => setMenuState(false)}>
              <div className='flex gap-3 px-3 items-center py-2 rounded-sm text-textGreen font-inter font-medium cursor-pointer'>
                <FaLock className='text-goldButton' />
                <span className='text-cadetkBlue'>{t('buttons.login')}</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
