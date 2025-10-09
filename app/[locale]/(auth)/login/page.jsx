import React from 'react'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { getTranslations } from 'next-intl/server'


const LoginPage = async () => {
  const t = await getTranslations("transaction-progress")
  return (
   <>
   <div className='py-5 flex-col space-y-4'>
    {/* Back button */}
    <Link href={'/'} className='flex flex-row items-center text-lg font-inter font-semibold gap-3 pl-3 text-textGreen'>
    <FaLongArrowAltLeft />
      {t("back")}
    </Link>



   <LoginForm />
   </div>
   
   </>
  )
}

export default LoginPage