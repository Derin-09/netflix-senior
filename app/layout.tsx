import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>My Netflix Style</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body
        //className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className="w-screen"
      >
        {children}
      </body>
    </html>
  );
}
