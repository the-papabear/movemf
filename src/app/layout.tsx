import { PropsWithChildren } from 'react';
import { Mulish } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NextAuthProvider } from '@/app/providers';

import '@/app/globals.css';

const mulish = Mulish({ subsets: ['latin'], display: 'swap', variable: '--font-main' });

export const metadata = {
  title: 'Movemf - Minimalist workout diary',
  description: 'A minimalist workout diary app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${mulish.variable} h-full`}>
      <body className="h-full font-main">
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
