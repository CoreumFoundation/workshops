/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Feature, featureFromJSON, featureToJSON } from "./token";

export const protobufPackage = "coreum.asset.ft.v1";

/** MsgIssue defines message to issue new fungible token. */
export interface MsgIssue {
  issuer: string;
  symbol: string;
  subunit: string;
  precision: number;
  initialAmount: string;
  description: string;
  features: Feature[];
  /**
   * burn_rate is a number between 0 and 1 which will be multiplied by send amount to determine
   * burn_amount. This value will be burnt on top of the send amount.
   */
  burnRate: string;
  /**
   * send_commission_rate is a number between 0 and 1 which will be multiplied by send amount to determine
   * amount sent to the token issuer account.
   */
  sendCommissionRate: string;
}

export interface MsgMint {
  sender: string;
  coin?: Coin;
}

export interface MsgBurn {
  sender: string;
  coin?: Coin;
}

export interface MsgFreeze {
  sender: string;
  account: string;
  coin?: Coin;
}

export interface MsgUnfreeze {
  sender: string;
  account: string;
  coin?: Coin;
}

export interface MsgGloballyFreeze {
  sender: string;
  denom: string;
}

export interface MsgGloballyUnfreeze {
  sender: string;
  denom: string;
}

export interface MsgSetWhitelistedLimit {
  sender: string;
  account: string;
  coin?: Coin;
}

export interface EmptyResponse {
}

function createBaseMsgIssue(): MsgIssue {
  return {
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

export const MsgIssue = {
  encode(message: MsgIssue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.subunit !== "") {
      writer.uint32(26).string(message.subunit);
    }
    if (message.precision !== 0) {
      writer.uint32(32).uint32(message.precision);
    }
    if (message.initialAmount !== "") {
      writer.uint32(42).string(message.initialAmount);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    writer.uint32(58).fork();
    for (const v of message.features) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.burnRate !== "") {
      writer.uint32(66).string(message.burnRate);
    }
    if (message.sendCommissionRate !== "") {
      writer.uint32(74).string(message.sendCommissionRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssue();
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

          message.subunit = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.precision = reader.uint32();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.initialAmount = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag == 56) {
            message.features.push(reader.int32() as any);
            continue;
          }

          if (tag == 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.features.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 8:
          if (tag != 66) {
            break;
          }

          message.burnRate = reader.string();
          continue;
        case 9:
          if (tag != 74) {
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

  fromJSON(object: any): MsgIssue {
    return {
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

  toJSON(message: MsgIssue): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<MsgIssue>, I>>(base?: I): MsgIssue {
    return MsgIssue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssue>, I>>(object: I): MsgIssue {
    const message = createBaseMsgIssue();
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

function createBaseMsgMint(): MsgMint {
  return { sender: "", coin: undefined };
}

export const MsgMint = {
  encode(message: MsgMint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
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

          message.coin = Coin.decode(reader, reader.uint32());
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
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
    };
  },

  toJSON(message: MsgMint): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMint>, I>>(base?: I): MsgMint {
    return MsgMint.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgMint>, I>>(object: I): MsgMint {
    const message = createBaseMsgMint();
    message.sender = object.sender ?? "";
    message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
};

function createBaseMsgBurn(): MsgBurn {
  return { sender: "", coin: undefined };
}

export const MsgBurn = {
  encode(message: MsgBurn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
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
        case 3:
          if (tag != 26) {
            break;
          }

          message.coin = Coin.decode(reader, reader.uint32());
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
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
    };
  },

  toJSON(message: MsgBurn): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurn>, I>>(base?: I): MsgBurn {
    return MsgBurn.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurn>, I>>(object: I): MsgBurn {
    const message = createBaseMsgBurn();
    message.sender = object.sender ?? "";
    message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
};

function createBaseMsgFreeze(): MsgFreeze {
  return { sender: "", account: "", coin: undefined };
}

export const MsgFreeze = {
  encode(message: MsgFreeze, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
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

          message.account = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.coin = Coin.decode(reader, reader.uint32());
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
      account: isSet(object.account) ? String(object.account) : "",
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
    };
  },

  toJSON(message: MsgFreeze): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.account !== undefined && (obj.account = message.account);
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFreeze>, I>>(base?: I): MsgFreeze {
    return MsgFreeze.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgFreeze>, I>>(object: I): MsgFreeze {
    const message = createBaseMsgFreeze();
    message.sender = object.sender ?? "";
    message.account = object.account ?? "";
    message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
};

function createBaseMsgUnfreeze(): MsgUnfreeze {
  return { sender: "", account: "", coin: undefined };
}

export const MsgUnfreeze = {
  encode(message: MsgUnfreeze, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
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

          message.account = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.coin = Coin.decode(reader, reader.uint32());
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
      account: isSet(object.account) ? String(object.account) : "",
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
    };
  },

  toJSON(message: MsgUnfreeze): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.account !== undefined && (obj.account = message.account);
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnfreeze>, I>>(base?: I): MsgUnfreeze {
    return MsgUnfreeze.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnfreeze>, I>>(object: I): MsgUnfreeze {
    const message = createBaseMsgUnfreeze();
    message.sender = object.sender ?? "";
    message.account = object.account ?? "";
    message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
};

function createBaseMsgGloballyFreeze(): MsgGloballyFreeze {
  return { sender: "", denom: "" };
}

export const MsgGloballyFreeze = {
  encode(message: MsgGloballyFreeze, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGloballyFreeze {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGloballyFreeze();
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

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgGloballyFreeze {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: MsgGloballyFreeze): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgGloballyFreeze>, I>>(base?: I): MsgGloballyFreeze {
    return MsgGloballyFreeze.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgGloballyFreeze>, I>>(object: I): MsgGloballyFreeze {
    const message = createBaseMsgGloballyFreeze();
    message.sender = object.sender ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseMsgGloballyUnfreeze(): MsgGloballyUnfreeze {
  return { sender: "", denom: "" };
}

export const MsgGloballyUnfreeze = {
  encode(message: MsgGloballyUnfreeze, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGloballyUnfreeze {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGloballyUnfreeze();
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

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgGloballyUnfreeze {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: MsgGloballyUnfreeze): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgGloballyUnfreeze>, I>>(base?: I): MsgGloballyUnfreeze {
    return MsgGloballyUnfreeze.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgGloballyUnfreeze>, I>>(object: I): MsgGloballyUnfreeze {
    const message = createBaseMsgGloballyUnfreeze();
    message.sender = object.sender ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseMsgSetWhitelistedLimit(): MsgSetWhitelistedLimit {
  return { sender: "", account: "", coin: undefined };
}

export const MsgSetWhitelistedLimit = {
  encode(message: MsgSetWhitelistedLimit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetWhitelistedLimit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetWhitelistedLimit();
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

          message.account = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.coin = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetWhitelistedLimit {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      account: isSet(object.account) ? String(object.account) : "",
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
    };
  },

  toJSON(message: MsgSetWhitelistedLimit): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.account !== undefined && (obj.account = message.account);
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetWhitelistedLimit>, I>>(base?: I): MsgSetWhitelistedLimit {
    return MsgSetWhitelistedLimit.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetWhitelistedLimit>, I>>(object: I): MsgSetWhitelistedLimit {
    const message = createBaseMsgSetWhitelistedLimit();
    message.sender = object.sender ?? "";
    message.account = object.account ?? "";
    message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
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
  /** Issue defines a method to issue a new fungible token. */
  Issue(request: MsgIssue): Promise<EmptyResponse>;
  /** Mint mints new fungible tokens. */
  Mint(request: MsgMint): Promise<EmptyResponse>;
  /** Burn burns the specified fungible tokens from senders balance if the sender has enough balance. */
  Burn(request: MsgBurn): Promise<EmptyResponse>;
  /**
   * Freeze freezes a part of the fungible tokens in an
   * account, only if the freezable feature is enabled on that token.
   */
  Freeze(request: MsgFreeze): Promise<EmptyResponse>;
  /**
   * Unfreeze unfreezes a part of the frozen fungible tokens in an
   * account, only if there are such frozen tokens on that account.
   */
  Unfreeze(request: MsgUnfreeze): Promise<EmptyResponse>;
  /**
   * GloballyFreeze freezes fungible token so no operations are allowed with it before unfrozen.
   * This operation is idempotent so global freeze of already frozen token does nothing.
   */
  GloballyFreeze(request: MsgGloballyFreeze): Promise<EmptyResponse>;
  /**
   * GloballyUnfreeze unfreezes fungible token and unblocks basic operations on it.
   * This operation is idempotent so global unfreezing of non-frozen token does nothing.
   */
  GloballyUnfreeze(request: MsgGloballyUnfreeze): Promise<EmptyResponse>;
  /** SetWhitelistedLimit sets the limit of how many tokens a specific account may hold. */
  SetWhitelistedLimit(request: MsgSetWhitelistedLimit): Promise<EmptyResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "coreum.asset.ft.v1.Msg";
    this.rpc = rpc;
    this.Issue = this.Issue.bind(this);
    this.Mint = this.Mint.bind(this);
    this.Burn = this.Burn.bind(this);
    this.Freeze = this.Freeze.bind(this);
    this.Unfreeze = this.Unfreeze.bind(this);
    this.GloballyFreeze = this.GloballyFreeze.bind(this);
    this.GloballyUnfreeze = this.GloballyUnfreeze.bind(this);
    this.SetWhitelistedLimit = this.SetWhitelistedLimit.bind(this);
  }
  Issue(request: MsgIssue): Promise<EmptyResponse> {
    const data = MsgIssue.encode(request).finish();
    const promise = this.rpc.request(this.service, "Issue", data);
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

  GloballyFreeze(request: MsgGloballyFreeze): Promise<EmptyResponse> {
    const data = MsgGloballyFreeze.encode(request).finish();
    const promise = this.rpc.request(this.service, "GloballyFreeze", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  GloballyUnfreeze(request: MsgGloballyUnfreeze): Promise<EmptyResponse> {
    const data = MsgGloballyUnfreeze.encode(request).finish();
    const promise = this.rpc.request(this.service, "GloballyUnfreeze", data);
    return promise.then((data) => EmptyResponse.decode(_m0.Reader.create(data)));
  }

  SetWhitelistedLimit(request: MsgSetWhitelistedLimit): Promise<EmptyResponse> {
    const data = MsgSetWhitelistedLimit.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetWhitelistedLimit", data);
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
