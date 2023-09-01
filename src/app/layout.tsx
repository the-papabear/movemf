'use client';

import { Header, Footer } from '@/components/';
import { NextAuthProvider } from '@/app/providers';
import { Metadata } from 'next';

import '@/app/globals.css';

// export const metadata: Metadata = {
//   title: 'MoveMF',
//   description: 'MoveMF - A workout diary app',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>MoveMF - A workout diary app</title>
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
