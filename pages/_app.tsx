import type { AppProps } from "next/app";

import Layout from "@components/layout/Layout/Layout";

import "@/styles/globals.css";
import Header from "@components/layout/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
}
