import Long from "long";
import _m0 from "protobufjs/minimal";
import { ClassDefinition } from "./nft";
import { Params } from "./params";
export declare const protobufPackage = "coreum.asset.nft.v1";
/** GenesisState defines the nftasset module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params?: Params;
    /** class_definitions keep the non-fungible token class definitions state */
    classDefinitions: ClassDefinition[];
    frozenNfts: FrozenNFT[];
    whitelistedNftAccounts: WhitelistedNFTAccounts[];
    burntNfts: BurntNFT[];
}
export interface FrozenNFT {
    classID: string;
    nftIDs: string[];
}
export interface WhitelistedNFTAccounts {
    classID: string;
    nftID: string;
    accounts: string[];
}
export interface BurntNFT {
    classID: string;
    nftIDs: string[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            mintFee?: {
                denom?: string;
                amount?: string;
            };
        };
        classDefinitions?: {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        }[];
        frozenNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[];
        whitelistedNftAccounts?: {
            classID?: string;
            nftID?: string;
            accounts?: string[];
        }[];
        burntNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[];
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
        classDefinitions?: {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        }[] & ({
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        } & {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[] & import("./nft").ClassFeature[] & { [K_2 in Exclude<keyof I["classDefinitions"][number]["features"], keyof import("./nft").ClassFeature[]>]: never; };
            royaltyRate?: string;
        } & { [K_3 in Exclude<keyof I["classDefinitions"][number], keyof ClassDefinition>]: never; })[] & { [K_4 in Exclude<keyof I["classDefinitions"], keyof {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        }[]>]: never; };
        frozenNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[] & ({
            classID?: string;
            nftIDs?: string[];
        } & {
            classID?: string;
            nftIDs?: string[] & string[] & { [K_5 in Exclude<keyof I["frozenNfts"][number]["nftIDs"], keyof string[]>]: never; };
        } & { [K_6 in Exclude<keyof I["frozenNfts"][number], keyof FrozenNFT>]: never; })[] & { [K_7 in Exclude<keyof I["frozenNfts"], keyof {
            classID?: string;
            nftIDs?: string[];
        }[]>]: never; };
        whitelistedNftAccounts?: {
            classID?: string;
            nftID?: string;
            accounts?: string[];
        }[] & ({
            classID?: string;
            nftID?: string;
            accounts?: string[];
        } & {
            classID?: string;
            nftID?: string;
            accounts?: string[] & string[] & { [K_8 in Exclude<keyof I["whitelistedNftAccounts"][number]["accounts"], keyof string[]>]: never; };
        } & { [K_9 in Exclude<keyof I["whitelistedNftAccounts"][number], keyof WhitelistedNFTAccounts>]: never; })[] & { [K_10 in Exclude<keyof I["whitelistedNftAccounts"], keyof {
            classID?: string;
            nftID?: string;
            accounts?: string[];
        }[]>]: never; };
        burntNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[] & ({
            classID?: string;
            nftIDs?: string[];
        } & {
            classID?: string;
            nftIDs?: string[] & string[] & { [K_11 in Exclude<keyof I["burntNfts"][number]["nftIDs"], keyof string[]>]: never; };
        } & { [K_12 in Exclude<keyof I["burntNfts"][number], keyof BurntNFT>]: never; })[] & { [K_13 in Exclude<keyof I["burntNfts"], keyof {
            classID?: string;
            nftIDs?: string[];
        }[]>]: never; };
    } & { [K_14 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            mintFee?: {
                denom?: string;
                amount?: string;
            };
        };
        classDefinitions?: {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        }[];
        frozenNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[];
        whitelistedNftAccounts?: {
            classID?: string;
            nftID?: string;
            accounts?: string[];
        }[];
        burntNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[];
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
            } & { [K_15 in Exclude<keyof I_1["params"]["mintFee"], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; };
        } & { [K_16 in Exclude<keyof I_1["params"], "mintFee">]: never; };
        classDefinitions?: {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        }[] & ({
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        } & {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[] & import("./nft").ClassFeature[] & { [K_17 in Exclude<keyof I_1["classDefinitions"][number]["features"], keyof import("./nft").ClassFeature[]>]: never; };
            royaltyRate?: string;
        } & { [K_18 in Exclude<keyof I_1["classDefinitions"][number], keyof ClassDefinition>]: never; })[] & { [K_19 in Exclude<keyof I_1["classDefinitions"], keyof {
            id?: string;
            issuer?: string;
            features?: import("./nft").ClassFeature[];
            royaltyRate?: string;
        }[]>]: never; };
        frozenNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[] & ({
            classID?: string;
            nftIDs?: string[];
        } & {
            classID?: string;
            nftIDs?: string[] & string[] & { [K_20 in Exclude<keyof I_1["frozenNfts"][number]["nftIDs"], keyof string[]>]: never; };
        } & { [K_21 in Exclude<keyof I_1["frozenNfts"][number], keyof FrozenNFT>]: never; })[] & { [K_22 in Exclude<keyof I_1["frozenNfts"], keyof {
            classID?: string;
            nftIDs?: string[];
        }[]>]: never; };
        whitelistedNftAccounts?: {
            classID?: string;
            nftID?: string;
            accounts?: string[];
        }[] & ({
            classID?: string;
            nftID?: string;
            accounts?: string[];
        } & {
            classID?: string;
            nftID?: string;
            accounts?: string[] & string[] & { [K_23 in Exclude<keyof I_1["whitelistedNftAccounts"][number]["accounts"], keyof string[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["whitelistedNftAccounts"][number], keyof WhitelistedNFTAccounts>]: never; })[] & { [K_25 in Exclude<keyof I_1["whitelistedNftAccounts"], keyof {
            classID?: string;
            nftID?: string;
            accounts?: string[];
        }[]>]: never; };
        burntNfts?: {
            classID?: string;
            nftIDs?: string[];
        }[] & ({
            classID?: string;
            nftIDs?: string[];
        } & {
            classID?: string;
            nftIDs?: string[] & string[] & { [K_26 in Exclude<keyof I_1["burntNfts"][number]["nftIDs"], keyof string[]>]: never; };
        } & { [K_27 in Exclude<keyof I_1["burntNfts"][number], keyof BurntNFT>]: never; })[] & { [K_28 in Exclude<keyof I_1["burntNfts"], keyof {
            classID?: string;
            nftIDs?: string[];
        }[]>]: never; };
    } & { [K_29 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const FrozenNFT: {
    encode(message: FrozenNFT, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FrozenNFT;
    fromJSON(object: any): FrozenNFT;
    toJSON(message: FrozenNFT): unknown;
    create<I extends {
        classID?: string;
        nftIDs?: string[];
    } & {
        classID?: string;
        nftIDs?: string[] & string[] & { [K in Exclude<keyof I["nftIDs"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof FrozenNFT>]: never; }>(base?: I): FrozenNFT;
    fromPartial<I_1 extends {
        classID?: string;
        nftIDs?: string[];
    } & {
        classID?: string;
        nftIDs?: string[] & string[] & { [K_2 in Exclude<keyof I_1["nftIDs"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof FrozenNFT>]: never; }>(object: I_1): FrozenNFT;
};
export declare const WhitelistedNFTAccounts: {
    encode(message: WhitelistedNFTAccounts, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WhitelistedNFTAccounts;
    fromJSON(object: any): WhitelistedNFTAccounts;
    toJSON(message: WhitelistedNFTAccounts): unknown;
    create<I extends {
        classID?: string;
        nftID?: string;
        accounts?: string[];
    } & {
        classID?: string;
        nftID?: string;
        accounts?: string[] & string[] & { [K in Exclude<keyof I["accounts"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof WhitelistedNFTAccounts>]: never; }>(base?: I): WhitelistedNFTAccounts;
    fromPartial<I_1 extends {
        classID?: string;
        nftID?: string;
        accounts?: string[];
    } & {
        classID?: string;
        nftID?: string;
        accounts?: string[] & string[] & { [K_2 in Exclude<keyof I_1["accounts"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof WhitelistedNFTAccounts>]: never; }>(object: I_1): WhitelistedNFTAccounts;
};
export declare const BurntNFT: {
    encode(message: BurntNFT, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BurntNFT;
    fromJSON(object: any): BurntNFT;
    toJSON(message: BurntNFT): unknown;
    create<I extends {
        classID?: string;
        nftIDs?: string[];
    } & {
        classID?: string;
        nftIDs?: string[] & string[] & { [K in Exclude<keyof I["nftIDs"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof BurntNFT>]: never; }>(base?: I): BurntNFT;
    fromPartial<I_1 extends {
        classID?: string;
        nftIDs?: string[];
    } & {
        classID?: string;
        nftIDs?: string[] & string[] & { [K_2 in Exclude<keyof I_1["nftIDs"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof BurntNFT>]: never; }>(object: I_1): BurntNFT;
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
