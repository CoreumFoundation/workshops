import { CoreumNetworkConfig } from "../types";
export declare const connectLeap: (config: CoreumNetworkConfig) => Promise<void>;
export declare const getLeapOfflineSigner: (chain_id: string) => Promise<any>;
