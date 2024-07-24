/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Feature, featureFromJSON, featureToJSON } from "./token";

export const protobufPackage = "coreum.asset.ft.v1";

/** EventIssued is emitted on MsgIssue. */
export interface EventIssued {
  denom: string;
  issuer: string;
  symbol: string;
  subunit: string;
  precision: number;
  initialAmount: string;
  description: string;
  features: Feature[];
  burnRate: string;
  sendCommissionRate: string;
}

export interface EventFrozenAmountChanged {
  account: string;
  denom: string;
  previousAmount: string;
  currentAmount: string;
}

export interface EventWhitelistedAmountChanged {
  account: string;
  denom: string;
  previousAmount: string;
  currentAmount: string;
}

function createBaseEventIssued(): EventIssued {
  return {
    denom: "",
    issuer: "",
    symbol: "",
    subunit: "",
    precision: 0,
    initialAmount: "",
    description: "",
    features: [],
    burnRate: "",
    sendCommissionRate: "",
  };
}

export const EventIssued = {
  encode(message: EventIssued, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.subunit !== "") {
      writer.uint32(34).string(message.subunit);
    }
    if (message.precision !== 0) {
      writer.uint32(40).uint32(message.precision);
    }
    if (message.initialAmount !== "") {
      writer.uint32(50).string(message.initialAmount);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    writer.uint32(66).fork();
    for (const v of message.features) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.burnRate !== "") {
      writer.uint32(74).string(message.burnRate);
    }
    if (message.sendCommissionRate !== "") {
      writer.uint32(82).string(message.sendCommissionRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventIssued {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventIssued();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.subunit = reader.string();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.precision = reader.uint32();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.initialAmount = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.description = reader.string();
          continue;
        case 8:
          if (tag == 64) {
            message.features.push(reader.int32() as any);
            continue;
          }

          if (tag == 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.features.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 9:
          if (tag != 74) {
            break;
          }

          message.burnRate = reader.string();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.sendCommissionRate = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventIssued {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      subunit: isSet(object.subunit) ? String(object.subunit) : "",
      precision: isSet(object.precision) ? Number(object.precision) : 0,
      initialAmount: isSet(object.initialAmount) ? String(object.initialAmount) : "",
      description: isSet(object.description) ? String(object.description) : "",
      features: Array.isArray(object?.features) ? object.features.map((e: any) => featureFromJSON(e)) : [],
      burnRate: isSet(object.burnRate) ? String(object.burnRate) : "",
      sendCommissionRate: isSet(object.sendCommissionRate) ? String(object.sendCommissionRate) : "",
    };
  },

  toJSON(message: EventIssued): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.subunit !== undefined && (obj.subunit = message.subunit);
    message.precision !== undefined && (obj.precision = Math.round(message.precision));
    message.initialAmount !== undefined && (obj.initialAmount = message.initialAmount);
    message.description !== undefined && (obj.description = message.description);
    if (message.features) {
      obj.features = message.features.map((e) => featureToJSON(e));
    } else {
      obj.features = [];
    }
    message.burnRate !== undefined && (obj.burnRate = message.burnRate);
    message.sendCommissionRate !== undefined && (obj.sendCommissionRate = message.sendCommissionRate);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventIssued>, I>>(base?: I): EventIssued {
    return EventIssued.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventIssued>, I>>(object: I): EventIssued {
    const message = createBaseEventIssued();
    message.denom = object.denom ?? "";
    message.issuer = object.issuer ?? "";
    message.symbol = object.symbol ?? "";
    message.subunit = object.subunit ?? "";
    message.precision = object.precision ?? 0;
    message.initialAmount = object.initialAmount ?? "";
    message.description = object.description ?? "";
    message.features = object.features?.map((e) => e) || [];
    message.burnRate = object.burnRate ?? "";
    message.sendCommissionRate = object.sendCommissionRate ?? "";
    return message;
  },
};

function createBaseEventFrozenAmountChanged(): EventFrozenAmountChanged {
  return { account: "", denom: "", previousAmount: "", currentAmount: "" };
}

export const EventFrozenAmountChanged = {
  encode(message: EventFrozenAmountChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.previousAmount !== "") {
      writer.uint32(26).string(message.previousAmount);
    }
    if (message.currentAmount !== "") {
      writer.uint32(34).string(message.currentAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventFrozenAmountChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFrozenAmountChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.account = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.previousAmount = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.currentAmount = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventFrozenAmountChanged {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      previousAmount: isSet(object.previousAmount) ? String(object.previousAmount) : "",
      currentAmount: isSet(object.currentAmount) ? String(object.currentAmount) : "",
    };
  },

  toJSON(message: EventFrozenAmountChanged): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.denom !== undefined && (obj.denom = message.denom);
    message.previousAmount !== undefined && (obj.previousAmount = message.previousAmount);
    message.currentAmount !== undefined && (obj.currentAmount = message.currentAmount);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventFrozenAmountChanged>, I>>(base?: I): EventFrozenAmountChanged {
    return EventFrozenAmountChanged.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventFrozenAmountChanged>, I>>(object: I): EventFrozenAmountChanged {
    const message = createBaseEventFrozenAmountChanged();
    message.account = object.account ?? "";
    message.denom = object.denom ?? "";
    message.previousAmount = object.previousAmount ?? "";
    message.currentAmount = object.currentAmount ?? "";
    return message;
  },
};

function createBaseEventWhitelistedAmountChanged(): EventWhitelistedAmountChanged {
  return { account: "", denom: "", previousAmount: "", currentAmount: "" };
}

export const EventWhitelistedAmountChanged = {
  encode(message: EventWhitelistedAmountChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.previousAmount !== "") {
      writer.uint32(26).string(message.previousAmount);
    }
    if (message.currentAmount !== "") {
      writer.uint32(34).string(message.currentAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventWhitelistedAmountChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWhitelistedAmountChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.account = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.previousAmount = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.currentAmount = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventWhitelistedAmountChanged {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      previousAmount: isSet(object.previousAmount) ? String(object.previousAmount) : "",
      currentAmount: isSet(object.currentAmount) ? String(object.currentAmount) : "",
    };
  },

  toJSON(message: EventWhitelistedAmountChanged): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.denom !== undefined && (obj.denom = message.denom);
    message.previousAmount !== undefined && (obj.previousAmount = message.previousAmount);
    message.currentAmount !== undefined && (obj.currentAmount = message.currentAmount);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventWhitelistedAmountChanged>, I>>(base?: I): EventWhitelistedAmountChanged {
    return EventWhitelistedAmountChanged.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventWhitelistedAmountChanged>, I>>(
    object: I,
  ): EventWhitelistedAmountChanged {
    const message = createBaseEventWhitelistedAmountChanged();
    message.account = object.account ?? "";
    message.denom = object.denom ?? "";
    message.previousAmount = object.previousAmount ?? "";
    message.currentAmount = object.currentAmount ?? "";
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
