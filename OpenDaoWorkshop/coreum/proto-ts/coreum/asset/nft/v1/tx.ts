/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { ClassFeature, classFeatureFromJSON, classFeatureToJSON } from "./nft";

export const protobufPackage = "coreum.asset.nft.v1";

/** MsgIssueClass defines message for the IssueClass method. */
export interface MsgIssueClass {
  issuer: string;
  symbol: string;
  name: string;
  description: string;
  uri: string;
  uriHash: string;
  data?: Any;
  features: ClassFeature[];
  royaltyRate: string;
}

/** MsgMint defines message for the Mint method. */
export interface MsgMint {
  sender: string;
  classId: string;
  id: string;
  uri: string;
  uriHash: string;
  data?: Any;
}

/** MsgBurn defines message for the Burn method. */
export interface MsgBurn {
  sender: string;
  classId: string;
  id: string;
}

export interface MsgFreeze {
  sender: string;
  classId: string;
  id: string;
}

export interface MsgUnfreeze {
  sender: string;
  classId: string;
  id: string;
}

export interface MsgAddToWhitelist {
  sender: string;
  classId: string;
  id: string;
  account: string;
}

export interface MsgRemoveFromWhitelist {
  sender: string;
  classId: string;
  id: string;
  account: string;
}

export interface EmptyResponse {
}

function createBaseMsgIssueClass(): MsgIssueClass {
  return {
    issuer: "",
    symbol: "",
    name: "",
    description: "",
    uri: "",
    uriHash: "",
    data: undefined,
    features: [],
    royaltyRate: "",
  };
}

export const MsgIssueClass = {
  encode(message: MsgIssueClass, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(50).string(message.uriHash);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(58).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueClass {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.symbol = reader.string();
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

          message.description = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.uriHash = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
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

  fromJSON(object: any): MsgIssueClass {
    return {
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
      features: Array.isArray(object?.features) ? object.features.map((e: any) => classFeatureFromJSON(e)) : [],
      royaltyRate: isSet(object.royaltyRate) ? String(object.royaltyRate) : "",
    };
  },

  toJSON(message: MsgIssueClass): unknown {
    const obj: any = {};
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.name !== undefined && (obj.name = message.name);
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

  create<I extends Exact<DeepPartial<MsgIssueClass>, I>>(base?: I): MsgIssueClass {
    return MsgIssueClass.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueClass>, I>>(object: I): MsgIssueClass {
    const message = createBaseMsgIssueClass();
    message.issuer = object.issuer ?? "";
    message.symbol = object.symbol ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    message.features = object.features?.map((e) => e) || [];
    message.royaltyRate = object.royaltyRate ?? "";
    return message;
  },
};

function createBaseMsgMint(): MsgMint {
  return { sender: "", classId: "", id: "", uri: "", uriHash: "", data: undefined };
}

export const MsgMint = {
  encode(message: MsgMint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.uri !== "") {
      writer.uint32(34).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(42).string(message.uriHash);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sender = reader.string();
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

          message.id = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.uriHash = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMint {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: MsgMint): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.uri !== undefined && (obj.uri = message.uri);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    message.data !== undefined && (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMint>, I>>(base?: I): MsgMint {
    return MsgMint.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgMint>, I>>(object: I): MsgMint {
    const message = createBaseMsgMint();
    message.sender = object.sender ?? "";
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    return message;
  },
};

function createBaseMsgBurn(): MsgBurn {
  return { sender: "", classId: "", id: "" };
}

export const MsgBurn = {
  encode(message: MsgBurn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sender = reader.string();
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

  fromJSON(object: any): MsgBurn {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgBurn): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurn>, I>>(base?: I): MsgBurn {
    return MsgBurn.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurn>, I>>(object: I): MsgBurn {
    const message = createBaseMsgBurn();
    message.sender = object.sender ?? "";
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgFreeze(): MsgFreeze {
  return { sender: "", classId: "", id: "" };
}

export const MsgFreeze = {
  encode(message: MsgFreeze, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFreeze {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFreeze();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sender = reader.string();
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

  fromJSON(object: any): MsgFreeze {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgFreeze): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFreeze>, I>>(base?: I): MsgFreeze {
    return MsgFreeze.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgFreeze>, I>>(object: I): MsgFreeze {
    const message = createBaseMsgFreeze();
    message.sender = object.sender ?? "";
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgUnfreeze(): MsgUnfreeze {
  return { sender: "", classId: "", id: "" };
}

export const MsgUnfreeze = {
  encode(message: MsgUnfreeze, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnfreeze {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnfreeze();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sender = reader.string();
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

  fromJSON(object: any): MsgUnfreeze {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgUnfreeze): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnfreeze>, I>>(base?: I): MsgUnfreeze {
    return MsgUnfreeze.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnfreeze>, I>>(object: I): MsgUnfreeze {
    const message = createBaseMsgUnfreeze();
    message.sender = object.sender ?? "";
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgAddToWhitelist(): MsgAddToWhitelist {
  return { sender: "", classId: "", id: "", account: "" };
}

export const MsgAddToWhitelist = {
  encode(message: MsgAddToWhitelist, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.account !== "") {
      writer.uint32(34).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToWhitelist {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToWhitelist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sender = reader.string();
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

          message.id = reader.string();
          continue;
        case 4:
          if (tag != 34) {
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

  fromJSON(object: any): MsgAddToWhitelist {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: MsgAddToWhitelist): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToWhitelist>, I>>(base?: I): MsgAddToWhitelist {
    return MsgAddToWhitelist.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddToWhitelist>, I>>(object: I): MsgAddToWhitelist {
    const message = createBaseMsgAddToWhitelist();
    message.sender = object.sender ?? "";
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseMsgRemoveFromWhitelist(): MsgRemoveFromWhitelist {
  return { sender: "", classId: "", id: "", account: "" };
}

export const MsgRemoveFromWhitelist = {
  encode(message: MsgRemoveFromWhitelist, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.account !== "") {
      writer.uint32(34).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveFromWhitelist {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveFromWhitelist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sender = reader.string();
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

          message.id = reader.string();
          continue;
        case 4:
          if (tag != 34) {
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

  fromJSON(object: any): MsgRemoveFromWhitelist {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      classId: isSet(object.classId) ? String(object.classId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: MsgRemoveFromWhitelist): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.classId !== undefined && (obj.classId = message.classId);
    message.id !== undefined && (obj.id = message.id);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveFromWhitelist>, I>>(base?: I): MsgRemoveFromWhitelist {
    return MsgRemoveFromWhitelist.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveFromWhitelist>, I>>(object: I): MsgRemoveFromWhitelist {
    const message = createBaseMsgRemoveFromWhitelist();
    message.sender = object.sender ?? "";
    message.classId = object.classId ?? "";
    message.id = object.id ?? "";
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseEmptyResponse(): EmptyResponse {
  return {};
}

export const EmptyResponse = {
  encode(_: EmptyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyResponse();
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

  fromJSON(_: any): EmptyResponse {
    return {};
  },

  toJSON(_: EmptyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<EmptyResponse>, I>>(base?: I): EmptyResponse {
    return EmptyResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EmptyResponse>, I>>(_: I): EmptyResponse {
    const message = createBaseEmptyResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** IssueClass creates new non-fungible token class. */
  IssueClass(request: MsgIssueClass): Promise<EmptyResponse>;
  /** Mint mints new non-fungible token in the class. */
  Mint(request: MsgMint): Promise<EmptyResponse>;
  /** Burn burns the existing non-fungible token in the class. */
  Burn(request: MsgBurn): Promise<EmptyResponse>;
  /** Freeze freezes an NFT */
  Freeze(request: MsgFreeze): Promise<EmptyResponse>;
  /** Unfreeze removes the freeze effect already put on an NFT */
  Unfreeze(request: MsgUnfreeze): Promise<EmptyResponse>;
  /** AddToWhitelist sets the account as whitelisted to hold the NFT */
  AddToWhitelist(request: MsgAddToWhitelist): Promise<EmptyResponse>;
  /** RemoveFromWhitelist removes an account from whitelisted list of the NFT */
  RemoveFromWhitelist(request: MsgRemoveFromWhitelist): Promise<EmptyResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "coreum.asset.nft.v1.Msg";
    this.rpc = rpc;
    this.IssueClass = this.IssueClass.bind(this);
    this.Mint = this.Mint.bind(this);
    this.Burn = this.Burn.bind(this);
    this.Freeze = this.Freeze.bind(this);
    this.Unfreeze = this.Unfreeze.bind(this);
    this.AddToWhitelist = this.AddToWhitelist.bind(this);
    this.RemoveFromWhitelist = this.RemoveFromWhitelist.bind(this);
  }
  IssueClass(request: MsgIssueClass): Promise<EmptyResponse> {
    const data = MsgIssueClass.encode(request).finish();
    const promise = this.rpc.request(this.service, "IssueClass", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  Mint(request: MsgMint): Promise<EmptyResponse> {
    const data = MsgMint.encode(request).finish();
    const promise = this.rpc.request(this.service, "Mint", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  Burn(request: MsgBurn): Promise<EmptyResponse> {
    const data = MsgBurn.encode(request).finish();
    const promise = this.rpc.request(this.service, "Burn", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  Freeze(request: MsgFreeze): Promise<EmptyResponse> {
    const data = MsgFreeze.encode(request).finish();
    const promise = this.rpc.request(this.service, "Freeze", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  Unfreeze(request: MsgUnfreeze): Promise<EmptyResponse> {
    const data = MsgUnfreeze.encode(request).finish();
    const promise = this.rpc.request(this.service, "Unfreeze", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  AddToWhitelist(request: MsgAddToWhitelist): Promise<EmptyResponse> {
    const data = MsgAddToWhitelist.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddToWhitelist", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  RemoveFromWhitelist(request: MsgRemoveFromWhitelist): Promise<EmptyResponse> {
    const data = MsgRemoveFromWhitelist.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveFromWhitelist", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
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
