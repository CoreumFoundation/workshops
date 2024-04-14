import type {NextPage} from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'

const Home: NextPage = () => {
  const {walletAddress} = useSigningClient()

  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">
        Welcome to {process.env.NEXT_PUBLIC_CHAIN_NAME} DAO!
      </h1>

      <div className="mt-3 text-2xl">
        Your wallet address is:{' '}
        <pre></pre>
        <Link href={process.env.NEXT_PUBLIC_CHAIN_EXPLORER + "coreum/accounts/" + walletAddress} passHref>
          <a target="_blank" rel="noreferrer" className="font-mono break-all whitespace-pre-wrap link link-primary">
            {walletAddress}
          </a>
        </Link>

      </div>

      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
        <Link href="https://docs.coreum.dev/tools-ecosystem/faucet.html" passHref>
          <a target="_blank" rel="noreferrer"
             className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Funds &rarr;</h3>
            <p className="mt-4 text-xl">
              Fund wallet with {process.env.NEXT_PUBLIC_CHAIN_NAME}.
            </p>
          </a>
        </Link>
        <Link href="/results" passHref>
          <a
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Results &rarr;</h3>
            <p className="mt-4 text-xl">
              See Proposal Results.
            </p>
          </a>
        </Link>
        <Link href="/vote" passHref>
          <a
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Vote &rarr;</h3>
            <p className="mt-4 text-xl">
              Vote On Proposals.
            </p>
          </a>
        </Link>
        <Link href="/propose" passHref>
          <a
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Propose &rarr;</h3>
            <p className="mt-4 text-xl">
              Create your proposals.
            </p>
          </a>
        </Link>
      </div>


    </WalletLoader>
  )
}

export default Home
