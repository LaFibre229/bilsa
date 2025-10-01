'use client'
import React from 'react'
import Image from 'next/image'
import SpinnerImg from '../app/assets/SpinnerLoaderImg.svg'

const FullPageLoader = ({ title = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 text-center py-10">
      <Image src={SpinnerImg} alt="Chargement..." width={60} height={60} />
      <p className="text-2xl font-bold text-textGreen">{title}</p>
    </div>
  )
}

export default FullPageLoader
