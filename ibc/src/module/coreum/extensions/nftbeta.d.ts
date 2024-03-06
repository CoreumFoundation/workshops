import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { QueryBalanceResponse, QueryClassResponse, QueryClassesResponse, QueryNFTResponse, QueryNFTsResponse, QueryOwnerResponse, QuerySupplyResponse } from "../nft/v1beta1/query";
import { QueryClient } from "@cosmjs/stargate";
export declare function setupNFTBetaExtension(base: QueryClient): {
    nftbeta: {
        balance: (class_id: string, owner: string) => Promise<QueryBalanceResponse>;
        owner: (class_id: string, nft_id: string) => Promise<QueryOwnerResponse>;
        supply: (class_id: string) => Promise<QuerySupplyResponse>;
        nfts: (class_id: string, owner: string, pagination?: PageRequest) => Promise<QueryNFTsResponse>;
        nft: (nft_id: string, class_id: string) => Promise<QueryNFTResponse>;
        class: (class_id: string) => Promise<QueryClassResponse>;
        classes: (pagination?: PageRequest) => Promise<QueryClassesResponse>;
    };
};
