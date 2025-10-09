'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LiaCreditCardSolid } from "react-icons/lia";
import { PiHandWithdraw } from "react-icons/pi";
import { RiTodoLine } from "react-icons/ri";
import { AccordionCard } from '@/components/Accordion';

const PlansPage = () => {
  const t = useTranslations('Planspage');
  const [showMonthlyPlans, setShowMonthlyPlans] = useState(true);

  const plans = t.raw('plans');
  const faq = t.raw('faq');

  const renderPlan = (planKey) => {
    const plan = plans[planKey];
    const price = showMonthlyPlans ? plan.priceMonthly : plan.priceYearly;

    const bgColor = {
      free: 'bg-freeGreen',
      move: 'bg-moveGreen text-white',
      pro: 'bg-proGreen text-white'
    }[planKey];

    const borderColor = {
      free: 'border-freeGreen',
      move: 'border-moveGreen',
      pro: 'border-proGreen'
    }[planKey];

    const icons = {
      'card': <LiaCreditCardSolid />,
      'atm': <PiHandWithdraw />,
      'cashback': <RiTodoLine />
    };

    return (
      <div className='rounded-[20px] font-roboto' key={planKey}>
        {/* Header */}
        <div className={`flex flex-col items-start rounded-t-[20px] space-y-4 py-6 px-4 ${bgColor}`}>
          <h2 className='font-bold text-3xl'>{plan.title}</h2>
          <span className='font-semibold text-xl'>{price}</span>
        </div>

        {/* Body */}
        <div className={`px-4 py-6 flex flex-col justify-between space-y-6 rounded-b-[20px] border ${borderColor} text-textGreen`}>
          {plan.details?.map((detail, index) => {
            let icon = null;

            if (detail.toLowerCase().includes("card")) icon = icons.card;
            if (detail.toLowerCase().includes("atm")) icon = icons.atm;
            if (detail.toLowerCase().includes("cashback")) icon = icons.cashback;

            return (
              <div key={index} className='flex flex-col space-y-1 pl-2'>
                {icon ? (
                  <div className='flex flex-row gap-4 items-center'>
                    <span className='text-moveGreen text-xl'>{icon}</span>
                    <span className='text-base'>{detail}</span>
                  </div>
                ) : (
                  <span className='text-base pl-10'>{detail}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='pt-15 px-3 flex flex-col space-y-8'>

      {/* Header */}
      <div className="flex flex-col justify-between items-center py-6 space-y-4 text-textGreen">
        <h1 className='font-playfair font-bold text-4xl'>{t('pageTitle')}</h1>
        <p className='text-lg font font-montserrat'>{t('pageSubtitle')}</p>
      </div>

      {/* Toggle */}
      <div className='w-full flex justify-center items-center'>
        <div className='flex flex-row gap-3 cursor-pointer p-1 items-center rounded-xl border border-moveGreen bg-blue-100'>
          <span
            onClick={() => setShowMonthlyPlans(true)}
            className={`${showMonthlyPlans ? 'py-2 px-4 text-textGreen bg-freeGreen rounded-full' : 'text-borderGreen p-1'} text-sm font-inter`}
          >
            {t('toggleMonthly')}
          </span>
          <span
            onClick={() => setShowMonthlyPlans(false)}
            className={`${!showMonthlyPlans ? 'py-2 px-4 text-textGreen bg-freeGreen rounded-full' : 'text-borderGreen p-1'} text-sm font-inter`}
          >
            {t('toggleYearly')}
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className='flex flex-col space-y-10 py-8 md:grid md:grid-cols-3 md:gap-5 md:px-25'>
        {Object.keys(plans).map((key) => renderPlan(key))}
      </div>

      {/* FAQ */}
      <h2 className='font-playfair font-bold text-4xl text-textGreen text-center'>{t('faqTitle')}</h2>
      <AccordionCard table={faq} />
    </div>
  );
};

export default PlansPage;
