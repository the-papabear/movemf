import { PropsWithChildren } from 'react';
import { Mulish } from 'next/font/google';

import Footer from '@/components/Footer';

import '@/app/globals.css';
import { NextAuthProvider } from '@/app/auth/NextAuthProvider';

const mulish = Mulish({ subsets: ['latin'], display: 'swap', variable: '--font-main' });

export const metadata = {
  title: 'Movemf - Minimalist workout diary',
  description: 'A minimalist workout diary app',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={`${mulish.variable}`}>
      <body className="font-main flex h-screen flex-col bg-gray-100">
        <NextAuthProvider>
          <div className="flex-1">{children}</div>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
