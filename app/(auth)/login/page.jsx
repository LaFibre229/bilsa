import React from 'react'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import { FaLongArrowAltLeft } from 'react-icons/fa'
const LoginPage = () => {
  return (
   <>
   <div className='py-5 flex-col space-y-4'>
    {/* Back button */}
    <Link href={'/'} className='flex flex-row items-center text-lg font-inter font-semibold gap-3 pl-3 text-textGreen'>
    <FaLongArrowAltLeft />
      back
    </Link>



   <LoginForm />
   </div>
   
   </>
  )
}

export default LoginPage