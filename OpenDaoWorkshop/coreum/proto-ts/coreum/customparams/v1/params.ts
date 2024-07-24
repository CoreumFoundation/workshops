/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "coreum.customparams.v1";

/** StakingParams defines the set of additional staking params for the staking module wrapper. */
export interface StakingParams {
  /** min_self_delegation is the validators global self declared minimum for delegation. */
  minSelfDelegation: string;
}

function createBaseStakingParams(): StakingParams {
  return { minSelfDelegation: "" };
}

export const StakingParams = {
  encode(message: StakingParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minSelfDelegation !== "") {
      writer.uint32(10).string(message.minSelfDelegation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StakingParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.minSelfDelegation = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StakingParams {
    return { minSelfDelegation: isSet(object.minSelfDelegation) ? String(object.minSelfDelegation) : "" };
  },

  toJSON(message: StakingParams): unknown {
    const obj: any = {};
    message.minSelfDelegation !== undefined && (obj.minSelfDelegation = message.minSelfDelegation);
    return obj;
  },

  create<I extends Exact<DeepPartial<StakingParams>, I>>(base?: I): StakingParams {
    return StakingParams.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StakingParams>, I>>(object: I): StakingParams {
    const message = createBaseStakingParams();
    message.minSelfDelegation = object.minSelfDelegation ?? "";
    return message;
  },
};

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
