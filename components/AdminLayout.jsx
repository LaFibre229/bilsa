import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./(admin)/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}