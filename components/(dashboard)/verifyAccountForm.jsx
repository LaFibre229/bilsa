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


const VerifyAccountForm = () => {
    const [isLoaDing, setIsLoaDing] = useState(true)
    const [userDatas, setUserDatas] = useState(null)
    const router = useRouter();
  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState("")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
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
      const res = await api.post("/account/send-code", { email, plan })
      if(res.status === 404){
        toast.error("Please , enter your registration mail .")
        return 
      }
      if(res.status === 200){
        setStep(4)
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
            <h1 className='font-playfair font-bold text-2xl'>Hi {userDatas.user.firstname}👋</h1>
            <p className='font-normal font-roboto text-lg '>
             Just one more step and you'll be able to enjoy full access to your Bilsa account. Complete these quick steps and unlock all our banking services right away.
            </p>

            
           <button
            type="button"
                  onClick={handleNext}
                  className='bg-goldButton py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer justify-center font-inter font-semibold text-lg text-textGreen '
                >
                  Next
                  <FaLongArrowAltRight />
                </button>
          </div>
        )

      case 2:
        return (
          <div className='flex flex-col items-center space-y-8 text-textGreen'>
            <h3 className='font-montserrat font-bold text-2xl '>Choose a Plan</h3>

            <p className='text-lg font-roboto text-left'>
                Choose the plan that best fits your needs  and start enjoying a banking experience tailored to your lifestyle.
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
                  <Label htmlFor="r1" className="text-lg">Bilsa Free</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="move" id="r2" />
                  <Label htmlFor="r2" className="text-lg">Bilsa Move</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="pro" id="r3" />
                  <Label htmlFor="r3" className="text-lg">Bilsa Pro</Label>
                </div>
              </RadioGroup>

              <div className="mt-6 text-sm text-textGreen">
                Learn more about our plans on{" "}
                <Link href={'/plans'} className="text-blue-500 underline">Plan section</Link>
              </div>

              <div className='flex flex-row gap-4 mt-6 justify-between'>
                <button
                  type="button"
                  onClick={handleBack}
                  className='bg-transparent py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer border border-borderGreen font-inter font-semibold text-textGreen text-lg'
                >
                <FaLongArrowAltLeft />
                  Back
                  
                </button>
                <button
                  type="button"
                  disabled={!plan}
                  onClick={handleNext}
                  className='bg-yellow-500 py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer text-lg text-textGreen font-inter font-semibold'
                >
                  Next
                  <FaLongArrowAltRight />
                </button>
              </div>

                </div>
              
            </form>
          </div>
        )

      case 3:
        return (
          <div className='flex flex-col items-center space-y-8'>
            <h3 className='font-inter font-bold text-2xl text-textGreen'>Confirm your email address</h3>
            <p className='font-montserrat font-normal text-textGreen '>We'll send a code to your email to verify it . This email must match the one you provided during registration. </p>
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
                            Email
                        </Label>
                         </div>

            <div className='flex flex-row gap-4 mt-6 justify-between pt-8'>
             <button
                  type="button"
                  onClick={handleBack}
                className='bg-transparent py-2 px-6 flex flex-row items-center gap-3 rounded-md cursor-pointer text-textGreen border border-borderGreen font-inter font-semibold text-lg'
                >
                <FaLongArrowAltLeft />
                  Back
                  
                </button>
              <button
                type="button"
                disabled={!email}
                onClick={handleSubmit}
                className='bg-yellow-500 py-2 px-6 rounded-md cursor-pointer font-inter font-semibold text-textGreen text-lg'
              >
                Send code
              </button>
            </div>


             </form>
            
            

          </div>
        )

      case 4:
        return (
          <div className='flex flex-col items-center space-y-8 px-4 text-textGreen'>
            <h3 className='text-center font-montserrat font-medium'>Device verification</h3>
            <div className='flex flex-col space-y-5'>
                  <div className='flex flex-col items-center space-y-4'>
                  <MdOutlineMarkEmailRead />
                  <h5>Email</h5>
                  </div>
                  

                  <p className='font-roboto leading-[1.5] text-sm'>We just sent your authentication code via email to <span className='font-semibold'>{email}</span> </p>


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
                Back
              </button>
              <button
                type="button"
                disabled={!code}
                onClick={handleVerifyCode}
                className='bg-goldButton font-inter font-semibold text-lg py-2 px-6 rounded-md'
              >
                Verify
              </button>
            </div>



            </div>
            

            
          </div>
        )

      default:
        return null
    }
  }

  return (
<>
{isLoaDing 
? (<FullPageLoader />) 
: (<div className="p-4 ">
      <p className="mb-4 font-roboto font-semibold text-textGreen text-lg">Step {step} of 4</p>
      {renderStepContent()}
    </div>)}
    

    </>
  )
}


export default  withAuth(VerifyAccountForm)