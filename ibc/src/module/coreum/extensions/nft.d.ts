import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { QueryClassResponse, QueryFrozenResponse, QueryWhitelistedAccountsForNFTResponse, QueryWhitelistedResponse, QueryParamsResponse } from "../asset/nft/v1/query";
import { QueryClient } from "@cosmjs/stargate";
export declare function setupNFTExtension(base: QueryClient): {
    nft: {
        params: () => Promise<QueryParamsResponse>;
        class: (class_id: string) => Promise<QueryClassResponse>;
        frozen: (nft_id: string, class_id: string) => Promise<QueryFrozenResponse>;
        whitelisted: (nft_id: string, class_id: string, account: string) => Promise<QueryWhitelistedResponse>;
        whitelistedAccountsForNFT: (nft_id: string, class_id: string, pagination?: PageRequest) => Promise<QueryWhitelistedAccountsForNFTResponse>;
    };
};
