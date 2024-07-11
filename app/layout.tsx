import type { Metadata } from "next";
import {
  ClerkProvider
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import NewResponsiveNav from "@/components/BasicNav/NewResponsiveNav";
import { SocketProvider } from "@/components/Context/SocketContext";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

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
      <html lang="en">
        <body
          className={cn(
            "h-screen w-full relative flex-col  antialiased",
            "antialiased",
            fontHeading.variable,
            fontBody.variable
          )}
        >
          <SocketProvider>
          <Toaster />
          <NewResponsiveNav/>
          {children}
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
