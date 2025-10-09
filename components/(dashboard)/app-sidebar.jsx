"use client"
import { NavMain } from "@/components/(dashboard)/nav-main"
import { NavUser } from "@/components/(dashboard)/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function AppSidebar({userDatas,...props }) {

 
  return (
    <>
   <Sidebar collapsible="offcanvas" {...props}>
       <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                
                <span className="text-textGreen font-semibold font-montserrat px-12 py-2 rounded-xl bg-muted ">{`${userDatas?.user?.firstname} ${" "} ${userDatas?.user?.surname}`}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain/>
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDatas} />
      </SidebarFooter>
    </Sidebar>
    </>
    
  )
}
