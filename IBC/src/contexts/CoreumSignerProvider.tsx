import { useEffect, useState } from "react";

import { SigningStargateClient } from "@cosmjs/stargate";
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import {
  MsgIssueClass,
  MsgMint,
  MsgFreeze,
  MsgUnfreeze,
  MsgBurn,
  MsgAddToWhitelist,
} from "../module/coreum/asset/nft/v1/tx";
import {
  MsgFreeze as MsgFreezeFT,
  MsgUnfreeze as MsgUnfreezeFT,
  MsgGloballyFreeze,
  MsgGloballyUnfreeze,
  MsgSetWhitelistedLimit,
  MsgBurn as MsgBurnFT,
  MsgMint as MsgMintFT,
} from "@/module/coreum/asset/ft/v1/tx";
import { MsgIssue } from "coreum-js/dist/main/coreum/asset/ft/v1/tx";
import { defaultRegistryTypes } from "@cosmjs/stargate";

import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/defaults";

import { CoreumSigner } from "./CoreumSigner";
import { MsgSend } from "coreum-js/dist/main/coreum/nft/v1beta1/tx";

const CoreumProvider = ({ children }) => {
  const coreumRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    //NFT
    ["/coreum.asset.nft.v1.MsgIssueClass", MsgIssueClass],
    ["/coreum.asset.nft.v1.MsgMint", MsgMint],
    ["/coreum.nft.v1beta1.MsgSend", MsgSend],
    ["/coreum.asset.nft.v1.MsgBurn", MsgBurn],
    ["/coreum.asset.nft.v1.MsgFreeze", MsgFreeze],
    ["/coreum.asset.nft.v1.MsgUnfreeze", MsgUnfreeze],
    ["/coreum.asset.nft.v1.MsgAddToWhitelist", MsgAddToWhitelist],
    //FT
    ["/coreum.asset.ft.v1.MsgIssue", MsgIssue],
    ["/coreum.asset.ft.v1.MsgFreeze", MsgFreezeFT],
    ["/coreum.asset.ft.v1.MsgGloballyFreeze", MsgGloballyFreeze],
    ["/coreum.asset.ft.v1.MsgUnfreeze", MsgUnfreezeFT],
    ["/coreum.asset.ft.v1.MsgGloballyUnfreeze", MsgGloballyUnfreeze],
    ["/coreum.asset.ft.v1.MsgSetWhitelistedLimit", MsgSetWhitelistedLimit],
    ["/coreum.asset.ft.v1.MsgBurn", MsgBurnFT],
    ["/coreum.asset.ft.v1.MsgMint", MsgMintFT],

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