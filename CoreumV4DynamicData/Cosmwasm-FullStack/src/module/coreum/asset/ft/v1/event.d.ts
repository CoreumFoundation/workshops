import Long from "long";
import _m0 from "protobufjs/minimal";
import { Feature } from "./token";
export declare const protobufPackage = "coreum.asset.ft.v1";
/** EventIssued is emitted on MsgIssue. */
export interface EventIssued {
    denom: string;
    issuer: string;
    symbol: string;
    subunit: string;
    precision: number;
    initialAmount: string;
    description: string;
    features: Feature[];
    burnRate: string;
    sendCommissionRate: string;
}
export interface EventFrozenAmountChanged {
    account: string;
    denom: string;
    previousAmount: string;
    currentAmount: string;
}
export interface EventWhitelistedAmountChanged {
    account: string;
    denom: string;
    previousAmount: string;
    currentAmount: string;
}
export declare const EventIssued: {
    encode(message: EventIssued, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventIssued;
    fromJSON(object: any): EventIssued;
    toJSON(message: EventIssued): unknown;
    create<I extends {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        initialAmount?: string;
        description?: string;
        features?: Feature[];
        burnRate?: string;
        sendCommissionRate?: string;
    } & {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        initialAmount?: string;
        description?: string;
        features?: Feature[] & Feature[] & { [K in Exclude<keyof I["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_1 in Exclude<keyof I, keyof EventIssued>]: never; }>(base?: I): EventIssued;
    fromPartial<I_1 extends {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        initialAmount?: string;
        description?: string;
        features?: Feature[];
        burnRate?: string;
        sendCommissionRate?: string;
    } & {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        initialAmount?: string;
        description?: string;
        features?: Feature[] & Feature[] & { [K_2 in Exclude<keyof I_1["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof EventIssued>]: never; }>(object: I_1): EventIssued;
};
export declare const EventFrozenAmountChanged: {
    encode(message: EventFrozenAmountChanged, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventFrozenAmountChanged;
    fromJSON(object: any): EventFrozenAmountChanged;
    toJSON(message: EventFrozenAmountChanged): unknown;
    create<I extends {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & { [K in Exclude<keyof I, keyof EventFrozenAmountChanged>]: never; }>(base?: I): EventFrozenAmountChanged;
    fromPartial<I_1 extends {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventFrozenAmountChanged>]: never; }>(object: I_1): EventFrozenAmountChanged;
};
export declare const EventWhitelistedAmountChanged: {
    encode(message: EventWhitelistedAmountChanged, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventWhitelistedAmountChanged;
    fromJSON(object: any): EventWhitelistedAmountChanged;
    toJSON(message: EventWhitelistedAmountChanged): unknown;
    create<I extends {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & { [K in Exclude<keyof I, keyof EventWhitelistedAmountChanged>]: never; }>(base?: I): EventWhitelistedAmountChanged;
    fromPartial<I_1 extends {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & {
        account?: string;
        denom?: string;
        previousAmount?: string;
        currentAmount?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventWhitelistedAmountChanged>]: never; }>(object: I_1): EventWhitelistedAmountChanged;
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
