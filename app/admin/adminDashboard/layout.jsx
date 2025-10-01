
'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/(admin)/app-sidebar"
import withAdminAuth from "@/lib/utils/withAdminAuth"
function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      
        <SidebarTrigger />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
        {children}
        </div>
        </div>
    
    </SidebarProvider>
  )
}

export default withAdminAuth(AdminLayout)