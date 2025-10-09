
import React from "react"
import api from "@/lib/api/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import bilsaLogo from '@/app/assets/BilsaLogo.png'
import Image from "next/image"
import Link from "next/link"
import { FaLongArrowAltLeft } from "react-icons/fa"
import { getTranslations } from "next-intl/server"



export default async function TransactionDetailsPage({ params }) {
  const { id } =  await params
  let transaction = null;
 
  try {
    const res = await api.get(`/transactions/${id}`);
   transaction = res.data.transaction
    
  } catch (error) {
    console.log("error fetching transaction details", error)
  }
  

  const date = new Date(transaction.createdAt)
  const formatted = date.toLocaleString("en-US", {
  day: "2-digit",
  month: "short",   // "Sep"
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,    // Format 24h (facultatif, sinon AM/PM)
})

const tomorrow = new Date(transaction.createdAt);
tomorrow.setDate(tomorrow.getDate() + 1);
const formatedTomerrow = tomorrow.toLocaleString("en-US", {
  day: "2-digit",
  month: "short",   // "Sep"
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,    // Format 24h (facultatif, sinon AM/PM)
})


const amount = parseFloat(transaction.amount);
 const t = await getTranslations("account")
  

  return (
    <div className="flex flex-col space-y-6 py-5 px-2">

        <Link href={'/dashboard'}>
        <div className="flex flex-row items-center gap-2 pl-3 pb-7 cursor-pointer font-inter font-semibold text-lg text-textGreen">
           <FaLongArrowAltLeft />
           <span className="font-bold">{t("back")}</span>
        </div>
        </Link>

        <div className="flex flex-col space-y-10 py-12 md:px-35 ">

          <div className="flex flex-row gap-2 pl-5 pb-10 ">
            {/* Banq logo */}
            <Image src={bilsaLogo} className="w-10 h-10 cursor-pointer"/>
              
              <div className="flex flex-col ">
                <span className="font-playfair font-medium text-lg text-textGreen">BILSA BANK</span>
                <span className="font-roboto text-darkGrayishBlue text-[10px]">Client inspired Bank</span>

              </div>

            
          
        </div>
      
      {transaction && (
        <Card className="p-4 border-borderGreen">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-center text-inter text-textGreen">Payment confirmation</CardTitle>

    <CardDescription className='py-3'>
        <div className="flex flex-col items-center">
            <h4>Transaction ID <span className="font-mono">{id}</span></h4>
            <div>Created on   <span className="font-bold font-roboto">{formatted}</span></div>
        </div>
            
       
        </CardDescription>
    
  </CardHeader>

  <CardContent>
    <div className="flex flex-col space-y-6">
       {transaction.senderInfos  && (
        <div className="flex flex-col w-full text-textGreen space-y-2">
            <h5 className="font-semibold font-montserrat ">Payer</h5>
            <div className="flex flex-row justify-between font-roboto text-xs">
                <span>Account name</span>
                <span className=" font-medium">{transaction.senderInfos.name}</span>
            </div>

            <div className="flex flex-row justify-between font-roboto text-xs">
                <span>Account number in IBAN format</span>
                <span className="font-medium">{transaction.senderInfos.iban}</span>
            </div>
        </div>
        
        
       )}

       {transaction.receiverInfos && (
        <div className="flex flex-col w-full text-textGreen space-y-2">
            <h5 className="font-semibold font-montserrat">Beneficiary</h5>
            <div className="flex flex-row justify-between font-roboto text-xs">
                <span>Account name</span>
                <span className="font-medium">{transaction.receiverInfos.name}</span>
            </div>

            <div className="flex flex-row justify-between font-roboto text-xs ">
                <span>Account number</span>
                <span className=" font-medium">{transaction.receiverInfos.iban}</span>
            </div>
        </div>
        
        
       )}



       <div className="flex flex-col w-full text-textGreen space-y-2">
            <h5 className="font-semibold font-montserrat">Payment details</h5>

            <div className="flex flex-row justify-between font-roboto text-xs">
                <span>Amount</span>
                <span className=" font-medium">{`${amount} EUR`}</span>
            </div>

            <div className="flex flex-row justify-between font-roboto text-xs">
                <span>Realization date</span>
                <span className="font-semibold">{formatted}</span>
            </div>

            <div className="flex flex-row justify-between font-roboto text-xs">
                <span>Value date</span>
                <span className=" font-medium">{formatedTomerrow}</span>
            </div>
        </div>

        <div className="flex flex-row justify-between font-roboto text-xs text-textGreen">
                <span>Purpose of payment</span>
                <span className=" font-medium">{transaction.motif ? (transaction.motif) : ("Not specified")}</span>
            </div>

            <div className="flex flex-row justify-between font-roboto text-xs text-textGreen">
                <span>Transaction status</span>
                <span className=" font-medium">
                    {transaction.status === "in_process" 
                    ? ("pending") 
                    : (transaction.status)}
                    
                    </span>
            </div>
        
    </div>
  </CardContent>
  <CardFooter className="pt-6">
    <div className="text-[10px] text-left font-roboto text-textGreen">This payment transaction is executed on terms agreed by the contract under 
        which BilsaBank provides payment services to its clients - The payer (particulary onterms stipulated in the Technical Conditions of BilsaBank) . This confirmation shall not serve as proof of delivery
        of the payment transaction amount to de recipient of the payment service provider. This confirmation is issued of request of the client 
    </div>
  </CardFooter>
</Card>
      )}

        </div>

        
     
    </div>
  )
}
