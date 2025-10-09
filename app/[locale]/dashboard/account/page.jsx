'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import api from '@/lib/api/api'
import { toast } from 'sonner'
import FullPageLoader from '@/components/FullPageLoader'
import { MdOutlineMailLock, MdWork } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaMarsStroke, FaQuestionCircle, FaVenus , FaLongArrowAltRight, FaLongArrowAltLeft} from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import Link from 'next/link'
import { IoHomeSharp } from 'react-icons/io5'
import { useTranslations } from 'next-intl'




const AccountPage = () => {
  const [userInfos,setUserInfos] = useState(null);
  const [isLoading, setIsLoading]=useState(true);
  const t = useTranslations("account");
  useEffect(()=>{
   const fetchUserInfos = async () =>{
          try {
            const res = await api.get('/auth/me');
            
            setUserInfos(res.data)
                      
            
            
          } catch (error) {
            console.log('Erreor', error);
            toast.error('Error while feching your account infos ');
          }finally{
            setIsLoading(false)
          }
    }
    fetchUserInfos();
  },[])

 
  return (
    <>
    
    {isLoading 
      ? (<FullPageLoader title='Fetching Account Infos'/>) 
      : (
        <div className='px-5 py-7 min-h-screen text-textGreen md:pl-[20%]'>
        <div className='flex flex-col space-y-7 md:max-w-[60%]'>

          <Link href={'/dashboard'} className='flex flex-row items-center gap-3 text-textGreen text-lg '>
            <FaLongArrowAltLeft />
           {t("back")}
          </Link>
            <div className='flex flex-row gap-4 items-center py-3 px-5 rounded-lg border border-borderGreen'>
               <span className='font-playfair font-xl font-medium p-2 rounded-full bg-neutral-50'> 
                {userInfos.user.firstname.substring(0,2).toUpperCase()}
               </span>

               <span className='font-inter font-medium text-xl'>
                {`${userInfos.user.firstname } ${userInfos.user.surname }`}
               </span>
            </div>


            <div className='flex flex-col space-y-5 py-3 px-5 rounded-lg border border-borderGreen'>
               
                
                <div>
                <h2 className='pb-3 text-lg font-montserrat font-medium'>{t("personal_infos.subtitle")}</h2>
                <hr className='border-borderGreen'/>
                </div>


                 <div className='flex-col flex items-start space-y-3'>
             <h3 className='pb-3 text-lg'>{`${userInfos.user.firstname} ${userInfos.user.surname}`}</h3>
                   <div className='flex flex-row items-center gap-4 font-roboto'>
                  <MdWork className='opacity-50 w-5 h-5'/>
                  {userInfos.user.otherProfession 
                  ? (userInfos.user.otherProfession )
                  : (userInfos.user.profession )}
                 </div>
                 <div className='flex flex-row items-center gap-4 font-roboto'>
                  <MdOutlineMailLock className='opacity-50 w-5 h-5' />
                  {userInfos.user.email}
                 </div>

                 <div className='flex flex-row items-center gap-4 font-roboto'>
                  <FaPhone className='opacity-50 w-5 h-5' />
                  {userInfos.user.phone}
                 </div>

                <div className='flex flex-row items-center gap-4 font-roboto'>
                  
                  {userInfos.user.adress === "woman" 
                  ? (<FaVenus className='opacity-50 w-5 h-5' />) 
                  : (
                    userInfos.user.adress === "lord" 
                    ? (<FaMarsStroke className='opacity-50 w-5 h-5' />) 
                    :(<FaQuestionCircle className='opacity-50 w-5 h-5' />)
                  )}

                    <span>{userInfos.user.adress}</span>
                 </div>

                  {userInfos.user.title && (
                    <div className='flex flex-row items-center gap-4 font-roboto'>
                  <BiSolidMessageAltDetail className='opacity-50 w-5 h-5' />
                  {userInfos.user.title}
                 </div>
                  )}
                 


                 <div className='flex flex-row items-center gap-4 font-roboto'>
                  <LiaBirthdayCakeSolid className='opacity-50 w-5 h-5' />
                  <span>{`${userInfos.user.birthdate} ${t("personal_infos.birth_place")} ${userInfos.user.birthplace}`}</span>
                  
                 </div>

                 <div className='flex flex-row items-center gap-4 font-roboto'>
                  <IoHomeSharp className='opacity-50 w-5 h-5'/>
                  <span>{t("personal_infos.homeTown")} {userInfos.user.birthcountry}</span>
                  
                 </div>

                 <div className='flex flex-row items-center gap-4 font-roboto'>
                  <FaLocationDot className='opacity-50 w-5 h-5'/>
                  <span>{`${t("personal_infos.country")}  ${userInfos.user.postalcode} , ${userInfos.user.street}  ${userInfos.user.housenumber && (` , ${userInfos.user.housenumber}`)}`}</span>
                  
                 </div>


                  



                 </div>


            </div>

            <div className='flex flex-col space-y-5 py-3 px-5 rounded-lg border border-borderGreen'>
                   <div>
                     <h2 className='pb-3 text-lg font-montserrat font-medium'>{t("account_infos.subtitle")}</h2>
                     <hr  className='border-borderGreen'/>
                   </div>

                    <div className='flex flex-col items-start space-y-3'>
                      <div className='text-lg font-medium font-roboto'>Bilsa <span>{userInfos.account.plan}</span></div>
                      <div className='text-lg font-medium font-roboto'>IBAN :<span className='font-normal'> {userInfos.account.iban}</span></div>
                      <div className='text-lg font-medium font-roboto'>{t("account_infos.account_number")} <span className='font-normal'> {userInfos.account.accountNumber}</span></div>
                      <div className='text-lg font-medium font-roboto'>{t("account_infos.currency")}<span className='font-normal'> {userInfos.account.currency}</span></div>
                      <div className='text-lg font-medium font-roboto'>{t("account_infos.status")}<span className='font-normal'>{userInfos.account.statut}</span></div>
                      <div className='text-lg font-medium font-roboto'>{t("account_infos.createdAt")} <span className='font-normal'>{userInfos.account.createdAt.split("T")[0]}</span></div>
                    </div>
                 </div>


                 {userInfos.account.statut === "inactive"  && (
                  <div className='flex flex-col space-y-4 py-4'>
                    <p className='font-roboto font-normal text-left text-textGreen'>{t("validation.phrase")}
                   </p>

                   <Link 
                   href={'/dashboard/account/verify'}
                   className='flex flex-row items-center p-3 justify-center gap-4 rounded-md border-none text-textGreen font-inter font-semibold bg-goldButton '
                   >
                  {t("validation.verify")}
                   <FaLongArrowAltRight />
                   </Link>

                  </div>
                   
                 
                )}
                
        </div>
    </div>
      )}
    </>
  )
}

export default AccountPage