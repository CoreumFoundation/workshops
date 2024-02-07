import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "coreum.customparams.v1";
/** StakingParams defines the set of additional staking params for the staking module wrapper. */
export interface StakingParams {
    /** min_self_delegation is the validators global self declared minimum for delegation. */
    minSelfDelegation: string;
}
export declare const StakingParams: {
    encode(message: StakingParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StakingParams;
    fromJSON(object: any): StakingParams;
    toJSON(message: StakingParams): unknown;
    create<I extends {
        minSelfDelegation?: string;
    } & {
        minSelfDelegation?: string;
    } & { [K in Exclude<keyof I, "minSelfDelegation">]: never; }>(base?: I): StakingParams;
    fromPartial<I_1 extends {
        minSelfDelegation?: string;
    } & {
        minSelfDelegation?: string;
    } & { [K_1 in Exclude<keyof I_1, "minSelfDelegation">]: never; }>(object: I_1): StakingParams;
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
