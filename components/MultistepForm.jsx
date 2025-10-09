"use client"

import React, { useState } from "react"
import FormHeader from "@/components/FormHeader"
import api from "@/lib/api/api"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {BsExclamationOctagon} from 'react-icons/bs'
import {FaLongArrowAltRight, FaLongArrowAltLeft} from 'react-icons/fa'
import countries from "world-countries";
import { Label } from "@/components/ui/label"
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm, Controller } from "react-hook-form"
 import { createUserSchema} from "@/lib/schemas/UserSchema"
import AsideProgressbar from "@/components/AsideProgressbar"
import {useRouter} from 'next/navigation'
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react";
import FullPageLoader from "./FullPageLoader"
import { useTranslations } from 'next-intl';
import { IconAlertTriangle } from "@tabler/icons-react"

export default function MultiStepForm() {
  const t = useTranslations('accountCreation.steps')
  const validationMessage = useTranslations("accountCreation.errors");
  const schema = createUserSchema(validationMessage)
  // descriptions de chaque étape
   const totalSteps = 5

  const steps = [
    t('step', { current: 1, total: totalSteps, label: t('labels.personal') }),
    t('step', { current: 2, total: totalSteps, label: t('labels.address') }),
    t('step', { current: 3, total: totalSteps, label: t('labels.employment') }),
    t('step', { current: 4, total: totalSteps, label: t('labels.contact') }),
    t('step', { current: 5, total: totalSteps, label: t('labels.security') }),
  ]

  const stepFields = {
  1: [
    "adress",
    "title",
    "firstname",
    "surname",
    "birthname",
    "birthdate",
    "birthplace",
    "birthcountry",
    "nationality",
  ],
  2: ["postalcode", "street", "housenumber", "dateresidence"],
  3: ["profession", "otherProfession"], // exemple, ajuste selon ton step 3
  4: ["email", "phone"],
  5:["password"]
};

const professions =[
  "Student",

"Unemployed",

"Retired",

"Homemaker",

"Self-employed",



"Business Owner",


"Employee",


"Accountant",



"Salesperson",

"Consultant",


"Other"
]
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
   const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1)
  }

  const {
     register,
    handleSubmit,
    trigger,
    formState: { errors , isSubmitting},
    getValues,
    setValue,
    control,
    watch
  } = useForm({
     resolver: zodResolver(schema),
  
    defaultValues: {
      adress: "woman",
      title: undefined,
      firstname:"",
      surname:"",
      birthname:"",
      birthdate:"",
      birthplace:"",
      birthcountry:"",
      nationality:"",
      postalcode :"",
      street :"",
      housenumber :"",
      dateresidence :"",
      profession : "",
      otherProfession:"",
      phone: "",
      email:"",
      password : "",
    },
  })
  

  const selectedProfession = watch("profession");
  const router = useRouter()
const handleNext = async () => {
  
  setValue("birthcountry", getValues("birthcountry") || ""); // force valeur vide si undefined
setValue("nationality", getValues("nationality") || "");

  const isValid = await trigger(stepFields[step]); // valide uniquement ce step
  
  if (!isValid) {
    console.log('error')
    return;
    
    
  }
  setStep((prev) => prev + 1);
};


    

     const onSubmit = async (data) => {
      setIsLoading(true);
       console.log(data)
      try {
         const res = await api.post("/auth/register", data);

         const token = res.data.token
         if(token) {
        localStorage.setItem("token", token);
         }
       
         console.log("User registered", res.data);
          toast.success("Your compte has been successfully created");
           router.push('/dashboard');
        
      } catch (err) {
        toast.error('Something went wrong !');
         if (err.response) {
        console.log(err.response.data.error || "Something went wrong");
      } else {
        console.log("Server error");
      }
        
        console.log(err)
      }finally{
        setIsLoading(false)
      }
    

    
   
   
  };
  
   
  
  
  

  // fonction qui affiche le contenu de l'étape
  const renderStepContent = () => {
    const t1 = useTranslations('accountCreation.step1');
    const t2 = useTranslations("accountCreation.step2");
    const t3 = useTranslations('accountCreation.step3');
const t4 = useTranslations('accountCreation.step4');
const t5 = useTranslations('accountCreation.step5');

    switch (step) {
   case 1:
  return (
    <div className='pt-10 pb-6 px-4 md:px-4 md:py-6 md:flex md:flex-row md:justify-between md:items-start md:space-x-6 md:pr-20'>
      <AsideProgressbar currentStep={1}/>
      
      <div className='pt-6 flex flex-col space-y-6 items-start'>
        <div className="flex flex-col space-y-8 md:space-y-5">
          <h2 className='text-left font-bold leading-[1.8] text-2xl text-textGreen md:text-3xl'>
            {t1('heading')}
          </h2>
          
          <p className='text-textGreen text-lg text-left'>
            {t1('subheading')}
          </p>
        </div>
        <h3 className='text-xl font-semibold text-left text-textGreen'>
          {t1('question')}
        </h3>
        
        <div className='flex flex-row gap-4 items-center'>
          <BsExclamationOctagon  className='size-5 font-bold text-textGreen'/>
          <span className='text-lg font-semibold text-textGreen'>{t1('whyAsk')}</span>
        </div>
        
        <form className="w-full" >
          <div className='flex flex-col space-y-7'>
            
            <div className='flex flex-col justify-between space-y-10 w-full pt-10 md:grid md:grid-cols-2 md:gap-3 md:space-x-3'>

              <div className="flex flex-col space-y-2">

                <span className='text-sm text-textGreen'>{t1('address')}</span>
                
                <Controller
                  name="adress"
                  control={control}
                  defaultValue="woman"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-row items-center"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="woman" id="r1" />
                        <Label htmlFor="r1" className="text-xl">{t1('addressOptions.woman')}</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="lord" id="r2" />
                        <Label htmlFor="r2" className="text-xl">{t1('addressOptions.lord')}</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="other" id="r3" />
                        <Label htmlFor="r3" className="text-xl">{t1('addressOptions.other')}</Label>
                      </div>
                    </RadioGroup>
                  )}
                />

              </div>

              <div className='border-b border-textGreen flex flex-row py-1 items-center justify-between px-2 cursor-pointer hover:border-b-2 md:px-5'>
                <div className='space-y-2 flex flex-col w-full'>
                  
                  {errors.title && (
                     <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.title.message}
                  </div>
                  )}
                  <label htmlFor="title" className='text-sm text-textGreen'>{t1('titleLabel')}</label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t1("please_select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr" >Dr.</SelectItem>
                          <SelectItem value="Dr.Dr" >Dr.Dr</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="firstname"
                  {...register("firstname")}
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.firstname && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.firstname.message}
                  </div>
                )}
                <label
                  htmlFor="firstname"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all
                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base 
                   peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen 
                   peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                   peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t1('firstName')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  {...register('surname')}
                  id="surname"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.surname && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.surname.message}
                  </div>
                )}
                <label
                  htmlFor="surname"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
                   peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                   peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t1('surname')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  {...register('birthname')}
                  id="birthname"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.birthname && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.birthname.message}
                  </div>
                )}
                <label
                  htmlFor="birthname"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                  peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t1('birthname')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  {...register('birthdate')}
                  type="text"
                  id="birthdate"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none "
                />
                {errors.birthdate && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.birthdate.message}
                  </div>
                )}
                <label
                  htmlFor="birthdate"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
                peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                  peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t1('birthdate')}
                </label>
                <span className="text-xs text-textGreen opacity-90">{t1('birthdateFormat')}</span>
              </div>

              <div className="relative w-full">
                <input
                  {...register('birthplace')}
                  type="text"
                  id="birthplace"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.birthplace && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.birthplace.message}
                  </div>
                )}
                <label
                  htmlFor="birthplace"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen 
  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                  peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t1('birthplace')}
                </label>
              </div>

              <div className="flex flex-col space-y-1">

                <div className='border-b border-textGreen flex flex-row py-1 items-center justify-between px-2 cursor-pointer hover:border-b-2'>
                  <div className='space-y-2 flex flex-col w-full'>
                    <label htmlFor="birthcountry" className='text-sm text-textGreen'>{t1('birthcountry')}</label>
                    <Controller
                      name="birthcountry"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t1("please_select")} />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-white rounded-md shadow-sm">
                            {countries.map((country) => (
                              <SelectItem key={country.cca2} value={country.cca2} >
                                {country.name.common}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                {errors.birthcountry && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.birthcountry.message}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-1">

                <div className='border-b border-textGreen flex flex-row py-1 items-center justify-between px-2 cursor-pointer hover:border-b-2'>
                  <div className='space-y-2 flex flex-col w-full'>
                    <label htmlFor="nationality" className='text-sm text-textGreen'>{t1('nationality')}</label>
                    <Controller
                      name="nationality"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t1("please_select")}/>
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto bg-white rounded-md shadow-sm">
                            {countries.map((country) => (
                              <SelectItem key={country.cca2} value={country.cca2}>
                                {country.name.common}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                {errors.nationality && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.nationality.message}
                  </div>
                )}
              </div>                    

              <div className="hidden flex flex-row justify-end pr-6 md:block">
                <button className='rounded-full font-inter font-semibold text-lg text-textGreen bg-goldButton mt-6 py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] cursor-pointer '
                  onClick={handleNext}
                  type='button'>
                  <span>{t1('continue')}</span>
                  <FaLongArrowAltRight />
                </button>  
              </div>

              <div className="flex flex-row justify-end md:hidden">
                <button className='rounded-full font-inter font-semibold text-textGreen bg-goldButton mt-6 py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] cursor-pointer '
                  onClick={handleNext}
                  type='button'>
                  <span>{t1('continue')}</span>
                  <FaLongArrowAltRight />
                </button>  
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );




      case 2:
  return (
    <div className='py-15 px-4 md:px-4 md:py-6 md:flex md:flex-row md:justify-between md:items-start md:space-x-6 md:pr-25'>
      <AsideProgressbar currentStep={2} />

      <div className='pt-6 flex flex-col space-y-6 items-start'>
        <h2 className='text-left font-bold leading-[1.8] text-2xl text-textGreen md:text-3xl'>
          {`${t2('heading')} ${getValues('title')}  ${getValues('firstname')}  ?`}
        </h2>

        <div className='flex flex-row gap-4 items-center'>
          <BsExclamationOctagon className='size-5 font-bold text-textGreen' />
          <span className='text-lg font-semibold text-textGreen'>{t2('whyAsk')}</span>
        </div>

        <form className='w-full'>
          <div className='flex flex-col space-y-7'>

            <div className='flex flex-col justify-between space-y-10 w-full pt-10 md:grid md:grid-cols-2 md:gap-3 md:space-x-3'>

              <div className="relative w-full">
                <input
                  {...register('postalcode')}
                  type="text"
                  id="postalcode"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.postalcode && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.postalcode.message}
                  </div>
                )}
                <label htmlFor="postalcode" className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-textGreen">
                  {t2('postalCode')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  {...register('street')}
                  type="text"
                  id="street"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.street && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.street.message}
                  </div>
                )}
                <label htmlFor="street" className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-textGreen">
                  {t2('street')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  {...register('housenumber')}
                  type="text"
                  id="housenumber"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.housenumber && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.housenumber.message}
                  </div>
                )}
                <label htmlFor="housenumber" className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-textGreen">
                  {t2('houseNumber')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  {...register('dateresidence')}
                  type="text"
                  id="dateresidence"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.dateresidence && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.dateresidence.message}
                  </div>
                )}
                <label htmlFor="dateresidence" className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-textGreen">
                  {t2('residenceSince')}
                </label>
                <span className="text-xs text-freeGreen pl-2">{t2('residenceSinceFormat')}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3 justify-between pt-8 md:flex-row md:py-10">
              <button
                onClick={handleBack}
                className="bg-primary-foreground border border-textGreen font-inter font-semibold disabled:opacity-50 rounded-full py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] md:absolute left-135 cursor-pointer"
              >
                <FaLongArrowAltLeft />
                <span>{t2('back')}</span>
              </button>

              <button
                className="rounded-full font-semibold font-inter text-textGreen bg-goldButton py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] md:absolute right-45 cursor-pointer"
                type="button"
                onClick={handleNext}
              >
                <span>{t2('continue')}</span>
                <FaLongArrowAltRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

     
case 3:
  return (
    <div className='pt-15 text-textGreen pb-4 px-4 md:px-4 md:py-6 md:flex md:flex-row md:items-start md:justify-between md:space-x-12 md:pr-2'>
      <AsideProgressbar currentStep={3} />

      <div className='pt-6 flex flex-col space-y-6 items-start md:mr-15 md:w-[70%]'>

        <h2 className='text-left font-bold leading-[1.8] text-2xl text-textGreen md:text-3xl w-full'>
          {t3('heading')}
        </h2>

        <h3 className='text-xl font-semibold text-left text-textGreen w-full'>
          {t3('question')}
        </h3>

        <div className='flex flex-row gap-4 items-center'>
          <BsExclamationOctagon className='size-5 font-bold text-textGreen' />
          <span className='text-lg font-semibold text-textGreen'>{t3('whyAsk')}</span>
        </div>

        <form className='w-full'>

          <div className="flex flex-col space-y-7">
            <div className='border-b border-textGreen flex flex-row py-1 items-center justify-between px-2 cursor-pointer hover:border-b-2 md:px-5'>
              <div className='space-y-2 flex flex-col w-full'>
                {errors.profession && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.profession.message}
                  </div>
                )}
                <label htmlFor="profession" className='text-sm text-textGreen'>{t3('profession')}</label>
                <Controller
                  name="profession"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t3('please_select')} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto bg-white rounded-md shadow-sm">
                        {professions.map((p, index) => (
                          <SelectItem key={`${p}-${index}`} value={`${p}`}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {selectedProfession === 'Other' && (
              <div className="relative w-full">
                <input
                  {...register('otherProfession')}
                  type="text"
                  id="otherProfession"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.otherProfession && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.otherProfession.message}
                  </div>
                )}
                <label
                  htmlFor="otherProfession"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
              peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
              peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t3('please_specify')}
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3 justify-between pt-10 md:space-y-0 md:flex-row md:py-10">
            <button
              onClick={handleBack}
              type="button"
              className="bg-primary-foreground border border-textGreen text-textGreen text-lg font-semibold font-inter  disabled:opacity-50 rounded-full py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px]  cursor-pointer"
            >
              <FaLongArrowAltLeft />
              <span>{t3('back')}</span>
            </button>

            <button
              className='rounded-full bg-goldButton py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] cursor-pointer text-textGreen text-lg font-semibold font-inter '
              type='button'
              onClick={handleNext}
            >
              <span>{t3('continue')}</span>
              <FaLongArrowAltRight />
            </button>
          </div>

        </form>
      </div>
    </div>
  )
        case 4:
  return (
    <div className='pt-15 pb-5 px-4 md:px-4 md:py-6 md:flex md:flex-row md:justify-between md:items-start md:space-x-6 md:pr-25'>
      <AsideProgressbar currentStep={4} />

      <div className='pt-6 flex flex-col space-y-6 items-start md:w-[70%]'>

        <h2 className='text-left font-bold leading-[1.8] text-2xl text-textGreen md:text-3xl'>
          {t4('heading')}
        </h2>

        <p className="text-textGreen text-lg leading-[1.5]">{t4('description')}</p>

        <div className='flex flex-row gap-4 items-center'>
          <BsExclamationOctagon className='size-5 font-bold text-textGreen' />
          <span className='text-lg font-semibold text-textGreen'>{t4('whyAsk')}</span>
        </div>

        <form className='w-full'>
          <div className='flex flex-col space-y-7'>

            <div className='flex flex-col justify-between space-y-10 w-full pt-10 md:gap-3 '>

              <div className="relative w-full">
                <input
                  {...register('phone')}
                  type="text"
                  id="phone"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.phone && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.phone.message}
                  </div>
                )}
                <label
                  htmlFor="phone"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
              peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
              peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t4('phone')}
                </label>
              </div>

              <div className="relative w-full">
                <input
                  {...register('email')}
                  type="text"
                  id="email"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.email && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.email.message}
                  </div>
                )}
                <label
                  htmlFor="email"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
              peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
              peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t4('email')}
                </label>
              </div>

            </div>
          </div>

          <div className="flex flex-col space-y-3 justify-between pt-10 md:space-y-0 md:flex-row md:py-10">

            <button
              type="button"
              onClick={handleBack}
              className="bg-primary-foreground text-textGreen text-lg font-semibold font-inter border border-textGreen  disabled:opacity-50 rounded-full py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px]  cursor-pointer"
            >
              <FaLongArrowAltLeft />
              <span>{t4('back')}</span>
            </button>

            <button
              className='rounded-full text-textGreen text-lg font-semibold font-inter bg-goldButton py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] cursor-pointer '
              type='button'
              onClick={handleNext}
            >
              <span>{t4('continue')}</span>
              <FaLongArrowAltRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
         case 5:
  return (
    <div className='pt-15 pb-5 px-4 md:px-4 md:py-6 md:flex md:flex-row md:justify-between md:items-start md:space-x-6 md:pr-25'>
      <AsideProgressbar currentStep={5} />

      <div className='pt-6 flex flex-col space-y-6 items-start md:w-[70%]'>

        <h2 className='text-left font-bold leading-[1.8] text-2xl text-textGreen md:text-3xl'>
          {t5('heading')}
        </h2>

        <div className='flex flex-row gap-4 items-center'>
          <BsExclamationOctagon className='size-5 font-bold text-textGreen' />
          <span className='text-lg font-semibold text-textGreen'>
            {t5('whyAsk')}
          </span>
        </div>

        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-7'>

            <div className='flex flex-col justify-between space-y-10 w-full pt-10 md:gap-3'>

              <div className="relative w-full">
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  className="peer w-full border-0 border-b border-textGreen bg-transparent px-0 pt-5 pb-1 text-textGreen hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-textGreen focus:outline-none"
                />
                {errors.password && (
                   <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.password.message}
                  </div>
                )}
                <label
                  htmlFor="password"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                    peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  {t5('password')}
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <p className="text-lg text-textGreen">
                {t5('password_help')}
              </p>

            </div>

          </div>

          <div className="flex flex-col space-y-3 justify-between pt-10 md:space-y-0 md:flex-row md:py-10">

            <button
              type="button"
              onClick={handleBack}
              className="bg-primary-foreground border border-textGreen  disabled:opacity-50 rounded-full py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] text-textGreen text-lg font-semibold font-inter  cursor-pointer"
            >
              <FaLongArrowAltLeft />
              <span>{t5('back')}</span>
            </button>

            <button
              className='text-textGreen text-lg font-semibold font-inter rounded-full bg-goldButton py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] cursor-pointer'
              type='submit'
            >
              <span>{t5('submit')}</span>
              <FaLongArrowAltRight />
            </button>
          </div>

        </form>
      </div>
    </div>
  )

      default:
        return null
    }
  }

  // const handleNext = () => {
  //   if (step < steps.length) setStep((prev) => prev + 1)
  // }

  // const handleBack = () => {
  //   if (step > 1) setStep((prev) => prev - 1)
  // }

  return (
    <>
    {isLoading 
    ? (<FullPageLoader title="Authentification"/>) 
    : (
      <div className="w-full mx-auto bg-white rounded pb-4 ">
      {/* Header dynamique */}
      <FormHeader description={steps[step - 1]} />

      {/* Contenu du formulaire */}
      <div className="p-5">{renderStepContent()}</div>

      
    </div>
    )}
    </>
    
  )
}
