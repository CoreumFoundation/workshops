import { FC } from "react";
import {
  ConfigureGrazArgs,
  defineChainInfo,
  GrazProvider,
  WalletType,
} from "graz";

interface WalletProviderProps {
  children: React.ReactNode;
}

export const coreummainnet = defineChainInfo({
  chainId: "coreum-mainnet-1",
  currencies: [
    {
      coinDenom: "core",
      coinMinimalDenom: "ucore",
      coinDecimals: 6,
      coinGeckoId: "coreum",
    },
  ],
  rest: "https://coreum-api.ibs.team",
  rpc: "https://coreum-rpc.ibs.team",
  bech32Config: {
    bech32PrefixAccAddr: "core",
    bech32PrefixAccPub: "corepub",
    bech32PrefixValAddr: "corevaloper",
    bech32PrefixValPub: "corevaloperpub",
    bech32PrefixConsAddr: "corevalcons",
    bech32PrefixConsPub: "corevalconspub",
  },
  chainName: "coreum",
  feeCurrencies: [
    {
      coinDenom: "core",
      coinMinimalDenom: "ucore",
      coinDecimals: 6,
      coinGeckoId: "coreum",
      gasPriceStep: {
        low: 0.0625,
        average: 0.0625,
        high: 62.5,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "core",
    coinMinimalDenom: "ucore",
    coinDecimals: 6,
    coinGeckoId: "coreum",
  },
  bip44: {
    coinType: 990,
  },
});

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const grazOptions: ConfigureGrazArgs = {
    chains: [coreummainnet],
    autoReconnect: true,
    defaultWallet: WalletType.KEPLR,
  };

  return <GrazProvider grazOptions={grazOptions}>{children}</GrazProvider>;
};
