import React from 'react'
import ElementorComponent from '../components/Elementor'
import SecondCardComponent from '../components/SecondCard'
import LastCardComponent from '../components/LastCard'
import SecurityCard from '../components/SecurityCard'
import BilsaBankingCard from '@/components/BilsaBankingCard'
import { AccordionCard } from '@/components/Accordion'

const FAQ = [
  {
     index : "item-1",
     title : "Is Bilsa a bank?",
     body : "Bilsa is one of the few 100% mobile banks to hold a German banking license issued by BaFin, the German Financial Supervisory Authority. This means that all your deposits in your bank accounts are protected up to €100,000 by the German Deposit Protection Scheme. We currently operate in 9 markets and have over 5 million customers."
  },

   {
     index : "item-2",
     title : "Is Bilsa secure?",
     body : "Bilsa has obtained a German banking license issued by BaFin. According to current regulations, each client's funds are protected up to €100,000 by the German Deposit Protection Scheme. The security of our clients' online payments is always guaranteed, as we make it a top priority."
  },

   {
     index : "item-3",
     title : "How does Bilsa protect my money and personal data?",
     body : "As a bank, Bilsa is supervised by the Federal Financial Supervisory Authority (BaFin). Our customers' funds are guaranteed up to €100,000 by the German Deposit Protection Scheme. In addition, the Bilsa app has numerous features to ensure the security of its users' bank accounts and data."
  },

   {
     index : "item-4",
     title : "How to open a Bilsa account?",
     body : "To open a Bilsa account, you must be over 18 years old. You must also have a compatible smartphone. You will be asked to provide other supporting documents, if necessary, to open a Bilsa account."
  },

   {
     index : "item-5",
     title : "What documents do I need to open a bank account?",
     body : "No complicated paperwork is required to open a bank account with Bilsa. All you need is a smartphone. Other supporting documents may also be required."
  },

   {
     index : "item-6",
     title : "How long does it take to open a bank account with Bilsa?",
     body : "You can open your Bilsa mobile account online in just a few minutes via the Bilsa website and without any paperwork. The best part: once your Bilsa bank account is active, you can start using it immediately. This means you can fund your account as soon as it's open, without waiting for your physical card to arrive."
  },

   {
     index : "item-7",
     title : "How to get an IBAN with my Bilsa account",
     body : "All Bilsa customers who open a bank account automatically receive a RIB with a British IBAN, i.e. an IBAN beginning with the letters 'GB'."
  },

   {
     index : "item-8",
     title : "Where can I find my IBAN and account number?",
     body : "To view your BILSA IBAN, go to the ' Account' section by tapping the icon in the lower right corner of the home screen. From there, you can easily copy and paste your IBAN and share it."
  },

   

]
const HomePage = () => {
  return (
    <>
    
    <ElementorComponent />
    <BilsaBankingCard />
     <SecondCardComponent />
    {/* <FirstCardComponent /> */}
    
     {/* <AcceuilCardComponent /> */}
    {/* <FirdCardComponent /> */}
    <LastCardComponent />
   
    <SecurityCard />

     <AccordionCard  table={FAQ}/>
    </>
  )
}

export default HomePage