import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import { Inter } from 'next/font/google'
import { NavigationLoader } from "@/components/NavigationLoader";
import { Toaster } from 'sonner'

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
*/

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyFlix",
  description: "Find all the trendy movies and shows here",
  icons: {
    icon: '/favicon.ico', 
  },
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My netflix style</title>
      <body
        className={` ${inter.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <NavigationLoader />
        </Suspense>
        {children}
      <Toaster richColors closeButton />
      </body>
    </html>
  );
}
