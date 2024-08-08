import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { QueryParamsResponse, QueryFrozenBalanceResponse, QueryFrozenBalancesResponse, QueryTokenResponse, QueryTokensResponse, QueryWhitelistedBalanceResponse, QueryWhitelistedBalancesResponse } from "../asset/ft/v1/query";
import { QueryClient } from "@cosmjs/stargate";
export declare function setupFTExtension(base: QueryClient): {
    ft: {
        params: () => Promise<QueryParamsResponse>;
        tokens: (issuer: string, pagination?: PageRequest) => Promise<QueryTokensResponse>;
        token: (denom: string) => Promise<QueryTokenResponse>;
        frozenBalances: (account: string, pagination?: PageRequest) => Promise<QueryFrozenBalancesResponse>;
        frozenBalance: (account: string, denom: string) => Promise<QueryFrozenBalanceResponse>;
        whitelistedBalances: (account: string, pagination?: PageRequest) => Promise<QueryWhitelistedBalancesResponse>;
        whitelistedBalance: (account: string, denom: string) => Promise<QueryWhitelistedBalanceResponse>;
    };
};
