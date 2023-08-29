'use client';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Header } from '@/components/';

import '@/app/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className="flex gap-4 items-center flex-col max-w-5xl m-0 p-4">
            <Header />
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
