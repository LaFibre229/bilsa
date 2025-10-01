'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "./Footer";
export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hiddenHeaderRoutes = pathname === "/register" || pathname.startsWith("/dashboard" )|| pathname.startsWith("/admin" );

  return (
    <>
     {!hiddenHeaderRoutes && <Header />}
      <main>{children}</main>
       {!hiddenHeaderRoutes && <Footer />}
    </>
  );
}
