import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import { NavigationLoader } from './components/NavigationLoader';

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/
export const metadata: Metadata = {
  title: "Netflix-Inspired",
  description: "Find all the trendy movies and shows here",
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>My netflix style</title>
      <body
        //className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className="w-screen"
      >
        <Suspense fallback={null}>
          <NavigationLoader />
        </Suspense>
        {children}
      
      </body>
    </html>
  );
}
