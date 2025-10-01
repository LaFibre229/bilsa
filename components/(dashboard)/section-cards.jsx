"use client"

import { IconArrowUpRight, IconCircleCheckFilled, IconTrendingDown, IconTrendingUp, IconUsers, IconExclamationCircleFilled } from "@tabler/icons-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


  
 


export function SectionCards({userData}) {
  
  return (
    <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-2 lg:px-6">
      

        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl text-textGreen font-semibold font-playfair">Hello  {userData.user.firstname} 👋</CardTitle>
              
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col items-start space-y-6">
              
              <p className="text-xm text-textGreen font-montserrat">The latest transactions related to your account will appear below. Check the transaction page for an overview.</p>
              
              </div>
              
           
          </CardContent>
        </Card>

        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg text-textGreen font-medium font-roboto">Bilsa {userData.account.plan}</CardTitle>
            
            <div className="flex flex-row gap-2 items-center py-2">
                
             {userData.account.statut === "active" 
             ? (<IconCircleCheckFilled  className="fill-green-500" size={16}/>) 
             : (<IconExclamationCircleFilled className="text-red-600" size={16}/>)}
              <span className="text-xs text-textGreen">{userData.account.statut}</span>
            </div>
            
          </CardHeader>
          <hr className="border-goldButton"/>
          <CardContent>
            <div className="flex flex-col space-y-3 items-start">
               <div className="text-textGreen text-xl font-montserrat font-semibold">Balance : <span className="font-medium">{` ${userData.account.currency} ${" "} ${userData.account.balance}`}</span></div>
               <div className="text-textGreen text-lg font-montserrat font-semibold md:text-xl">IBAN : <span className="font-medium">{` ${userData.account.iban}`}</span></div>
               <div className="text-textGreen text-lg font-montserrat font-semibold md:text-xl">Account Number : <span className="font-medium">{` ${userData.account.accountNumber}`}</span></div>
            </div>
           

           {/* <div>
                   <p className="font-inter text-lg">IBAN : {userData.account.iban}</p>
              <p className="font-inter text-lg">Account Number : {userData.account.accountNumber}</p>
              </div> */}
          </CardContent>
        </Card>
      
    </div>
  )
}
