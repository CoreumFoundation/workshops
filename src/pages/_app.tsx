import type { AppProps } from "next/app";

import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr-extension";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as frontier } from "@cosmos-kit/frontier";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { chains, assets } from "chain-registry";
import "@interchain-ui/react/styles";
import "@/styles/globals.css";
import Head from "next/head";
import CoreumProvider from "@/contexts/CoreumSignerProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <meta name="" content="" />
        <title>Coreum</title>
      </Head>
      <ChainProvider
        //@ts-ignore
        chains={chains}
        assetLists={assets}
        wallets={[
          ...keplrWallets,
          ...leapWallets,
          ...frontier,
          ...cosmostationWallets,
        ]}
        walletConnectOptions={{
          signClient: {
            projectId: "",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "Coreum Template App",
              description: "Coreum Template App",
              url: "https://www.coreum.com/",
              icons: [],
            },
          },
        }}
      >
        <CoreumProvider>
          <Component {...pageProps} />
        </CoreumProvider>
      </ChainProvider>
    </>
  );
}