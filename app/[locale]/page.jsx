import React from 'react'
import ElementorComponent from '../../components/Elementor'
import SecondCardComponent from '../../components/SecondCard'
import LastCardComponent from '../../components/LastCard'
import SecurityCard from '../../components/SecurityCard'
import BilsaBankingCard from '@/components/BilsaBankingCard'
import { AccordionCard } from '@/components/Accordion'
import { useTranslations } from 'use-intl'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
// import {use} from 'react';


const HomePage = async () => {
  //  const {locale} = use(params);
  
// setRequestLocale(locale)

const t = await getTranslations('Homepage.accordionCard')
 const faq = t.raw('items')

  return (
    <>
      <ElementorComponent />
      <BilsaBankingCard />
      <SecondCardComponent />
      <LastCardComponent />
      <SecurityCard />
      <AccordionCard table={faq}/>
    </>
  )
}

export default HomePage
