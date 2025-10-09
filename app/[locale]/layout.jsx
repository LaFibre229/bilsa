import { Roboto, Playfair_Display, Inter,Montserrat, Bokor} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ClientLayout from "@/components/ClientLayout";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 import { setRequestLocale } from "next-intl/server";
import 'flag-icons/css/flag-icons.min.css';
// Roboto pour petits textes
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

// Bokor pour paragraphes
const bokor = Bokor({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bokor", 
});

// Playfair Display pour titres
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

// Montserrat pour sous-titres
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['200','400','300'],
  variable: "--font-montserrat",
});

// Inter pour UI
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Billsa Bank",
  description: "Your online banking app",
};


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}



export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;

  

  return (
    <html lang={locale}>
      <body className={`${roboto.variable} ${playfair.variable} ${inter.variable} ${bokor.variable} ${montserrat.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}