import React from 'react'
import {FaCheck} from 'react-icons/fa6'
import { GoDash } from "react-icons/go";
const steps = [
  { id: 1, title: "Personal Data" },
  { id: 2, title: "Registration adress" },
  { id: 3, title: "Employment relationship" },
  { id: 4, title: "Contact details" },
  {id: 5 , title : "Security"}
]


const AsideProgressbar = ({currentStep}) => {
  return (
    <aside className='hidden pt-10 md:flex flex-col space-y-10 px-4'>
         <h2 className='text-textGreen font-bold text-xl'>Your next steps</h2>
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