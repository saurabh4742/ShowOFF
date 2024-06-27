import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/BasicNav/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "ShowOFF",
  description: "Welcome to the World of Opportunities with ShowOFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang='en'>
      <body className={cn(
          "min-h-screen w-full relative flex-col gap-2 font-sans antialiased",
          fontSans.variable
        )}>
          <Toaster/>
          <Navbar/>
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}
