import { CoreumNetworkConfig } from "../types/coreum";
import { OfflineSigner } from "@cosmjs/proto-signing";
export declare const connectCosmostation: (config: CoreumNetworkConfig) => Promise<void>;
export declare const getCosmosOfflineSigner: (chain_id: string) => Promise<OfflineSigner>;
