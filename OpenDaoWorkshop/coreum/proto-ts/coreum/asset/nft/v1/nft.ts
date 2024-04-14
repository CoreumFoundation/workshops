/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "coreum.asset.nft.v1";

/** ClassFeature defines possible features of non-fungible token class. */
export enum ClassFeature {
  burning = 0,
  freezing = 1,
  whitelisting = 2,
  disable_sending = 3,
  UNRECOGNIZED = -1,
}

export function classFeatureFromJSON(object: any): ClassFeature {
  switch (object) {
    case 0:
    case "burning":
      return ClassFeature.burning;
    case 1:
    case "freezing":
      return ClassFeature.freezing;
    case 2:
    case "whitelisting":
      return ClassFeature.whitelisting;
    case 3:
    case "disable_sending":
      return ClassFeature.disable_sending;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClassFeature.UNRECOGNIZED;
  }
}

export function classFeatureToJSON(object: ClassFeature): string {
  switch (object) {
    case ClassFeature.burning:
      return "burning";
    case ClassFeature.freezing:
      return "freezing";
    case ClassFeature.whitelisting:
      return "whitelisting";
    case ClassFeature.disable_sending:
      return "disable_sending";
    case ClassFeature.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** ClassDefinition defines the non-fungible token class settings to store. */
export interface ClassDefinition {
  id: string;
  issuer: string;
  features: ClassFeature[];
  /**
   * royalty_rate is a number between 0 and 1,which will be used in coreum native Dex.
   * whenever an NFT this class is traded on the Dex, the traded amount will be multiplied by this value
   * that will be transferred to the issuer of the NFT.
   */
  royaltyRate: string;
}

/** Class is a full representation of the non-fungible token class. */
export interface Class {
  id: string;
  issuer: string;
  name: string;
  symbol: string;
  description: string;
  uri: string;
  uriHash: string;
  data?: Any;
  features: ClassFeature[];
  /**
   * royalty_rate is a number between 0 and 1,which will be used in coreum native Dex.
   * whenever an NFT this class is traded on the Dex, the traded amount will be multiplied by this value
   * that will be transferred to the issuer of the NFT.
   */
  royaltyRate: string;
}

function createBaseClassDefinition(): ClassDefinition {
  return { id: "", issuer: "", features: [], royaltyRate: "" };
}

export const ClassDefinition = {
  encode(message: ClassDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    writer.uint32(26).fork();
    for (const v of message.features) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.royaltyRate !== "") {
      writer.uint32(34).string(message.royaltyRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassDefinition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassDefinition();
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
          if (tag == 24) {
            message.features.push(reader.int32() as any);
            continue;
          }

          if (tag == 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.features.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 4:
          if (tag != 34) {
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

  fromJSON(object: any): ClassDefinition {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      features: Array.isArray(object?.features) ? object.features.map((e: any) => classFeatureFromJSON(e)) : [],
      royaltyRate: isSet(object.royaltyRate) ? String(object.royaltyRate) : "",
    };
  },

  toJSON(message: ClassDefinition): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.issuer !== undefined && (obj.issuer = message.issuer);
    if (message.features) {
      obj.features = message.features.map((e) => classFeatureToJSON(e));
    } else {
      obj.features = [];
    }
    message.royaltyRate !== undefined && (obj.royaltyRate = message.royaltyRate);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClassDefinition>, I>>(base?: I): ClassDefinition {
    return ClassDefinition.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClassDefinition>, I>>(object: I): ClassDefinition {
    const message = createBaseClassDefinition();
    message.id = object.id ?? "";
    message.issuer = object.issuer ?? "";
    message.features = object.features?.map((e) => e) || [];
    message.royaltyRate = object.royaltyRate ?? "";
    return message;
  },
};

function createBaseClass(): Class {
  return {
    id: "",
    issuer: "",
    name: "",
    symbol: "",
    description: "",
    uri: "",
    uriHash: "",
    data: undefined,
    features: [],
    royaltyRate: "",
  };
}

export const Class = {
  encode(message: Class, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
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
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(66).fork()).ldelim();
    }
    writer.uint32(74).fork();
    for (const v of message.features) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.royaltyRate !== "") {
      writer.uint32(82).string(message.royaltyRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Class {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClass();
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

          message.name = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.symbol = reader.string();
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
          if (tag != 66) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag == 72) {
            message.features.push(reader.int32() as any);
            continue;
          }

          if (tag == 74) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.features.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 10:
          if (tag != 82) {
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

  fromJSON(object: any): Class {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      name: isSet(object.name) ? String(object.name) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      description: isSet(object.description) ? String(object.description) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
      features: Array.isArray(object?.features) ? object.features.map((e: any) => classFeatureFromJSON(e)) : [],
      royaltyRate: isSet(object.royaltyRate) ? String(object.royaltyRate) : "",
    };
  },

  toJSON(message: Class): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.name !== undefined && (obj.name = message.name);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.description !== undefined && (obj.description = message.description);
    message.uri !== undefined && (obj.uri = message.uri);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    message.data !== undefined && (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    if (message.features) {
      obj.features = message.features.map((e) => classFeatureToJSON(e));
    } else {
      obj.features = [];
    }
    message.royaltyRate !== undefined && (obj.royaltyRate = message.royaltyRate);
    return obj;
  },

  create<I extends Exact<DeepPartial<Class>, I>>(base?: I): Class {
    return Class.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Class>, I>>(object: I): Class {
    const message = createBaseClass();
    message.id = object.id ?? "";
    message.issuer = object.issuer ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    message.features = object.features?.map((e) => e) || [];
    message.royaltyRate = object.royaltyRate ?? "";
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
