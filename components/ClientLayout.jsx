'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "./Footer";
export default function ClientLayout({ children }) {
  const pathname = usePathname();

   // 1. Extraire les segments de l'URL
  const segments = pathname.split("/").filter(Boolean); // supprime les vides
  const locale = segments[0]; // ex: 'fr', 'en', etc.

   // 2. Recréer le chemin sans la locale
  const pathWithoutLocale = "/" + segments.slice(1).join("/");

  const hiddenRoutes = [
  "/register",
  "/dashboard",
  "/tableau-de-bord",
  "/panel-de-control",
  "/painel-de-controle",
  "/übersicht",
  "/admin",
  "/inscription",
  "/registrieren"
];




    const hiddenHeaderRoutes = hiddenRoutes.some(route =>
  pathWithoutLocale.startsWith(route)
);

  return (
    <>
     {!hiddenHeaderRoutes && <Header />}
      <main>{children}</main>
       {!hiddenHeaderRoutes && <Footer />}
    </>
  );
}
