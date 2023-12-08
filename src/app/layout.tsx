import { PropsWithChildren } from 'react';
import { Mulish } from 'next/font/google';

import Footer from '@/components/Footer';

import '@/app/globals.css';

const mulish = Mulish({ subsets: ['latin'], display: 'swap', variable: '--font-main' });

export const metadata = {
  title: 'Movemf - Minimalist workout diary',
  description: 'A minimalist workout diary app',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={`${mulish.variable}`}>
      <body className="font-main h-screen bg-gray-100">
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
