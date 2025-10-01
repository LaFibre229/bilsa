"use client"

import { IconCirclePlusFilled, IconTrendingUp , IconLayoutBoardFilled} from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-5 pt-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-transparent text-textGreen font-roboto border border-primary min-w-8 duration-200 ease-linear"
            >
              <Link href={'/dashboard/transactions/create'} className="flex flex-row gap-3 items-center">
              <IconCirclePlusFilled className ="fill-goldButton" />
              <span className="text-textGreen font-roboto text-lg">Transfer</span>
              </Link>
            </SidebarMenuButton>
            <IconTrendingUp className="text-goldButton"/>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          
            <Link href={'/dashboard'}>
            <SidebarMenuItem >
              <SidebarMenuButton tooltip={"Home"} className={'cursor-pointer text-textGreen font-roboto'}>
              <IconLayoutBoardFilled className="text-textGreen size-7"/>
                <span className="text-lg">Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            </Link>
        
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
