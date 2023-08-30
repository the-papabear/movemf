'use client';

import '@/app/globals.css';
import { Header } from '@/components/';
import { NextAuthProvider } from '@/app/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="flex gap-4 items-center flex-col max-w-5xl m-0 p-4">
            <Header />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
