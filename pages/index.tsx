import Head from 'next/head';

import { MainContent } from '@components/layout/MainContent/MainContent';

export default function Home() {
  return (
    <>
      <Head>
        <title>MoveMF - Get a move on!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent />
    </>
  );
}
