
import React from 'react'
import Link from 'next/link'
import CreateTransactionForm from '@/components/CreateTransactionForm'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const page = ({searchParams}) => {

    const accountId = searchParams?.accountId
  
  console.log(accountId)
  return (
    <div className='flex flex-col space-y-6 py-4 px-3'>

      <Link href={'/admin/adminDashboard/accounts'}>

      <div className='flex flex-row items-center gap-3 font-inter text-textGreen text-lg font-semibold'>
        <FaLongArrowAltLeft />
        back
      </div>
      
      </Link>
      
        <CreateTransactionForm context='admin' accountId={accountId} />

    </div>
  )
}

export default page