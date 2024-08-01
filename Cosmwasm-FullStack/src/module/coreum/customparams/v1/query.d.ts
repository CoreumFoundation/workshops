import Long from "long";
import _m0 from "protobufjs/minimal";
import { StakingParams } from "./params";
export declare const protobufPackage = "coreum.customparams.v1";
/** QueryStakingParamsRequest defines the request type for querying x/customparams staking parameters. */
export interface QueryStakingParamsRequest {
}
/** QueryStakingParamsResponse defines the response type for querying x/customparams staking parameters. */
export interface QueryStakingParamsResponse {
    params?: StakingParams;
}
export declare const QueryStakingParamsRequest: {
    encode(_: QueryStakingParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakingParamsRequest;
    fromJSON(_: any): QueryStakingParamsRequest;
    toJSON(_: QueryStakingParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryStakingParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryStakingParamsRequest;
};
export declare const QueryStakingParamsResponse: {
    encode(message: QueryStakingParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakingParamsResponse;
    fromJSON(object: any): QueryStakingParamsResponse;
    toJSON(message: QueryStakingParamsResponse): unknown;
    create<I extends {
        params?: {
            minSelfDelegation?: string;
        };
    } & {
        params?: {
            minSelfDelegation?: string;
        } & {
            minSelfDelegation?: string;
        } & { [K in Exclude<keyof I["params"], "minSelfDelegation">]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryStakingParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            minSelfDelegation?: string;
        };
    } & {
        params?: {
            minSelfDelegation?: string;
        } & {
            minSelfDelegation?: string;
        } & { [K_2 in Exclude<keyof I_1["params"], "minSelfDelegation">]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryStakingParamsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** StakingParams queries the staking parameters of the module. */
    StakingParams(request: QueryStakingParamsRequest): Promise<QueryStakingParamsResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    StakingParams(request: QueryStakingParamsRequest): Promise<QueryStakingParamsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
