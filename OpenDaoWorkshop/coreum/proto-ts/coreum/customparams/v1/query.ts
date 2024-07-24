/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { StakingParams } from "./params";

export const protobufPackage = "coreum.customparams.v1";

/** QueryStakingParamsRequest defines the request type for querying x/customparams staking parameters. */
export interface QueryStakingParamsRequest {
}

/** QueryStakingParamsResponse defines the response type for querying x/customparams staking parameters. */
export interface QueryStakingParamsResponse {
  params?: StakingParams;
}

function createBaseQueryStakingParamsRequest(): QueryStakingParamsRequest {
  return {};
}

export const QueryStakingParamsRequest = {
  encode(_: QueryStakingParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakingParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingParamsRequest();
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

  fromJSON(_: any): QueryStakingParamsRequest {
    return {};
  },

  toJSON(_: QueryStakingParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryStakingParamsRequest>, I>>(base?: I): QueryStakingParamsRequest {
    return QueryStakingParamsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakingParamsRequest>, I>>(_: I): QueryStakingParamsRequest {
    const message = createBaseQueryStakingParamsRequest();
    return message;
  },
};

function createBaseQueryStakingParamsResponse(): QueryStakingParamsResponse {
  return { params: undefined };
}

export const QueryStakingParamsResponse = {
  encode(message: QueryStakingParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      StakingParams.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakingParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.params = StakingParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryStakingParamsResponse {
    return { params: isSet(object.params) ? StakingParams.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryStakingParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? StakingParams.toJSON(message.params) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryStakingParamsResponse>, I>>(base?: I): QueryStakingParamsResponse {
    return QueryStakingParamsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakingParamsResponse>, I>>(object: I): QueryStakingParamsResponse {
    const message = createBaseQueryStakingParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? StakingParams.fromPartial(object.params)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** StakingParams queries the staking parameters of the module. */
  StakingParams(request: QueryStakingParamsRequest): Promise<QueryStakingParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "coreum.customparams.v1.Query";
    this.rpc = rpc;
    this.StakingParams = this.StakingParams.bind(this);
  }
  StakingParams(request: QueryStakingParamsRequest): Promise<QueryStakingParamsResponse> {
    const data = QueryStakingParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StakingParams", data);
    return promise.then((data) => QueryStakingParamsResponse.decode(_m0.Reader.create(data)));
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
