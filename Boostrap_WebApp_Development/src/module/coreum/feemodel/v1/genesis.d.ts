import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecCoin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
export declare const protobufPackage = "coreum.feemodel.v1";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params?: Params;
    /** min_gas_price is the current minimum gas price required by the chain. */
    minGasPrice?: DecCoin;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            model?: {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | Long.Long;
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            };
        };
        minGasPrice?: {
            denom?: string;
            amount?: string;
        };
    } & {
        params?: {
            model?: {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | Long.Long;
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            };
        } & {
            model?: {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | Long.Long;
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            } & {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | (Long.Long & {
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
                } & { [K in Exclude<keyof I["params"]["model"]["maxBlockGas"], keyof Long.Long>]: never; });
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            } & { [K_1 in Exclude<keyof I["params"]["model"], keyof import("./params").ModelParams>]: never; };
        } & { [K_2 in Exclude<keyof I["params"], "model">]: never; };
        minGasPrice?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I["minGasPrice"], keyof DecCoin>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            model?: {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | Long.Long;
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            };
        };
        minGasPrice?: {
            denom?: string;
            amount?: string;
        };
    } & {
        params?: {
            model?: {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | Long.Long;
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            };
        } & {
            model?: {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | Long.Long;
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            } & {
                initialGasPrice?: string;
                maxGasPriceMultiplier?: string;
                maxDiscount?: string;
                escalationStartFraction?: string;
                maxBlockGas?: string | number | (Long.Long & {
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
                } & { [K_5 in Exclude<keyof I_1["params"]["model"]["maxBlockGas"], keyof Long.Long>]: never; });
                shortEmaBlockLength?: number;
                longEmaBlockLength?: number;
            } & { [K_6 in Exclude<keyof I_1["params"]["model"], keyof import("./params").ModelParams>]: never; };
        } & { [K_7 in Exclude<keyof I_1["params"], "model">]: never; };
        minGasPrice?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_8 in Exclude<keyof I_1["minGasPrice"], keyof DecCoin>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
