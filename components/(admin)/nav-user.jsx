"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
  IconLogout2
} from "@tabler/icons-react"
import api from "@/lib/api/api"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"



export function NavUser() {
  const { isMobile } = useSidebar()
   const router = useRouter();
  //  Deconnection flow
  const handleLogout = async () =>{
   await api.post('/admin/auth/logout');
   router.push('/admin/auth/login')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={handleLogout}
            >
                Déconnexion
             
              <IconLogout2 className="ml-auto size-4" />
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
