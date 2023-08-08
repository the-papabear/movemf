import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Layout, Header } from '@/layout';

import 'styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Header />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
