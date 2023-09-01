'use client';

import { useSession } from 'next-auth/react';

import { Header, Footer } from '@/components/';
import { NextAuthProvider } from '@/app/providers';

import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>MoveMF - Get a move on</title>
      </head>
      <body className="h-full">
        <NextAuthProvider>
          <div className="flex flex-col items-center max-w-5xl m-auto p-4 h-full">
            <Header />
            <div className="flex-1 w-full">{children}</div>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
