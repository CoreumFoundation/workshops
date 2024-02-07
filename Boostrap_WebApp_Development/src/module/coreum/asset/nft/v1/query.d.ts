import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Class } from "./nft";
import { Params } from "./params";
export declare const protobufPackage = "coreum.asset.nft.v1";
/** QueryParamsRequest defines the request type for querying x/asset/nft parameters. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse defines the response type for querying x/asset/nft parameters. */
export interface QueryParamsResponse {
    params?: Params;
}
/** QueryTokenRequest is request type for the Query/Class RPC method. */
export interface QueryClassRequest {
    /** we don't use the gogoproto.customname here since the google.api.http ignores it and generates invalid code. */
    id: string;
}
/** QueryClassResponse is response type for the Query/Class RPC method. */
export interface QueryClassResponse {
    class?: Class;
}
export interface QueryFrozenRequest {
    id: string;
    classId: string;
}
export interface QueryFrozenResponse {
    frozen: boolean;
}
export interface QueryWhitelistedRequest {
    id: string;
    classId: string;
    account: string;
}
export interface QueryWhitelistedResponse {
    whitelisted: boolean;
}
export interface QueryWhitelistedAccountsForNFTRequest {
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequest;
    id: string;
    classId: string;
}
export interface QueryWhitelistedAccountsForNFTResponse {
    /** pagination defines the pagination in the response. */
    pagination?: PageResponse;
    accounts: string[];
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        params?: {
            mintFee?: {
                denom?: string;
                amount?: string;
            };
        };
    } & {
        params?: {
            mintFee?: {
                denom?: string;
                amount?: string;
            };
        } & {
            mintFee?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["params"]["mintFee"], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; };
        } & { [K_1 in Exclude<keyof I["params"], "mintFee">]: never; };
    } & { [K_2 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            mintFee?: {
                denom?: string;
                amount?: string;
            };
        };
    } & {
        params?: {
            mintFee?: {
                denom?: string;
                amount?: string;
            };
        } & {
            mintFee?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_3 in Exclude<keyof I_1["params"]["mintFee"], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; };
        } & { [K_4 in Exclude<keyof I_1["params"], "mintFee">]: never; };
    } & { [K_5 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryClassRequest: {
    encode(message: QueryClassRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassRequest;
    fromJSON(object: any): QueryClassRequest;
    toJSON(message: QueryClassRequest): unknown;
    create<I extends {
        id?: string;
    } & {
        id?: string;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QueryClassRequest;
    fromPartial<I_1 extends {
        id?: string;
    } & {
        id?: string;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QueryClassRequest;
};
export declare const QueryClassResponse: {
    encode(message: QueryClassResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassResponse;
    fromJSON(object: any): QueryClassResponse;
    toJSON(message: QueryClassResponse): unknown;
    create<I extends {
        class?: {
            id?: string;
            issuer?: string;
            name?: string;
            symbol?: string;
            description?: string;
            uri?: string;
            uriHash?: string;
            data?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        };
    } & {
        class?: {
            id?: string;
            issuer?: string;
            name?: string;
            symbol?: string;
            description?: string;
            uri?: string;
            uriHash?: string;
            data?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        } & {
            id?: string;
            issuer?: string;
            name?: string;
            symbol?: string;
            description?: string;
            uri?: string;
            uriHash?: string;
            data?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["class"]["data"], keyof import("../../../../google/protobuf/any").Any>]: never; };
            features?: import("./nft").ClassFeature[] & import("./nft").ClassFeature[] & { [K_1 in Exclude<keyof I["class"]["features"], keyof import("./nft").ClassFeature[]>]: never; };
            royaltyRate?: string;
        } & { [K_2 in Exclude<keyof I["class"], keyof Class>]: never; };
    } & { [K_3 in Exclude<keyof I, "class">]: never; }>(base?: I): QueryClassResponse;
    fromPartial<I_1 extends {
        class?: {
            id?: string;
            issuer?: string;
            name?: string;
            symbol?: string;
            description?: string;
            uri?: string;
            uriHash?: string;
            data?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        };
    } & {
        class?: {
            id?: string;
            issuer?: string;
            name?: string;
            symbol?: string;
            description?: string;
            uri?: string;
            uriHash?: string;
            data?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        } & {
            id?: string;
            issuer?: string;
            name?: string;
            symbol?: string;
            description?: string;
            uri?: string;
            uriHash?: string;
            data?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["class"]["data"], keyof import("../../../../google/protobuf/any").Any>]: never; };
            features?: import("./nft").ClassFeature[] & import("./nft").ClassFeature[] & { [K_5 in Exclude<keyof I_1["class"]["features"], keyof import("./nft").ClassFeature[]>]: never; };
            royaltyRate?: string;
        } & { [K_6 in Exclude<keyof I_1["class"], keyof Class>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "class">]: never; }>(object: I_1): QueryClassResponse;
};
export declare const QueryFrozenRequest: {
    encode(message: QueryFrozenRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryFrozenRequest;
    fromJSON(object: any): QueryFrozenRequest;
    toJSON(message: QueryFrozenRequest): unknown;
    create<I extends {
        id?: string;
        classId?: string;
    } & {
        id?: string;
        classId?: string;
    } & { [K in Exclude<keyof I, keyof QueryFrozenRequest>]: never; }>(base?: I): QueryFrozenRequest;
    fromPartial<I_1 extends {
        id?: string;
        classId?: string;
    } & {
        id?: string;
        classId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryFrozenRequest>]: never; }>(object: I_1): QueryFrozenRequest;
};
export declare const QueryFrozenResponse: {
    encode(message: QueryFrozenResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryFrozenResponse;
    fromJSON(object: any): QueryFrozenResponse;
    toJSON(message: QueryFrozenResponse): unknown;
    create<I extends {
        frozen?: boolean;
    } & {
        frozen?: boolean;
    } & { [K in Exclude<keyof I, "frozen">]: never; }>(base?: I): QueryFrozenResponse;
    fromPartial<I_1 extends {
        frozen?: boolean;
    } & {
        frozen?: boolean;
    } & { [K_1 in Exclude<keyof I_1, "frozen">]: never; }>(object: I_1): QueryFrozenResponse;
};
export declare const QueryWhitelistedRequest: {
    encode(message: QueryWhitelistedRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedRequest;
    fromJSON(object: any): QueryWhitelistedRequest;
    toJSON(message: QueryWhitelistedRequest): unknown;
    create<I extends {
        id?: string;
        classId?: string;
        account?: string;
    } & {
        id?: string;
        classId?: string;
        account?: string;
    } & { [K in Exclude<keyof I, keyof QueryWhitelistedRequest>]: never; }>(base?: I): QueryWhitelistedRequest;
    fromPartial<I_1 extends {
        id?: string;
        classId?: string;
        account?: string;
    } & {
        id?: string;
        classId?: string;
        account?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryWhitelistedRequest>]: never; }>(object: I_1): QueryWhitelistedRequest;
};
export declare const QueryWhitelistedResponse: {
    encode(message: QueryWhitelistedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedResponse;
    fromJSON(object: any): QueryWhitelistedResponse;
    toJSON(message: QueryWhitelistedResponse): unknown;
    create<I extends {
        whitelisted?: boolean;
    } & {
        whitelisted?: boolean;
    } & { [K in Exclude<keyof I, "whitelisted">]: never; }>(base?: I): QueryWhitelistedResponse;
    fromPartial<I_1 extends {
        whitelisted?: boolean;
    } & {
        whitelisted?: boolean;
    } & { [K_1 in Exclude<keyof I_1, "whitelisted">]: never; }>(object: I_1): QueryWhitelistedResponse;
};
export declare const QueryWhitelistedAccountsForNFTRequest: {
    encode(message: QueryWhitelistedAccountsForNFTRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedAccountsForNFTRequest;
    fromJSON(object: any): QueryWhitelistedAccountsForNFTRequest;
    toJSON(message: QueryWhitelistedAccountsForNFTRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: string | number | Long.Long;
            limit?: string | number | Long.Long;
            countTotal?: boolean;
            reverse?: boolean;
        };
        id?: string;
        classId?: string;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: string | number | Long.Long;
            limit?: string | number | Long.Long;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K in Exclude<keyof I["pagination"]["offset"], keyof Long.Long>]: never; });
            limit?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K_1 in Exclude<keyof I["pagination"]["limit"], keyof Long.Long>]: never; });
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        id?: string;
        classId?: string;
    } & { [K_3 in Exclude<keyof I, keyof QueryWhitelistedAccountsForNFTRequest>]: never; }>(base?: I): QueryWhitelistedAccountsForNFTRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: string | number | Long.Long;
            limit?: string | number | Long.Long;
            countTotal?: boolean;
            reverse?: boolean;
        };
        id?: string;
        classId?: string;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: string | number | Long.Long;
            limit?: string | number | Long.Long;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K_4 in Exclude<keyof I_1["pagination"]["offset"], keyof Long.Long>]: never; });
            limit?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K_5 in Exclude<keyof I_1["pagination"]["limit"], keyof Long.Long>]: never; });
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        id?: string;
        classId?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof QueryWhitelistedAccountsForNFTRequest>]: never; }>(object: I_1): QueryWhitelistedAccountsForNFTRequest;
};
export declare const QueryWhitelistedAccountsForNFTResponse: {
    encode(message: QueryWhitelistedAccountsForNFTResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedAccountsForNFTResponse;
    fromJSON(object: any): QueryWhitelistedAccountsForNFTResponse;
    toJSON(message: QueryWhitelistedAccountsForNFTResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: string | number | Long.Long;
        };
        accounts?: string[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: string | number | Long.Long;
        } & {
            nextKey?: Uint8Array;
            total?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K in Exclude<keyof I["pagination"]["total"], keyof Long.Long>]: never; });
        } & { [K_1 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        accounts?: string[] & string[] & { [K_2 in Exclude<keyof I["accounts"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryWhitelistedAccountsForNFTResponse>]: never; }>(base?: I): QueryWhitelistedAccountsForNFTResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: string | number | Long.Long;
        };
        accounts?: string[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: string | number | Long.Long;
        } & {
            nextKey?: Uint8Array;
            total?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K_4 in Exclude<keyof I_1["pagination"]["total"], keyof Long.Long>]: never; });
        } & { [K_5 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        accounts?: string[] & string[] & { [K_6 in Exclude<keyof I_1["accounts"], keyof string[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryWhitelistedAccountsForNFTResponse>]: never; }>(object: I_1): QueryWhitelistedAccountsForNFTResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Params queries the parameters of x/asset/ft module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Class queries the non-fungible token class of the module. */
    Class(request: QueryClassRequest): Promise<QueryClassResponse>;
    /** Frozen queries to check if an NFT is frozen or not. */
    Frozen(request: QueryFrozenRequest): Promise<QueryFrozenResponse>;
    /** Whitelisted queries to check if an account is whitelited to hold an NFT or not. */
    Whitelisted(request: QueryWhitelistedRequest): Promise<QueryWhitelistedResponse>;
    /** WhitelistedAccountsForNFT returns the list of accounts which are whitelisted to hold this NFT. */
    WhitelistedAccountsForNFT(request: QueryWhitelistedAccountsForNFTRequest): Promise<QueryWhitelistedAccountsForNFTResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Class(request: QueryClassRequest): Promise<QueryClassResponse>;
    Frozen(request: QueryFrozenRequest): Promise<QueryFrozenResponse>;
    Whitelisted(request: QueryWhitelistedRequest): Promise<QueryWhitelistedResponse>;
    WhitelistedAccountsForNFT(request: QueryWhitelistedAccountsForNFTRequest): Promise<QueryWhitelistedAccountsForNFTResponse>;
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
