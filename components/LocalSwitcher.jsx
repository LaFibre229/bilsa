'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IoMdGlobe } from "react-icons/io";

const locales = ['en', 'fr', 'de', 'es', 'it', 'nl', 'pt'];

const localeNames = {
  en: 'EN',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
  it: 'IT',
  nl: 'NL',
  pt: 'PT'
};

const localeToFlagCode = {
  en: 'gb',  // anglais => drapeau Royaume-Uni
  
  fr: 'fr',
  de: 'de',
  es: 'es',
  it: 'it',
  nl: 'nl',
  pt: 'pt',
};

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale; // Remplace la locale dans l’URL
    const newPath = segments.join('/');
    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 z-2000">
         
            <span className={`fi fi-${localeToFlagCode[currentLocale]} ml-1 mr-2 p-2`} style={{ width: '1.2em', height: '1em' }}></span>
          {localeNames[currentLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
       
       
        <DropdownMenuGroup>
          {locales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={locale === currentLocale ? 'font-semibold' : ''}
            >
           <div className='flex flex-row justify-between items-center px-1 space-x-4'>
       {localeNames[locale]}
               <span className={`fi fi-${localeToFlagCode[locale]} ml-1 mr-2 p-2`} style={{ width: '1.2em', height: '1em' }}></span>
           </div>
             
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
