import 'styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from 'components/Layout'
import {SigningClientProvider} from 'contexts/client'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SigningClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SigningClientProvider>
  )
}

export default MyApp
