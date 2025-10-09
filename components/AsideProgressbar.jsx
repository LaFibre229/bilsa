'use client'
import React, { use } from 'react'
import {FaCheck} from 'react-icons/fa6'
import { GoDash } from "react-icons/go";
import { useTranslations } from 'next-intl';


const AsideProgressbar = ({currentStep}) => {
const t = useTranslations("asideProgress.labels")
const steps = [
  { id: 1, title: t('personal') },
  { id: 2, title: t('address') },
  { id: 3, title: t("employment") },
  { id: 4, title: t("contact")},
  {id: 5 , title : t("security")}
]

  return (
    <aside className='hidden pt-10 md:flex flex-col space-y-10 px-4'>
         <h2 className='text-textGreen font-bold text-xl'>{t("title")}</h2>
          <ul className="space-y-8">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-2">
            {/* Icône selon l’état */}
            {step.id < currentStep ? (
              <FaCheck className="text-textGreen size-7" />
            ) : step.id === currentStep ? (
             <GoDash className="text-textGreen size-7"/>
            ) : (
              <span className="w-5 h-5 border border-textGreen rounded-full " />
            )}
            <span
              className={`text-lg  ${
                step.id === currentStep ? "font-bold text-textGreen" : "text-textGreen font-semibold"
              }`}
            >
              {step.title}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AsideProgressbar