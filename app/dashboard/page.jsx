'use client'
import { SectionCards } from "@/components/(dashboard)/section-cards"
import withAuth from "@/lib/withAuth"
import { useEffect, useState } from "react";
import FullPageLoader from "@/components/FullPageLoader";
import api from "@/lib/api/api"
import { toast } from "sonner";
import { DataTable } from "@/components/(dashboard)/data-table";
import { columns } from "./columns";


  function Page() {
  const [userdata, setUserData] = useState(null);
  const[userTransactions, setUserTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
 useEffect(() => {
  const fetchInfos = async() =>{
    
      try {
        const res = await api.get('/auth/me');
         setUserData(res.data);
         if(res.status === 200){
           setUserTransactions(res.data.transactions)
         }
         
      } catch (error) {
        toast.error('An error occured while user infos')
      }finally{
        setIsLoading(false);
      }
    

  }

  fetchInfos();
    
  }, []);
 
   
     
     
    
    
  return (
    <>
    {isLoading 
    ? (<FullPageLoader title={"Fetching Informations"}/>) 
    : (
      <div className="flex flex-col gap-10 py-4 px-3 md:gap-6 md:py-6">
        <SectionCards userData={userdata}/>  
        <DataTable columns={columns} data={userTransactions} />
        </div>
    )}
    
    </>
  )
}

export default withAuth(Page);
