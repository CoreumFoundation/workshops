/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Class } from "./nft";
import { Params } from "./params";

export const protobufPackage = "coreum.asset.nft.v1";

/** QueryParamsRequest defines the request type for querying x/asset/nft parameters. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse defines the response type for querying x/asset/nft parameters. */
export interface QueryParamsResponse {
  params?: Params;
}

/** QueryTokenRequest is request type for the Query/Class RPC method. */
export interface QueryClassRequest {
  /** we don't use the gogoproto.customname here since the google.api.http ignores it and generates invalid code. */
  id: string;
}

/** QueryClassResponse is response type for the Query/Class RPC method. */
export interface QueryClassResponse {
  class?: Class;
}

export interface QueryFrozenRequest {
  id: string;
  classId: string;
}

export interface QueryFrozenResponse {
  frozen: boolean;
}

export interface QueryWhitelistedRequest {
  id: string;
  classId: string;
  account: string;
}

export interface QueryWhitelistedResponse {
  whitelisted: boolean;
}

export interface QueryWhitelistedAccountsForNFTRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  id: string;
  classId: string;
}

export interface QueryWhitelistedAccountsForNFTResponse {
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
  accounts: string[];
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryClassRequest(): QueryClassRequest {
  return { id: "" };
}

export const QueryClassRequest = {
  encode(message: QueryClassRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClassRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: QueryClassRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClassRequest>, I>>(base?: I): QueryClassRequest {
    return QueryClassRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassRequest>, I>>(object: I): QueryClassRequest {
    const message = createBaseQueryClassRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryClassResponse(): QueryClassResponse {
  return { class: undefined };
}

export const QueryClassResponse = {
  encode(message: QueryClassResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class !== undefined) {
      Class.encode(message.class, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.class = Class.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClassResponse {
    return { class: isSet(object.class) ? Class.fromJSON(object.class) : undefined };
  },

  toJSON(message: QueryClassResponse): unknown {
    const obj: any = {};
    message.class !== undefined && (obj.class = message.class ? Class.toJSON(message.class) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClassResponse>, I>>(base?: I): QueryClassResponse {
    return QueryClassResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassResponse>, I>>(object: I): QueryClassResponse {
    const message = createBaseQueryClassResponse();
    message.class = (object.class !== undefined && object.class !== null) ? Class.fromPartial(object.class) : undefined;
    return message;
  },
};

function createBaseQueryFrozenRequest(): QueryFrozenRequest {
  return { id: "", classId: "" };
}

export const QueryFrozenRequest = {
  encode(message: QueryFrozenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFrozenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFrozenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.classId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFrozenRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
    };
  },

  toJSON(message: QueryFrozenRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.classId !== undefined && (obj.classId = message.classId);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFrozenRequest>, I>>(base?: I): QueryFrozenRequest {
    return QueryFrozenRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryFrozenRequest>, I>>(object: I): QueryFrozenRequest {
    const message = createBaseQueryFrozenRequest();
    message.id = object.id ?? "";
    message.classId = object.classId ?? "";
    return message;
  },
};

function createBaseQueryFrozenResponse(): QueryFrozenResponse {
  return { frozen: false };
}

export const QueryFrozenResponse = {
  encode(message: QueryFrozenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.frozen === true) {
      writer.uint32(8).bool(message.frozen);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFrozenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFrozenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.frozen = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFrozenResponse {
    return { frozen: isSet(object.frozen) ? Boolean(object.frozen) : false };
  },

  toJSON(message: QueryFrozenResponse): unknown {
    const obj: any = {};
    message.frozen !== undefined && (obj.frozen = message.frozen);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFrozenResponse>, I>>(base?: I): QueryFrozenResponse {
    return QueryFrozenResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryFrozenResponse>, I>>(object: I): QueryFrozenResponse {
    const message = createBaseQueryFrozenResponse();
    message.frozen = object.frozen ?? false;
    return message;
  },
};

function createBaseQueryWhitelistedRequest(): QueryWhitelistedRequest {
  return { id: "", classId: "", account: "" };
}

export const QueryWhitelistedRequest = {
  encode(message: QueryWhitelistedRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.account !== "") {
      writer.uint32(26).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWhitelistedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.account = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWhitelistedRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: QueryWhitelistedRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.classId !== undefined && (obj.classId = message.classId);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWhitelistedRequest>, I>>(base?: I): QueryWhitelistedRequest {
    return QueryWhitelistedRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryWhitelistedRequest>, I>>(object: I): QueryWhitelistedRequest {
    const message = createBaseQueryWhitelistedRequest();
    message.id = object.id ?? "";
    message.classId = object.classId ?? "";
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseQueryWhitelistedResponse(): QueryWhitelistedResponse {
  return { whitelisted: false };
}

export const QueryWhitelistedResponse = {
  encode(message: QueryWhitelistedResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.whitelisted === true) {
      writer.uint32(8).bool(message.whitelisted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWhitelistedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.whitelisted = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWhitelistedResponse {
    return { whitelisted: isSet(object.whitelisted) ? Boolean(object.whitelisted) : false };
  },

  toJSON(message: QueryWhitelistedResponse): unknown {
    const obj: any = {};
    message.whitelisted !== undefined && (obj.whitelisted = message.whitelisted);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWhitelistedResponse>, I>>(base?: I): QueryWhitelistedResponse {
    return QueryWhitelistedResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryWhitelistedResponse>, I>>(object: I): QueryWhitelistedResponse {
    const message = createBaseQueryWhitelistedResponse();
    message.whitelisted = object.whitelisted ?? false;
    return message;
  },
};

function createBaseQueryWhitelistedAccountsForNFTRequest(): QueryWhitelistedAccountsForNFTRequest {
  return { pagination: undefined, id: "", classId: "" };
}

export const QueryWhitelistedAccountsForNFTRequest = {
  encode(message: QueryWhitelistedAccountsForNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.classId !== "") {
      writer.uint32(26).string(message.classId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedAccountsForNFTRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWhitelistedAccountsForNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.classId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWhitelistedAccountsForNFTRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
    };
  },

  toJSON(message: QueryWhitelistedAccountsForNFTRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.id !== undefined && (obj.id = message.id);
    message.classId !== undefined && (obj.classId = message.classId);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWhitelistedAccountsForNFTRequest>, I>>(
    base?: I,
  ): QueryWhitelistedAccountsForNFTRequest {
    return QueryWhitelistedAccountsForNFTRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryWhitelistedAccountsForNFTRequest>, I>>(
    object: I,
  ): QueryWhitelistedAccountsForNFTRequest {
    const message = createBaseQueryWhitelistedAccountsForNFTRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.id = object.id ?? "";
    message.classId = object.classId ?? "";
    return message;
  },
};

function createBaseQueryWhitelistedAccountsForNFTResponse(): QueryWhitelistedAccountsForNFTResponse {
  return { pagination: undefined, accounts: [] };
}

export const QueryWhitelistedAccountsForNFTResponse = {
  encode(message: QueryWhitelistedAccountsForNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.accounts) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhitelistedAccountsForNFTResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWhitelistedAccountsForNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.accounts.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWhitelistedAccountsForNFTResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      accounts: Array.isArray(object?.accounts) ? object.accounts.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: QueryWhitelistedAccountsForNFTResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.accounts) {
      obj.accounts = message.accounts.map((e) => e);
    } else {
      obj.accounts = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWhitelistedAccountsForNFTResponse>, I>>(
    base?: I,
  ): QueryWhitelistedAccountsForNFTResponse {
    return QueryWhitelistedAccountsForNFTResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryWhitelistedAccountsForNFTResponse>, I>>(
    object: I,
  ): QueryWhitelistedAccountsForNFTResponse {
    const message = createBaseQueryWhitelistedAccountsForNFTResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.accounts = object.accounts?.map((e) => e) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of x/asset/ft module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Class queries the non-fungible token class of the module. */
  Class(request: QueryClassRequest): Promise<QueryClassResponse>;
  /** Frozen queries to check if an NFT is frozen or not. */
  Frozen(request: QueryFrozenRequest): Promise<QueryFrozenResponse>;
  /** Whitelisted queries to check if an account is whitelited to hold an NFT or not. */
  Whitelisted(request: QueryWhitelistedRequest): Promise<QueryWhitelistedResponse>;
  /** WhitelistedAccountsForNFT returns the list of accounts which are whitelisted to hold this NFT. */
  WhitelistedAccountsForNFT(
    request: QueryWhitelistedAccountsForNFTRequest,
  ): Promise<QueryWhitelistedAccountsForNFTResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "coreum.asset.nft.v1.Query";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Class = this.Class.bind(this);
    this.Frozen = this.Frozen.bind(this);
    this.Whitelisted = this.Whitelisted.bind(this);
    this.WhitelistedAccountsForNFT = this.WhitelistedAccountsForNFT.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Class(request: QueryClassRequest): Promise<QueryClassResponse> {
    const data = QueryClassRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Class", data);
    return promise.then((data) => QueryClassResponse.decode(_m0.Reader.create(data)));
  }

  Frozen(request: QueryFrozenRequest): Promise<QueryFrozenResponse> {
    const data = QueryFrozenRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Frozen", data);
    return promise.then((data) => QueryFrozenResponse.decode(_m0.Reader.create(data)));
  }

  Whitelisted(request: QueryWhitelistedRequest): Promise<QueryWhitelistedResponse> {
    const data = QueryWhitelistedRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Whitelisted", data);
    return promise.then((data) => QueryWhitelistedResponse.decode(_m0.Reader.create(data)));
  }

  WhitelistedAccountsForNFT(
    request: QueryWhitelistedAccountsForNFTRequest,
  ): Promise<QueryWhitelistedAccountsForNFTResponse> {
    const data = QueryWhitelistedAccountsForNFTRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "WhitelistedAccountsForNFT", data);
    return promise.then((data) => QueryWhitelistedAccountsForNFTResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
