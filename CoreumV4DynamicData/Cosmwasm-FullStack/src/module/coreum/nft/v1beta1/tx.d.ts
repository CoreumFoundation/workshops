import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "coreum.nft.v1beta1";
/** MsgSend represents a message to send a nft from one account to another account. */
export interface MsgSend {
    /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
    classId: string;
    /** id defines the unique identification of nft */
    id: string;
    /** sender is the address of the owner of nft */
    sender: string;
    /** receiver is the receiver address of nft */
    receiver: string;
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponse {
}
export declare const MsgSend: {
    encode(message: MsgSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSend;
    fromJSON(object: any): MsgSend;
    toJSON(message: MsgSend): unknown;
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
    } & { [K in Exclude<keyof I, keyof MsgSend>]: never; }>(base?: I): MsgSend;
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
    } & { [K_1 in Exclude<keyof I_1, keyof MsgSend>]: never; }>(object: I_1): MsgSend;
};
export declare const MsgSendResponse: {
    encode(_: MsgSendResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendResponse;
    fromJSON(_: any): MsgSendResponse;
    toJSON(_: MsgSendResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgSendResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgSendResponse;
};
/** Msg defines the nft Msg service. */
export interface Msg {
    /** Send defines a method to send a nft from one account to another account. */
    Send(request: MsgSend): Promise<MsgSendResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Send(request: MsgSend): Promise<MsgSendResponse>;
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
