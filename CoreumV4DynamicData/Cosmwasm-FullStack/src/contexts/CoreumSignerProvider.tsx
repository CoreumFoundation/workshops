import { useEffect, useState } from "react";

import { SigningStargateClient } from "@cosmjs/stargate";
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgIssueClass, MsgMint } from "../module/coreum/asset/nft/v1/tx";
import { defaultRegistryTypes } from "@cosmjs/stargate";

import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/defaults";

import { CoreumSigner } from "./CoreumSigner";
import { MsgSend } from "coreum-js/dist/main/coreum/nft/v1beta1/tx";

const CoreumProvider = ({ children }) => {
  const coreumRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/coreum.asset.nft.v1.MsgIssueClass", MsgIssueClass],
    ["/coreum.asset.nft.v1.MsgMint", MsgMint],
    ["/coreum.nft.v1beta1.MsgSend", MsgSend],

    ...defaultRegistryTypes,
  ];

  const registry = new Registry(coreumRegistryTypes);

  const [stargateClient, setStargateClient] =
    useState<SigningStargateClient | null>(null);
  const chainContext = useChain(chainName);

  useEffect(() => {
    const initializeClient = async () => {
      const client = await SigningStargateClient.connectWithSigner(
        await chainContext.getRpcEndpoint(),
        // Do not use the chainContext.getOfflineSigner. The default signer use Amino and not Protobuff
        chainContext.getOfflineSignerDirect(),
        { registry }
      );
      setStargateClient(client);
    };
    if (chainContext.isWalletConnected) {
      initializeClient();
    }
  }, [chainContext.isWalletConnected]);

  return (
    <CoreumSigner.Provider
      value={stargateClient as SigningStargateClient | null}
    >
      {children}
    </CoreumSigner.Provider>
  );
};
export default CoreumProvider;
