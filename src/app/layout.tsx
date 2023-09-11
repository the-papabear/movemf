'use client';

import { Mulish } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { Header, Footer } from '@/components/';

import '@/app/globals.css';

const mulish = Mulish({ subsets: ['latin'], display: 'swap', variable: '--font-main' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mulish.variable} h-full`}>
      <head>
        <title>MoveMF - A workout diary app</title>
      </head>
      <body className="h-full font-main">
        <SessionProvider>
          <div className="m-auto flex h-full max-w-5xl flex-col items-center p-4">
            <Header />
            <div className="w-full flex-1">{children}</div>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
