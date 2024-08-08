export declare enum CoreumNetwork {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    DEVNET = "devnet"
}
export declare enum CoreumChainID {
    MAINNET = "coreum-mainnet-1",
    TESTNET = "coreum-testnet-1",
    DEVNET = "coreum-devnet-1"
}
export declare enum CoreumPrefixes {
    MAINNET = "core",
    TESTNET = "testcore",
    DEVNET = "devcore"
}
export declare enum CoreumDenom {
    MAINNET = "ucore",
    TESTNET = "utestcore",
    DEVNET = "udevcore"
}
/** @internal */
export interface CoreumNetworkConfig {
    chain_name: string;
    chain_id: CoreumChainID;
    chain_bech32_prefix: CoreumPrefixes;
    chain_rpc_endpoint: string;
    chain_rest_endpoint: string;
    chain_ws_endpoint: string;
    chaing_explorer: string;
    staking_denom: CoreumDenom;
    coin_type: string | number;
    site_title: string;
    gas_price: string;
}
/** @internal */
export declare const COREUM_CONFIG: {
    mainnet: {
        chain_name: string;
        chain_id: CoreumChainID;
        chain_bech32_prefix: CoreumPrefixes;
        chain_rpc_endpoint: string;
        chain_rest_endpoint: string;
        chain_ws_endpoint: string;
        chaing_explorer: string;
        staking_denom: CoreumDenom;
        coin_type: string;
        site_title: string;
        gas_price: string;
    };
    testnet: {
        chain_name: string;
        chain_id: CoreumChainID;
        chain_bech32_prefix: CoreumPrefixes;
        chain_rpc_endpoint: string;
        chain_rest_endpoint: string;
        chain_ws_endpoint: string;
        chaing_explorer: string;
        staking_denom: CoreumDenom;
        coin_type: string;
        site_title: string;
        gas_price: string;
    };
    devnet: {
        chain_name: string;
        chain_id: CoreumChainID;
        chain_bech32_prefix: CoreumPrefixes;
        chain_rpc_endpoint: string;
        chain_rest_endpoint: string;
        chain_ws_endpoint: string;
        chaing_explorer: string;
        staking_denom: CoreumDenom;
        coin_type: string;
        site_title: string;
        gas_price: string;
    };
};
