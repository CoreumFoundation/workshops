import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "coreum.asset.ft.v1";
/** Feature defines possible features of fungible token. */
export declare enum Feature {
    minting = 0,
    burning = 1,
    freezing = 2,
    whitelisting = 3
}
export declare function featureFromJSON(object: any): Feature;
export declare function featureToJSON(object: Feature): string;
/** Definition defines the fungible token settings to store. */
export interface Definition {
    denom: string;
    issuer: string;
    features: Feature[];
    /**
     * burn_rate is a number between 0 and 1 which will be multiplied by send amount to determine
     * burn_amount. This value will be burnt on top of the send amount.
     */
    burnRate: string;
    /**
     * send_commission_rate is a number between 0 and 1 which will be multiplied by send amount to determine
     * amount sent to the token issuer account.
     */
    sendCommissionRate: string;
}
/** Token is a full representation of the fungible token. */
export interface Token {
    denom: string;
    issuer: string;
    symbol: string;
    subunit: string;
    precision: number;
    description: string;
    globallyFrozen: boolean;
    features: Feature[];
    /**
     * burn_rate is a number between 0 and 1 which will be multiplied by send amount to determine
     * burn_amount. This value will be burnt on top of the send amount.
     */
    burnRate: string;
    /**
     * send_commission_rate is a number between 0 and 1 which will be multiplied by send amount to determine
     * amount sent to the token issuer account.
     */
    sendCommissionRate: string;
}
export declare const Definition: {
    encode(message: Definition, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Definition;
    fromJSON(object: any): Definition;
    toJSON(message: Definition): unknown;
    create<I extends {
        denom?: string;
        issuer?: string;
        features?: Feature[];
        burnRate?: string;
        sendCommissionRate?: string;
    } & {
        denom?: string;
        issuer?: string;
        features?: Feature[] & Feature[] & { [K in Exclude<keyof I["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_1 in Exclude<keyof I, keyof Definition>]: never; }>(base?: I): Definition;
    fromPartial<I_1 extends {
        denom?: string;
        issuer?: string;
        features?: Feature[];
        burnRate?: string;
        sendCommissionRate?: string;
    } & {
        denom?: string;
        issuer?: string;
        features?: Feature[] & Feature[] & { [K_2 in Exclude<keyof I_1["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof Definition>]: never; }>(object: I_1): Definition;
};
export declare const Token: {
    encode(message: Token, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Token;
    fromJSON(object: any): Token;
    toJSON(message: Token): unknown;
    create<I extends {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        description?: string;
        globallyFrozen?: boolean;
        features?: Feature[];
        burnRate?: string;
        sendCommissionRate?: string;
    } & {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        description?: string;
        globallyFrozen?: boolean;
        features?: Feature[] & Feature[] & { [K in Exclude<keyof I["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_1 in Exclude<keyof I, keyof Token>]: never; }>(base?: I): Token;
    fromPartial<I_1 extends {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        description?: string;
        globallyFrozen?: boolean;
        features?: Feature[];
        burnRate?: string;
        sendCommissionRate?: string;
    } & {
        denom?: string;
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        description?: string;
        globallyFrozen?: boolean;
        features?: Feature[] & Feature[] & { [K_2 in Exclude<keyof I_1["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof Token>]: never; }>(object: I_1): Token;
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
