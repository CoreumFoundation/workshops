import {  Registry, GeneratedType } from "@cosmjs/proto-signing";
import { useCosmWasmSigningClient, useOfflineSigners } from "graz";
import {

  defaultRegistryTypes,
} from "@cosmjs/stargate";
import { coreumRegistry, cosmwasmRegistry } from "coreum-js-nightly";
import { CHAIN_ID } from "../constants";



const registryTypes: [string, GeneratedType][] = [
  ...defaultRegistryTypes,
  ...coreumRegistry,
  ...cosmwasmRegistry,
];
const registry = new Registry(registryTypes);
export const useEstimateTxGasFee = () => {

  const { data: signingClient } = useCosmWasmSigningClient({
    chainId: CHAIN_ID,
    offlineSigner: "offlineSigner",
    opts: {
      registry: registry as any,
    },
  });

  return {
    signingClient,
  };
};
