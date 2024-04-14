import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
import { Token } from "./token";
export declare const protobufPackage = "coreum.asset.ft.v1";
/** GenesisState defines the module genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params?: Params;
    /** tokens keep the fungible token state */
    tokens: Token[];
    /** frozen_balances contains the frozen balances on all of the accounts */
    frozenBalances: Balance[];
    /** whitelisted_balances contains the whitelisted balances on all of the accounts */
    whitelistedBalances: Balance[];
}
/** Balance defines an account address and balance pair used module genesis genesis state. */
export interface Balance {
    /** address is the address of the balance holder. */
    address: string;
    /** coins defines the different coins this balance holds. */
    coins: Coin[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            issueFee?: {
                denom?: string;
                amount?: string;
            };
        };
        tokens?: {
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
            burnRate?: string;
            sendCommissionRate?: string;
        }[];
        frozenBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        whitelistedBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        params?: {
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
            } & { [K in Exclude<keyof I["params"]["issueFee"], keyof Coin>]: never; };
        } & { [K_1 in Exclude<keyof I["params"], "issueFee">]: never; };
        tokens?: {
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
            burnRate?: string;
            sendCommissionRate?: string;
        }[] & ({
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
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
            features?: import("./token").Feature[] & import("./token").Feature[] & { [K_2 in Exclude<keyof I["tokens"][number]["features"], keyof import("./token").Feature[]>]: never; };
            burnRate?: string;
            sendCommissionRate?: string;
        } & { [K_3 in Exclude<keyof I["tokens"][number], keyof Token>]: never; })[] & { [K_4 in Exclude<keyof I["tokens"], keyof {
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
            burnRate?: string;
            sendCommissionRate?: string;
        }[]>]: never; };
        frozenBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_5 in Exclude<keyof I["frozenBalances"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I["frozenBalances"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I["frozenBalances"][number], keyof Balance>]: never; })[] & { [K_8 in Exclude<keyof I["frozenBalances"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        whitelistedBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_9 in Exclude<keyof I["whitelistedBalances"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I["whitelistedBalances"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["whitelistedBalances"][number], keyof Balance>]: never; })[] & { [K_12 in Exclude<keyof I["whitelistedBalances"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            issueFee?: {
                denom?: string;
                amount?: string;
            };
        };
        tokens?: {
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
            burnRate?: string;
            sendCommissionRate?: string;
        }[];
        frozenBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        whitelistedBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        params?: {
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
            } & { [K_14 in Exclude<keyof I_1["params"]["issueFee"], keyof Coin>]: never; };
        } & { [K_15 in Exclude<keyof I_1["params"], "issueFee">]: never; };
        tokens?: {
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
            burnRate?: string;
            sendCommissionRate?: string;
        }[] & ({
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
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
            features?: import("./token").Feature[] & import("./token").Feature[] & { [K_16 in Exclude<keyof I_1["tokens"][number]["features"], keyof import("./token").Feature[]>]: never; };
            burnRate?: string;
            sendCommissionRate?: string;
        } & { [K_17 in Exclude<keyof I_1["tokens"][number], keyof Token>]: never; })[] & { [K_18 in Exclude<keyof I_1["tokens"], keyof {
            denom?: string;
            issuer?: string;
            symbol?: string;
            subunit?: string;
            precision?: number;
            description?: string;
            globallyFrozen?: boolean;
            features?: import("./token").Feature[];
            burnRate?: string;
            sendCommissionRate?: string;
        }[]>]: never; };
        frozenBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_19 in Exclude<keyof I_1["frozenBalances"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_20 in Exclude<keyof I_1["frozenBalances"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_21 in Exclude<keyof I_1["frozenBalances"][number], keyof Balance>]: never; })[] & { [K_22 in Exclude<keyof I_1["frozenBalances"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        whitelistedBalances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_23 in Exclude<keyof I_1["whitelistedBalances"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_24 in Exclude<keyof I_1["whitelistedBalances"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_25 in Exclude<keyof I_1["whitelistedBalances"][number], keyof Balance>]: never; })[] & { [K_26 in Exclude<keyof I_1["whitelistedBalances"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_27 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const Balance: {
    encode(message: Balance, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Balance;
    fromJSON(object: any): Balance;
    toJSON(message: Balance): unknown;
    create<I extends {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coins"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["coins"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof Balance>]: never; }>(base?: I): Balance;
    fromPartial<I_1 extends {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["coins"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["coins"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof Balance>]: never; }>(object: I_1): Balance;
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
