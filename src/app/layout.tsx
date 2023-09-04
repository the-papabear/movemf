'use client';

import { Header, Footer } from '@/components/';
import { NextAuthProvider } from '@/app/providers';

import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>MoveMF - A workout diary app</title>
      </head>
      <body className="h-full">
        <NextAuthProvider>
          <div className="m-auto flex h-full max-w-5xl flex-col items-center p-4">
            <Header />
            <div className="w-full flex-1">{children}</div>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
