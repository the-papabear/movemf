import type { AppProps } from 'next/app';

import Layout from '@/layout/Layout';
import Header from '@/layout/Header/Header';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
}
