import { Roboto, Playfair_Display, Inter,Montserrat, Bokor} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ClientLayout from "@/components/ClientLayout";



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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${playfair.variable} ${inter.variable} ${bokor.variable} ${montserrat.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster position = "top-center"/>
      </body>
    </html>
  );
}
