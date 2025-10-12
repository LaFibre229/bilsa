'use client'
import React, { useState , useEffect} from 'react'
import Link from 'next/link'
import { FaLongArrowAltRight, FaLongArrowAltLeft, FaVoicemail } from 'react-icons/fa'
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import api from '@/lib/api/api'
import FullPageLoader from '../FullPageLoader'
import { useRouter } from "next/navigation";
import withAuth from '@/lib/withAuth'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useTranslations } from "next-intl"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const VerifyAccountForm = () => {
    const [isLoaDing, setIsLoaDing] = useState(true)
    const [userDatas, setUserDatas] = useState(null)
    const router = useRouter();
      const t1 = useTranslations('verifyAccount.step1');
    const t2 = useTranslations('verifyAccount.step2');
    const t3 = useTranslations('verifyAccount.step3');
    const t4 = useTranslations('verifyAccount.step4');
    // Actually t3 
    const t5 = useTranslations('verifyAccount.step5');
  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState("")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [currency, setCurrency] = useState("")
   useEffect (() =>{
      const fetchUserInfos = async () =>{
            try {
              const res = await api.get('/auth/me');
              if(res.status === 401){
                toast.error('Your not allowed to this action. Please login and try again')
                router.push('/login')
              }else{
              setUserDatas(res.data);
              
              }
              
                         
            } catch (error) {
              console.log('Erreor', error);
              toast.error('Error while feching your datas. Please login your compte ')
            }finally{
              setIsLoaDing(false)
            }
      }
      fetchUserInfos();
     }, [])
   
  
  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleSubmit = async () => {
    try {
      const res = await api.post("/account/send-code", { email, plan, currency })
      if(res.status === 404){
        toast.error("Please , enter your registration mail .")
        return 
      }
      if(res.status === 200){
        setStep(5)
      }
    } catch (error) {
      console.log(error);
    }
    
   
  }

  const handleVerifyCode = async () => {
  try {
    const res = await api.post("/account/verify-code", { email, code })
    if(res.status === 200){
      toast.success("Account verified!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid or expired code");
    }
  } catch (error) {
    toast.error("Error verifying code");
    console.log(error)
  }
}

  const renderStepContent = () => {
  

    switch (step) {
      
     case 1:
  return (
    <div className='flex flex-col px-4 py-10 space-y-7 text-textGreen'>
      <h1 className='font-playfair font-bold text-2xl'>{t1('heading', { firstname: userDatas.user.firstname })}</h1>
      <p className='font-normal font-roboto text-lg '>
        {t1('description')}
      </p>

      <button
        type="button"
        onClick={handleNext}
        className='bg-goldButton py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer justify-center font-inter font-semibold text-lg text-textGreen '
      >
        {t1('next')}
        <FaLongArrowAltRight />
      </button>
    </div>
  );


     case 2:
  return (
    <div className='flex flex-col items-center space-y-8 text-textGreen'>
      <h3 className='font-montserrat font-bold text-2xl '>{t2('heading')}</h3>

      <p className='text-lg font-roboto text-left'>
        {t2('description')}
      </p>
      <form>
        <div className='flex flex-col space-y-10'>

          <RadioGroup
            className="flex flex-row gap-4 "
            value={plan}
            onValueChange={setPlan}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="free" id="r1" />
              <Label htmlFor="r1" className="text-lg">{t2('free')}</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="move" id="r2" />
              <Label htmlFor="r2" className="text-lg">{t2('move')}</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="pro" id="r3" />
              <Label htmlFor="r3" className="text-lg">{t2('pro')}</Label>
            </div>
          </RadioGroup>

          <div className="mt-6 text-sm text-textGreen">
            {t2('learnMore')}{" "}
            <Link href={'/plans'} className="text-blue-500 underline">{t2('planSection')}</Link>
          </div>

          <div className='flex flex-row gap-4 mt-6 justify-between'>
            <button
              type="button"
              onClick={handleBack}
              className='bg-transparent py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer border border-borderGreen font-inter font-semibold text-textGreen text-lg'
            >
              <FaLongArrowAltLeft />
              {t2('back')}
            </button>
            <button
              type="button"
              disabled={!plan}
              onClick={handleNext}
              className='bg-yellow-500 py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer text-lg text-textGreen font-inter font-semibold'
            >
              {t2('next')}
              <FaLongArrowAltRight />
            </button>
          </div>

        </div>
      </form>
    </div>
  );

  case 3 : 
  return (
    <div className='flex flex-col space-y-8 text-textGreen'>
      <h3 className='font-montserrat font-bold text-2xl text-center'>{t5('heading')}</h3>

      <p className='text-lg font-roboto text-center'>
        {t5('description')}
      </p>
      <form>
        <div className='flex flex-col space-y-10 '>

            

                <div className='border-b border-textGreen flex flex-row py-1 items-center justify-between px-2 cursor-pointer hover:border-b-2'>
                  <div className='space-y-2 flex flex-col w-full'>
                    <label htmlFor="currency" className='text-sm text-textGreen'>{t5('currency')}</label>
                   
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t5("please_select")} />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-white rounded-md shadow-sm">
                           
                              <SelectItem value ="GPB">
                                GBP
                              </SelectItem>

                               <SelectItem value ="EUR">
                                EUR
                              </SelectItem>

                               <SelectItem value ="USD">
                                USD
                              </SelectItem>
                          
                          </SelectContent>
                        </Select>
                     
                    
                  </div>
                </div>
                
              

          

          <div className='flex flex-row gap-4 mt-6 justify-between'>
            <button
              type="button"
              onClick={handleBack}
              className='bg-transparent py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer border border-borderGreen font-inter font-semibold text-textGreen text-lg'
            >
              <FaLongArrowAltLeft />
              {t2('back')}
            </button>
            <button
              type="button"
              disabled={!currency}
              onClick={handleNext}
              className='bg-yellow-500 py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer text-lg text-textGreen font-inter font-semibold'
            >
              {t2('next')}
              <FaLongArrowAltRight />
            </button>
          </div>

        </div>
      </form>
    </div>
  )


   case 4:
  return (
    <div className='flex flex-col items-center space-y-8'>
      <h3 className='font-inter font-bold text-2xl text-textGreen'>{t3('heading')}</h3>
      <p className='font-montserrat font-normal text-textGreen '>{t3('description')}</p>
      <form className='w-full'>

        <div className="relative w-full">
          <input
            value={email}
            type="text"
            id="email"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
          />

          <Label
            htmlFor="email"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
            peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
            peer-[&:not(:placeholder-shown)]:text-textGreen"
          >
            {t3('email')}
          </Label>
        </div>

        <div className='flex flex-row gap-4 mt-6 justify-between pt-8'>
          <button
            type="button"
            onClick={handleBack}
            className='bg-transparent py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer text-textGreen border border-borderGreen font-inter font-semibold text-lg'
          >
            <FaLongArrowAltLeft />
            {t3('back')}
          </button>
          <button
            type="button"
            disabled={!email}
            onClick={handleSubmit}
            className='bg-yellow-500 py-2 px-6 rounded-md cursor-pointer font-inter font-semibold text-textGreen text-lg'
          >
            {t3('send')}
          </button>
        </div>

      </form>
    </div>
  );


      case 5:
  return (
    <div className='flex flex-col items-center space-y-8 px-4 text-textGreen'>
      <h3 className='text-center font-montserrat font-medium'>{t4('heading')}</h3>
      <div className='flex flex-col space-y-5'>
        <div className='flex flex-col items-center space-y-4'>
          <MdOutlineMarkEmailRead />
          <h5>{t4('email')}</h5>
        </div>

        <p className='font-roboto leading-[1.5] text-sm'>
          {t4('codeSent')} <span className='font-semibold'>{email}</span>
        </p>

        <div className='border rounded-lg'>
          <input 
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border-none bg-transparent px-2 py-2 focus:outline-none text-lg "
          />
        </div>

        <div className='flex flex-row gap-4 mt-6'>
          <button
            type="button"
            onClick={handleBack}
            className='border border-textGreen font-inter font-semibold  py-2 px-4 rounded-md text-lg'
          >
            {t4('back')}
          </button>
          <button
            type="button"
            disabled={!code}
            onClick={handleVerifyCode}
            className='bg-goldButton font-inter font-semibold text-lg py-2 px-6 rounded-md'
          >
            {t4('verify')}
          </button>
        </div>
      </div>
    </div>
  );


      default:
        return null
    }
  }

  return (
<>
{isLoaDing 
? (<FullPageLoader />) 
: (<div className="p-4 ">
      <p className="mb-4 font-roboto font-semibold text-textGreen text-lg">Step {step} of 5</p>
      {renderStepContent()}
    </div>)}
    

    </>
  )
}


export default  withAuth(VerifyAccountForm)