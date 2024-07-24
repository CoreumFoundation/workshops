import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "coreum.nft.v1beta1";
/** EventSend is emitted on Msg/Send */
export interface EventSend {
    classId: string;
    id: string;
    sender: string;
    receiver: string;
}
/** EventMint is emitted on Mint */
export interface EventMint {
    classId: string;
    id: string;
    owner: string;
}
/** EventBurn is emitted on Burn */
export interface EventBurn {
    classId: string;
    id: string;
    owner: string;
}
export declare const EventSend: {
    encode(message: EventSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventSend;
    fromJSON(object: any): EventSend;
    toJSON(message: EventSend): unknown;
    create<I extends {
        classId?: string;
        id?: string;
        sender?: string;
        receiver?: string;
    } & {
        classId?: string;
        id?: string;
        sender?: string;
        receiver?: string;
    } & { [K in Exclude<keyof I, keyof EventSend>]: never; }>(base?: I): EventSend;
    fromPartial<I_1 extends {
        classId?: string;
        id?: string;
        sender?: string;
        receiver?: string;
    } & {
        classId?: string;
        id?: string;
        sender?: string;
        receiver?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventSend>]: never; }>(object: I_1): EventSend;
};
export declare const EventMint: {
    encode(message: EventMint, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventMint;
    fromJSON(object: any): EventMint;
    toJSON(message: EventMint): unknown;
    create<I extends {
        classId?: string;
        id?: string;
        owner?: string;
    } & {
        classId?: string;
        id?: string;
        owner?: string;
    } & { [K in Exclude<keyof I, keyof EventMint>]: never; }>(base?: I): EventMint;
    fromPartial<I_1 extends {
        classId?: string;
        id?: string;
        owner?: string;
    } & {
        classId?: string;
        id?: string;
        owner?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventMint>]: never; }>(object: I_1): EventMint;
};
export declare const EventBurn: {
    encode(message: EventBurn, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventBurn;
    fromJSON(object: any): EventBurn;
    toJSON(message: EventBurn): unknown;
    create<I extends {
        classId?: string;
        id?: string;
        owner?: string;
    } & {
        classId?: string;
        id?: string;
        owner?: string;
    } & { [K in Exclude<keyof I, keyof EventBurn>]: never; }>(base?: I): EventBurn;
    fromPartial<I_1 extends {
        classId?: string;
        id?: string;
        owner?: string;
    } & {
        classId?: string;
        id?: string;
        owner?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventBurn>]: never; }>(object: I_1): EventBurn;
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
