import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "coreum.asset.ft.v1";
/** Params store gov manageable parameters. */
export interface Params {
    /** issue_fee is the fee burnt each time new token is issued */
    issueFee?: Coin;
}
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        issueFee?: {
            denom?: string;
            amount?: string;
        };
    } & {
        issueFee?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["issueFee"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, "issueFee">]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        issueFee?: {
            denom?: string;
            amount?: string;
        };
    } & {
        issueFee?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["issueFee"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "issueFee">]: never; }>(object: I_1): Params;
};
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
