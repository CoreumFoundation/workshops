import Long from "long";
import _m0 from "protobufjs/minimal";
import { StakingParams } from "./params";
export declare const protobufPackage = "coreum.customparams.v1";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
    /** staking_params defines staking parameters of the module. */
    stakingParams?: StakingParams;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        stakingParams?: {
            minSelfDelegation?: string;
        };
    } & {
        stakingParams?: {
            minSelfDelegation?: string;
        } & {
            minSelfDelegation?: string;
        } & { [K in Exclude<keyof I["stakingParams"], "minSelfDelegation">]: never; };
    } & { [K_1 in Exclude<keyof I, "stakingParams">]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        stakingParams?: {
            minSelfDelegation?: string;
        };
    } & {
        stakingParams?: {
            minSelfDelegation?: string;
        } & {
            minSelfDelegation?: string;
        } & { [K_2 in Exclude<keyof I_1["stakingParams"], "minSelfDelegation">]: never; };
    } & { [K_3 in Exclude<keyof I_1, "stakingParams">]: never; }>(object: I_1): GenesisState;
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
