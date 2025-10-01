'use client'
import { AppSidebar } from "@/components/(dashboard)/app-sidebar"
import { SiteHeader } from "@/components/(dashboard)/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import api from "@/lib/api/api";
import { useState, useEffect } from "react";
import FullPageLoader from '@/components/FullPageLoader'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import withAuth from "@/lib/withAuth";



 function DashboardLayout({ children }) {
   const [userDatas, setUserDatas] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const router = useRouter();
     
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
   }, [router])

  return (
    <>
    {isLoading 
    ? (<FullPageLoader/>) 
    : (
        <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" userDatas={userDatas}/>
      <SidebarInset>
        <SiteHeader />
        
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            
             {children}
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    )}
            
            
 
    </>
  );
}

export default withAuth(DashboardLayout)
