import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import Header from '@components/layout/Header/Header';
import Layout from '@components/layout/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
}
