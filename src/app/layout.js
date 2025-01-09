"use client";

import { Inter, Roboto_Mono } from "next/font/google"; // Replace with actual fonts
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-white`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
