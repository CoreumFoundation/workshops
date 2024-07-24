/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ClassFeature, classFeatureFromJSON, classFeatureToJSON } from "./nft";

export const protobufPackage = "coreum.asset.nft.v1";

/** EventClassIssued is emitted on MsgIssueClass. */
export interface EventClassIssued {
  id: string;
  issuer: string;
  symbol: string;
  name: string;
  description: string;
  uri: string;
  uriHash: string;
  features: ClassFeature[];
  royaltyRate: string;
}

export interface EventFrozen {
  classId: string;
  id: string;
  owner: string;
}

export interface EventUnfrozen {
  classId: string;
  id: string;
  owner: string;
}

export interface EventAddedToWhitelist {
  classId: string;
  id: string;
  account: string;
}

export interface EventRemovedFromWhitelist {
  classId: string;
  id: string;
  account: string;
}

function createBaseEventClassIssued(): EventClassIssued {
  return {
    id: "",
    issuer: "",
    symbol: "",
    name: "",
    description: "",
    uri: "",
    uriHash: "",
    features: [],
    royaltyRate: "",
  };
}

export const EventClassIssued = {
  encode(message: EventClassIssued, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(50).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(58).string(message.uriHash);
    }
    writer.uint32(66).fork();
    for (const v of message.features) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.royaltyRate !== "") {
      writer.uint32(74).string(message.royaltyRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventClassIssued {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventClassIssued();
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

          message.name = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.uriHash = reader.string();
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

          message.royaltyRate = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventClassIssued {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
      features: Array.isArray(object?.features) ? object.features.map((e: any) => classFeatureFromJSON(e)) : [],
      royaltyRate: isSet(object.royaltyRate) ? String(object.royaltyRate) : "",
    };
  },

  toJSON(message: EventClassIssued): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.uri !== undefined && (obj.uri = message.uri);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    if (message.features) {
      obj.features = message.features.map((e) => classFeatureToJSON(e));
    } else {
      obj.features = [];
    }
    message.royaltyRate !== undefined && (obj.royaltyRate = message.royaltyRate);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventClassIssued>, I>>(base?: I): EventClassIssued {
    return EventClassIssued.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventClassIssued>, I>>(object: I): EventClassIssued {
    const message = createBaseEventClassIssued();
    message.id = object.id ?? "";
    message.issuer = object.issuer ?? "";
    message.symbol = object.symbol ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.features = object.features?.map((e) => e) || [];
    message.royaltyRate = object.royaltyRate ?? "";
    return message;
  },
};

function createBaseEventFrozen(): EventFrozen {
  return { classId: "", id: "", owner: "" };
}

export const EventFrozen = {
  encode(message: EventFrozen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventFrozen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFrozen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.classId = reader.string();
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

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventFrozen {
    return {
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: EventFrozen): unknown {
    const obj: any = {};
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventFrozen>, I>>(base?: I): EventFrozen {
    return EventFrozen.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventFrozen>, I>>(object: I): EventFrozen {
    const message = createBaseEventFrozen();
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseEventUnfrozen(): EventUnfrozen {
  return { classId: "", id: "", owner: "" };
}

export const EventUnfrozen = {
  encode(message: EventUnfrozen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUnfrozen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUnfrozen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.classId = reader.string();
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

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventUnfrozen {
    return {
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: EventUnfrozen): unknown {
    const obj: any = {};
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventUnfrozen>, I>>(base?: I): EventUnfrozen {
    return EventUnfrozen.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventUnfrozen>, I>>(object: I): EventUnfrozen {
    const message = createBaseEventUnfrozen();
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseEventAddedToWhitelist(): EventAddedToWhitelist {
  return { classId: "", id: "", account: "" };
}

export const EventAddedToWhitelist = {
  encode(message: EventAddedToWhitelist, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.account !== "") {
      writer.uint32(26).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventAddedToWhitelist {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAddedToWhitelist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.classId = reader.string();
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

  fromJSON(object: any): EventAddedToWhitelist {
    return {
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: EventAddedToWhitelist): unknown {
    const obj: any = {};
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventAddedToWhitelist>, I>>(base?: I): EventAddedToWhitelist {
    return EventAddedToWhitelist.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventAddedToWhitelist>, I>>(object: I): EventAddedToWhitelist {
    const message = createBaseEventAddedToWhitelist();
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseEventRemovedFromWhitelist(): EventRemovedFromWhitelist {
  return { classId: "", id: "", account: "" };
}

export const EventRemovedFromWhitelist = {
  encode(message: EventRemovedFromWhitelist, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.account !== "") {
      writer.uint32(26).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRemovedFromWhitelist {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemovedFromWhitelist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.classId = reader.string();
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

  fromJSON(object: any): EventRemovedFromWhitelist {
    return {
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: EventRemovedFromWhitelist): unknown {
    const obj: any = {};
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  create<I extends Exact<DeepPartial<EventRemovedFromWhitelist>, I>>(base?: I): EventRemovedFromWhitelist {
    return EventRemovedFromWhitelist.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EventRemovedFromWhitelist>, I>>(object: I): EventRemovedFromWhitelist {
    const message = createBaseEventRemovedFromWhitelist();
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.account = object.account ?? "";
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
