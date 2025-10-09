'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api/api'
import React from 'react'
import Link from 'next/link'
import FullPageLoader from '@/components/FullPageLoader'
import CreateTransactionForm from '@/components/CreateTransactionForm'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const CreateTransactionPage = () => {
     const [userDatas, setUserDatas] = useState(null)
       const [isLoading, setIsLoading] = useState(true)
       
         
       useEffect (() =>{
        const fetchUserInfos = async () =>{
              try {
                const res = await api.get('/auth/me');
               
                setUserDatas(res.data)
                            
                
                
              } catch (error) {
                console.log('Erreor', error);
                toast.error('Error while feching your datas. Please login your compte ')
              }finally{
                setIsLoading(false)
              }
        }
        fetchUserInfos();
       }, [])

       

  return (
    <>
    {isLoading 
    ? (<FullPageLoader title='Loading ... '/>) 
    : (
        
        <div className='py-10 px-3 flex flex-col space-y-6'>
      
      <Link href='/dashboard' className='flex flex-row gap-3 items-center text-lg font-semibold text-textGreen'>
        <FaLongArrowAltLeft />
        back

      </Link>
      
      {userDatas && (
    <CreateTransactionForm context='client'  accountId={userDatas.account._id}/>
      )}
      
    </div>
    
  

    

  )
}
</>
  )}


export default CreateTransactionPage