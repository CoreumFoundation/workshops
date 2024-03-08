import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Feature } from "./token";
export declare const protobufPackage = "coreum.asset.ft.v1";
/** MsgIssue defines message to issue new fungible token. */
export interface MsgIssue {
    issuer: string;
    symbol: string;
    subunit: string;
    precision: number;
    initialAmount: string;
    description: string;
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
export interface MsgMint {
    sender: string;
    coin?: Coin;
}
export interface MsgBurn {
    sender: string;
    coin?: Coin;
}
export interface MsgFreeze {
    sender: string;
    account: string;
    coin?: Coin;
}
export interface MsgUnfreeze {
    sender: string;
    account: string;
    coin?: Coin;
}
export interface MsgGloballyFreeze {
    sender: string;
    denom: string;
}
export interface MsgGloballyUnfreeze {
    sender: string;
    denom: string;
}
export interface MsgSetWhitelistedLimit {
    sender: string;
    account: string;
    coin?: Coin;
}
export interface EmptyResponse {
}
export declare const MsgIssue: {
    encode(message: MsgIssue, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssue;
    fromJSON(object: any): MsgIssue;
    toJSON(message: MsgIssue): unknown;
    create<I extends {
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
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        initialAmount?: string;
        description?: string;
        features?: Feature[] & Feature[] & { [K in Exclude<keyof I["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgIssue>]: never; }>(base?: I): MsgIssue;
    fromPartial<I_1 extends {
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
        issuer?: string;
        symbol?: string;
        subunit?: string;
        precision?: number;
        initialAmount?: string;
        description?: string;
        features?: Feature[] & Feature[] & { [K_2 in Exclude<keyof I_1["features"], keyof Feature[]>]: never; };
        burnRate?: string;
        sendCommissionRate?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgIssue>]: never; }>(object: I_1): MsgIssue;
};
export declare const MsgMint: {
    encode(message: MsgMint, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMint;
    fromJSON(object: any): MsgMint;
    toJSON(message: MsgMint): unknown;
    create<I extends {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coin"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgMint>]: never; }>(base?: I): MsgMint;
    fromPartial<I_1 extends {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["coin"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgMint>]: never; }>(object: I_1): MsgMint;
};
export declare const MsgBurn: {
    encode(message: MsgBurn, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurn;
    fromJSON(object: any): MsgBurn;
    toJSON(message: MsgBurn): unknown;
    create<I extends {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coin"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgBurn>]: never; }>(base?: I): MsgBurn;
    fromPartial<I_1 extends {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["coin"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgBurn>]: never; }>(object: I_1): MsgBurn;
};
export declare const MsgFreeze: {
    encode(message: MsgFreeze, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgFreeze;
    fromJSON(object: any): MsgFreeze;
    toJSON(message: MsgFreeze): unknown;
    create<I extends {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coin"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgFreeze>]: never; }>(base?: I): MsgFreeze;
    fromPartial<I_1 extends {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["coin"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgFreeze>]: never; }>(object: I_1): MsgFreeze;
};
export declare const MsgUnfreeze: {
    encode(message: MsgUnfreeze, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnfreeze;
    fromJSON(object: any): MsgUnfreeze;
    toJSON(message: MsgUnfreeze): unknown;
    create<I extends {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coin"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUnfreeze>]: never; }>(base?: I): MsgUnfreeze;
    fromPartial<I_1 extends {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["coin"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUnfreeze>]: never; }>(object: I_1): MsgUnfreeze;
};
export declare const MsgGloballyFreeze: {
    encode(message: MsgGloballyFreeze, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgGloballyFreeze;
    fromJSON(object: any): MsgGloballyFreeze;
    toJSON(message: MsgGloballyFreeze): unknown;
    create<I extends {
        sender?: string;
        denom?: string;
    } & {
        sender?: string;
        denom?: string;
    } & { [K in Exclude<keyof I, keyof MsgGloballyFreeze>]: never; }>(base?: I): MsgGloballyFreeze;
    fromPartial<I_1 extends {
        sender?: string;
        denom?: string;
    } & {
        sender?: string;
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgGloballyFreeze>]: never; }>(object: I_1): MsgGloballyFreeze;
};
export declare const MsgGloballyUnfreeze: {
    encode(message: MsgGloballyUnfreeze, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgGloballyUnfreeze;
    fromJSON(object: any): MsgGloballyUnfreeze;
    toJSON(message: MsgGloballyUnfreeze): unknown;
    create<I extends {
        sender?: string;
        denom?: string;
    } & {
        sender?: string;
        denom?: string;
    } & { [K in Exclude<keyof I, keyof MsgGloballyUnfreeze>]: never; }>(base?: I): MsgGloballyUnfreeze;
    fromPartial<I_1 extends {
        sender?: string;
        denom?: string;
    } & {
        sender?: string;
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgGloballyUnfreeze>]: never; }>(object: I_1): MsgGloballyUnfreeze;
};
export declare const MsgSetWhitelistedLimit: {
    encode(message: MsgSetWhitelistedLimit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetWhitelistedLimit;
    fromJSON(object: any): MsgSetWhitelistedLimit;
    toJSON(message: MsgSetWhitelistedLimit): unknown;
    create<I extends {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coin"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgSetWhitelistedLimit>]: never; }>(base?: I): MsgSetWhitelistedLimit;
    fromPartial<I_1 extends {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        };
    } & {
        sender?: string;
        account?: string;
        coin?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["coin"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgSetWhitelistedLimit>]: never; }>(object: I_1): MsgSetWhitelistedLimit;
};
export declare const EmptyResponse: {
    encode(_: EmptyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EmptyResponse;
    fromJSON(_: any): EmptyResponse;
    toJSON(_: EmptyResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): EmptyResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): EmptyResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** Issue defines a method to issue a new fungible token. */
    Issue(request: MsgIssue): Promise<EmptyResponse>;
    /** Mint mints new fungible tokens. */
    Mint(request: MsgMint): Promise<EmptyResponse>;
    /** Burn burns the specified fungible tokens from senders balance if the sender has enough balance. */
    Burn(request: MsgBurn): Promise<EmptyResponse>;
    /**
     * Freeze freezes a part of the fungible tokens in an
     * account, only if the freezable feature is enabled on that token.
     */
    Freeze(request: MsgFreeze): Promise<EmptyResponse>;
    /**
     * Unfreeze unfreezes a part of the frozen fungible tokens in an
     * account, only if there are such frozen tokens on that account.
     */
    Unfreeze(request: MsgUnfreeze): Promise<EmptyResponse>;
    /**
     * GloballyFreeze freezes fungible token so no operations are allowed with it before unfrozen.
     * This operation is idempotent so global freeze of already frozen token does nothing.
     */
    GloballyFreeze(request: MsgGloballyFreeze): Promise<EmptyResponse>;
    /**
     * GloballyUnfreeze unfreezes fungible token and unblocks basic operations on it.
     * This operation is idempotent so global unfreezing of non-frozen token does nothing.
     */
    GloballyUnfreeze(request: MsgGloballyUnfreeze): Promise<EmptyResponse>;
    /** SetWhitelistedLimit sets the limit of how many tokens a specific account may hold. */
    SetWhitelistedLimit(request: MsgSetWhitelistedLimit): Promise<EmptyResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Issue(request: MsgIssue): Promise<EmptyResponse>;
    Mint(request: MsgMint): Promise<EmptyResponse>;
    Burn(request: MsgBurn): Promise<EmptyResponse>;
    Freeze(request: MsgFreeze): Promise<EmptyResponse>;
    Unfreeze(request: MsgUnfreeze): Promise<EmptyResponse>;
    GloballyFreeze(request: MsgGloballyFreeze): Promise<EmptyResponse>;
    GloballyUnfreeze(request: MsgGloballyUnfreeze): Promise<EmptyResponse>;
    SetWhitelistedLimit(request: MsgSetWhitelistedLimit): Promise<EmptyResponse>;
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
