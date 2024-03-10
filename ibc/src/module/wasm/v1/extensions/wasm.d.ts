import { QueryClient } from "@cosmjs/stargate";
import { QueryAllContractStateRequest, QueryAllContractStateResponse, QueryCodeRequest, QueryCodeResponse, QueryCodesRequest, QueryCodesResponse, QueryContractHistoryRequest, QueryContractHistoryResponse, QueryContractInfoRequest, QueryContractInfoResponse, QueryContractsByCodeRequest, QueryContractsByCodeResponse, QueryContractsByCreatorRequest, QueryContractsByCreatorResponse, QueryParamsRequest, QueryParamsResponse, QueryPinnedCodesRequest, QueryPinnedCodesResponse, QueryRawContractStateRequest, QueryRawContractStateResponse, QuerySmartContractStateRequest, QuerySmartContractStateResponse } from "../query";
export declare function setupWasmExtension(base: QueryClient): {
    wasm: {
        smartContractState: (request: QuerySmartContractStateRequest) => Promise<QuerySmartContractStateResponse>;
        rawContractState: (request: QueryRawContractStateRequest) => Promise<QueryRawContractStateResponse>;
        pinnedCodes: (request: QueryPinnedCodesRequest) => Promise<QueryPinnedCodesResponse>;
        contractsByCreator: (request: QueryContractsByCreatorRequest) => Promise<QueryContractsByCreatorResponse>;
        contractsByCode: (request: QueryContractsByCodeRequest) => Promise<QueryContractsByCodeResponse>;
        contractInfo: (request: QueryContractInfoRequest) => Promise<QueryContractInfoResponse>;
        contractHistory: (request: QueryContractHistoryRequest) => Promise<QueryContractHistoryResponse>;
        allContractState: (request: QueryAllContractStateRequest) => Promise<QueryAllContractStateResponse>;
        params: (request: QueryParamsRequest) => Promise<QueryParamsResponse>;
        code: (request: QueryCodeRequest) => Promise<QueryCodeResponse>;
        codes: (request: QueryCodesRequest) => Promise<QueryCodesResponse>;
    };
};
