import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecCoin } from "./coin";
import { Params } from "./params";

export const protobufPackage = "coreum.feemodel.v1";

export interface QueryMinGasPriceRequest {
}

export interface QueryMinGasPriceResponse {
  minGasPrice?: DecCoin | undefined;
}

export interface QueryRecommendedGasPriceRequest {
  afterBlocks: number;
}

export interface QueryRecommendedGasPriceResponse {
  low?: DecCoin | undefined;
  med?: DecCoin | undefined;
  high?: DecCoin | undefined;
}

export interface QueryParamsRequest {
}

export interface QueryParamsResponse {
  params?: Params | undefined;
}

function createBaseQueryMinGasPriceRequest(): QueryMinGasPriceRequest {
  return {};
}

export const QueryMinGasPriceRequest = {
  encode(_: QueryMinGasPriceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMinGasPriceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMinGasPriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryMinGasPriceRequest {
    return {};
  },

  toJSON(_: QueryMinGasPriceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryMinGasPriceRequest>, I>>(base?: I): QueryMinGasPriceRequest {
    return QueryMinGasPriceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryMinGasPriceRequest>, I>>(_: I): QueryMinGasPriceRequest {
    const message = createBaseQueryMinGasPriceRequest();
    return message;
  },
};

function createBaseQueryMinGasPriceResponse(): QueryMinGasPriceResponse {
  return { minGasPrice: undefined };
}

export const QueryMinGasPriceResponse = {
  encode(message: QueryMinGasPriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minGasPrice !== undefined) {
      DecCoin.encode(message.minGasPrice, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMinGasPriceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMinGasPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.minGasPrice = DecCoin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryMinGasPriceResponse {
    return { minGasPrice: isSet(object.minGasPrice) ? DecCoin.fromJSON(object.minGasPrice) : undefined };
  },

  toJSON(message: QueryMinGasPriceResponse): unknown {
    const obj: any = {};
    if (message.minGasPrice !== undefined) {
      obj.minGasPrice = DecCoin.toJSON(message.minGasPrice);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryMinGasPriceResponse>, I>>(base?: I): QueryMinGasPriceResponse {
    return QueryMinGasPriceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryMinGasPriceResponse>, I>>(object: I): QueryMinGasPriceResponse {
    const message = createBaseQueryMinGasPriceResponse();
    message.minGasPrice = (object.minGasPrice !== undefined && object.minGasPrice !== null)
      ? DecCoin.fromPartial(object.minGasPrice)
      : undefined;
    return message;
  },
};

function createBaseQueryRecommendedGasPriceRequest(): QueryRecommendedGasPriceRequest {
  return { afterBlocks: 0 };
}

export const QueryRecommendedGasPriceRequest = {
  encode(message: QueryRecommendedGasPriceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.afterBlocks !== 0) {
      writer.uint32(8).uint32(message.afterBlocks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecommendedGasPriceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecommendedGasPriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.afterBlocks = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRecommendedGasPriceRequest {
    return { afterBlocks: isSet(object.afterBlocks) ? Number(object.afterBlocks) : 0 };
  },

  toJSON(message: QueryRecommendedGasPriceRequest): unknown {
    const obj: any = {};
    if (message.afterBlocks !== 0) {
      obj.afterBlocks = Math.round(message.afterBlocks);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRecommendedGasPriceRequest>, I>>(base?: I): QueryRecommendedGasPriceRequest {
    return QueryRecommendedGasPriceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRecommendedGasPriceRequest>, I>>(
    object: I,
  ): QueryRecommendedGasPriceRequest {
    const message = createBaseQueryRecommendedGasPriceRequest();
    message.afterBlocks = object.afterBlocks ?? 0;
    return message;
  },
};

function createBaseQueryRecommendedGasPriceResponse(): QueryRecommendedGasPriceResponse {
  return { low: undefined, med: undefined, high: undefined };
}

export const QueryRecommendedGasPriceResponse = {
  encode(message: QueryRecommendedGasPriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.low !== undefined) {
      DecCoin.encode(message.low, writer.uint32(10).fork()).ldelim();
    }
    if (message.med !== undefined) {
      DecCoin.encode(message.med, writer.uint32(18).fork()).ldelim();
    }
    if (message.high !== undefined) {
      DecCoin.encode(message.high, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecommendedGasPriceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecommendedGasPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.low = DecCoin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.med = DecCoin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.high = DecCoin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRecommendedGasPriceResponse {
    return {
      low: isSet(object.low) ? DecCoin.fromJSON(object.low) : undefined,
      med: isSet(object.med) ? DecCoin.fromJSON(object.med) : undefined,
      high: isSet(object.high) ? DecCoin.fromJSON(object.high) : undefined,
    };
  },

  toJSON(message: QueryRecommendedGasPriceResponse): unknown {
    const obj: any = {};
    if (message.low !== undefined) {
      obj.low = DecCoin.toJSON(message.low);
    }
    if (message.med !== undefined) {
      obj.med = DecCoin.toJSON(message.med);
    }
    if (message.high !== undefined) {
      obj.high = DecCoin.toJSON(message.high);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRecommendedGasPriceResponse>, I>>(
    base?: I,
  ): QueryRecommendedGasPriceResponse {
    return QueryRecommendedGasPriceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRecommendedGasPriceResponse>, I>>(
    object: I,
  ): QueryRecommendedGasPriceResponse {
    const message = createBaseQueryRecommendedGasPriceResponse();
    message.low = (object.low !== undefined && object.low !== null) ? DecCoin.fromPartial(object.low) : undefined;
    message.med = (object.med !== undefined && object.med !== null) ? DecCoin.fromPartial(object.med) : undefined;
    message.high = (object.high !== undefined && object.high !== null) ? DecCoin.fromPartial(object.high) : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
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
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** MinGasPrice queries the current minimum gas price required by the network. */
  MinGasPrice(request: QueryMinGasPriceRequest): Promise<QueryMinGasPriceResponse>;
  /** RecommendedGasPrice queries the recommended gas price for the next n blocks. */
  RecommendedGasPrice(request: QueryRecommendedGasPriceRequest): Promise<QueryRecommendedGasPriceResponse>;
  /** Params queries the parameters of x/feemodel module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export const QueryServiceName = "coreum.feemodel.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.MinGasPrice = this.MinGasPrice.bind(this);
    this.RecommendedGasPrice = this.RecommendedGasPrice.bind(this);
    this.Params = this.Params.bind(this);
  }
  MinGasPrice(request: QueryMinGasPriceRequest): Promise<QueryMinGasPriceResponse> {
    const data = QueryMinGasPriceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "MinGasPrice", data);
    return promise.then((data) => QueryMinGasPriceResponse.decode(_m0.Reader.create(data)));
  }

  RecommendedGasPrice(request: QueryRecommendedGasPriceRequest): Promise<QueryRecommendedGasPriceResponse> {
    const data = QueryRecommendedGasPriceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RecommendedGasPrice", data);
    return promise.then((data) => QueryRecommendedGasPriceResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
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
