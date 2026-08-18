
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from "@/componenets/Nav";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "API Hub",
  description: "Multiple API at one Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      
      <body className={`${sora.variable} ${inter.variable}`}>
        <Nav/>

        {children}
        
        </body>
    </html>
  );
}
