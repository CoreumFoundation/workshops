import {useState} from 'react'
import {connectKeplr} from 'services/keplr'
import {createProtobufRpcClient, defaultRegistryTypes, GasPrice, QueryClient,} from '@cosmjs/stargate'
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {SigningCosmWasmClient} from '@cosmjs/cosmwasm-stargate'
import {QueryClient as CoreumQueryClient} from "../coreum/query"
import {GeneratedType, Registry} from "@cosmjs/proto-signing";
import {coreumRegistryTypes} from "../coreum/tx";

export interface IClientContext {
  walletAddress: string
  signingClient: SigningCosmWasmClient | null
  coreumQueryClient: CoreumQueryClient | null
  loading: boolean
  error: any
  connectWallet: any
  disconnect: Function
}

const PUBLIC_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const GAS_PRICE = process.env.NEXT_PUBLIC_GAS_PRICE || ''

export const useClientContext = (): IClientContext => {
  const [walletAddress, setWalletAddress] = useState('')
  const [signingClient, setSigningClient] =
    useState<SigningCosmWasmClient | null>(null)
  const [tmClient, setTmClient] =
    useState<Tendermint34Client | null>(null)
  const [coreumQueryClient, setCoreumQueryClient] =
    useState<CoreumQueryClient | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const connectWallet = async () => {
    setLoading(true)

    try {
      await connectKeplr()

      // enable website to access keplr
      await (window as any).keplr.enable(PUBLIC_CHAIN_ID)

      // get offline signer for signing txs
      const offlineSigner = await (window as any).getOfflineSigner(
        PUBLIC_CHAIN_ID
      )

      // register default and custom messages
      let registryTypes: ReadonlyArray<[string, GeneratedType]> = [
        ...defaultRegistryTypes,
        //...coreumRegistryTypes,
      ]
      const registry = new Registry(registryTypes)

      // signing client
      const client = await SigningCosmWasmClient.connectWithSigner(
        PUBLIC_RPC_ENDPOINT,
        offlineSigner,
        {
          //we need to update this to a standard registry
          //registry: registry,
          gasPrice: GasPrice.fromString(GAS_PRICE),
        },
      )
      setSigningClient(client)

      // rpc client
      const tendermintClient = await Tendermint34Client.connect(PUBLIC_RPC_ENDPOINT);
      setTmClient(tendermintClient)
      const queryClient = new QueryClient(tendermintClient);
      setCoreumQueryClient(new CoreumQueryClient(createProtobufRpcClient(queryClient)))

      // get user address
      const [{address}] = await offlineSigner.getAccounts()
      setWalletAddress(address)
      setLoading(false)
    } catch (error: any) {
      console.error(error)
      setError(error)
    }
  }

  const disconnect = () => {
    if (signingClient) {
      signingClient.disconnect()
    }
    if (tmClient) {
      tmClient.disconnect()
    }
    setWalletAddress('')
    setSigningClient(null)
    setLoading(false)
  }

  return {
    walletAddress,
    signingClient,
    coreumQueryClient: coreumQueryClient,
    loading,
    error,
    connectWallet,
    disconnect,
  }
}
