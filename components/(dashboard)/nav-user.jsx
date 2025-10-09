"use client"
import { useRouter } from "next/navigation"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
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
import api from "@/lib/api/api"
import FullPageLoader from "../FullPageLoader";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function NavUser({ user }) {
  const t = useTranslations('nav-user');
  const [isLoading, setIsLoading] = useState(false)
  const userPersonalInfos = user.user;
  const accountInfos = user.account;
  const { isMobile } = useSidebar()
  const router = useRouter();

  // Deconnection flow
  const handleLogout = async () =>{
    setIsLoading(true);
    try {
      await api.post('/auth/logout');
      router.push('/login')
    } catch (error) {
      toast.error(t('logoutError'))
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading 
        ? (<FullPageLoader title={t('logoutLoading')} />) 
        : (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="text-xl text-textGreen font-playfair font-semi-bold outline-none"
                  >
                    {userPersonalInfos?.firstname?.substring(0,2).toUpperCase()}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span> 
                      <span className="text-muted-foreground truncate text-xs">
                        {user.email}
                      </span>
                    </div>
                    <IconDotsVertical className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg z-300"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <span className="rounded-full bg-neutral-100 p-1 text-textGreen font-playfair">{userPersonalInfos.firstname.substring(0,2).toUpperCase()}</span>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.name}</span>
                        <span className="text-muted-foreground truncate text-xs ">
                          {userPersonalInfos.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={'/dashboard/account'}>
                      <DropdownMenuItem className={'text-textGreen '}>
                        <ShieldCheck />
                        {t('account')}
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className={'text-textGreen '}>
                    <IconLogout />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
    </>
  )
}
