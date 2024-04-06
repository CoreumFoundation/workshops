import {createContext, ReactNode, useContext} from 'react'
import {IClientContext, useClientContext,} from 'hooks/client'

let ClientContext: any
let {Provider} = (ClientContext =
  createContext<IClientContext>({
    walletAddress: '',
    signingClient: null,
    coreumQueryClient: null,
    loading: false,
    error: null,
    connectWallet: () => {
    },
    disconnect: () => {
    },
  }))

export const useSigningClient = (): IClientContext =>
  useContext(ClientContext)

export const SigningClientProvider = ({children}: {
  children: ReactNode
}) => {
  const value = useClientContext()
  return <Provider value={value}>{children}</Provider>
}
