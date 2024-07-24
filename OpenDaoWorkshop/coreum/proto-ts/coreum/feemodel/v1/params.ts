/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "coreum.feemodel.v1";

/**
 * ModelParams define fee model params.
 * There are four regions on the fee model curve
 * - between 0 and "long average block gas" where gas price goes down exponentially from InitialGasPrice to gas price with maximum discount (InitialGasPrice * (1 - MaxDiscount))
 * - between "long average block gas" and EscalationStartBlockGas (EscalationStartBlockGas = MaxBlockGas * EscalationStartFraction) where we offer gas price with maximum discount all the time
 * - between EscalationStartBlockGas (EscalationStartBlockGas = MaxBlockGas * EscalationStartFraction) and MaxBlockGas where price goes up rapidly (being an output of a power function) from gas price with maximum discount to MaxGasPrice  (MaxGasPrice = InitialGasPrice * MaxGasMultiplier)
 * - above MaxBlockGas (if it happens for any reason) where price is equal to MaxGasPrice (MaxGasPrice = InitialGasPrice * MaxGasMultiplier)
 *
 * The input (x value) for that function is calculated by taking short block gas average.
 * Price (y value) being an output of the fee model is used as the minimum gas price for next block.
 */
export interface ModelParams {
  /** initial_gas_price is used when block gas short average is 0. It happens when there are no transactions being broadcasted. This value is also used to initialize gas price on brand-new chain. */
  initialGasPrice: string;
  /** max_gas_price_multiplier is used to compute max_gas_price (max_gas_price = initial_gas_price * max_gas_price_multiplier). Max gas price is charged when block gas short average is greater than or equal to MaxBlockGas. This value is used to limit gas price escalation to avoid having possible infinity GasPrice value otherwise. */
  maxGasPriceMultiplier: string;
  /** max_discount is th maximum discount we offer on top of initial gas price if short average block gas is between long average block gas and escalation start block gas. */
  maxDiscount: string;
  /** escalation_start_fraction defines fraction of max block gas usage where gas price escalation starts if short average block gas is higher than this value. */
  escalationStartFraction: string;
  /** max_block_gas sets the maximum capacity of block. This is enforced on tendermint level in genesis configuration. Once short average block gas goes above this value, gas price is a flat line equal to MaxGasPrice. */
  maxBlockGas: Long;
  /**
   * short_ema_block_length defines inertia for short average long gas in EMA model. The equation is: NewAverage = ((ShortAverageBlockLength - 1)*PreviousAverage + GasUsedByCurrentBlock) / ShortAverageBlockLength
   * The value might be interpreted as the number of blocks which are taken to calculate the average. It would be exactly like that in SMA model, in EMA this is an approximation.
   */
  shortEmaBlockLength: number;
  /**
   * long_ema_block_length defines inertia for long average block gas in EMA model. The equation is: NewAverage = ((LongAverageBlockLength - 1)*PreviousAverage + GasUsedByCurrentBlock) / LongAverageBlockLength
   * The value might be interpreted as the number of blocks which are taken to calculate the average. It would be exactly like that in SMA model, in EMA this is an approximation.
   */
  longEmaBlockLength: number;
}

/** Params store gov manageable feemodel parameters. */
export interface Params {
  /** model is a fee model params. */
  model?: ModelParams;
}

function createBaseModelParams(): ModelParams {
  return {
    initialGasPrice: "",
    maxGasPriceMultiplier: "",
    maxDiscount: "",
    escalationStartFraction: "",
    maxBlockGas: Long.ZERO,
    shortEmaBlockLength: 0,
    longEmaBlockLength: 0,
  };
}

export const ModelParams = {
  encode(message: ModelParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.initialGasPrice !== "") {
      writer.uint32(10).string(message.initialGasPrice);
    }
    if (message.maxGasPriceMultiplier !== "") {
      writer.uint32(18).string(message.maxGasPriceMultiplier);
    }
    if (message.maxDiscount !== "") {
      writer.uint32(26).string(message.maxDiscount);
    }
    if (message.escalationStartFraction !== "") {
      writer.uint32(34).string(message.escalationStartFraction);
    }
    if (!message.maxBlockGas.isZero()) {
      writer.uint32(40).int64(message.maxBlockGas);
    }
    if (message.shortEmaBlockLength !== 0) {
      writer.uint32(48).uint32(message.shortEmaBlockLength);
    }
    if (message.longEmaBlockLength !== 0) {
      writer.uint32(56).uint32(message.longEmaBlockLength);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.initialGasPrice = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.maxGasPriceMultiplier = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.maxDiscount = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.escalationStartFraction = reader.string();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.maxBlockGas = reader.int64() as Long;
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.shortEmaBlockLength = reader.uint32();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.longEmaBlockLength = reader.uint32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelParams {
    return {
      initialGasPrice: isSet(object.initialGasPrice) ? String(object.initialGasPrice) : "",
      maxGasPriceMultiplier: isSet(object.maxGasPriceMultiplier) ? String(object.maxGasPriceMultiplier) : "",
      maxDiscount: isSet(object.maxDiscount) ? String(object.maxDiscount) : "",
      escalationStartFraction: isSet(object.escalationStartFraction) ? String(object.escalationStartFraction) : "",
      maxBlockGas: isSet(object.maxBlockGas) ? Long.fromValue(object.maxBlockGas) : Long.ZERO,
      shortEmaBlockLength: isSet(object.shortEmaBlockLength) ? Number(object.shortEmaBlockLength) : 0,
      longEmaBlockLength: isSet(object.longEmaBlockLength) ? Number(object.longEmaBlockLength) : 0,
    };
  },

  toJSON(message: ModelParams): unknown {
    const obj: any = {};
    message.initialGasPrice !== undefined && (obj.initialGasPrice = message.initialGasPrice);
    message.maxGasPriceMultiplier !== undefined && (obj.maxGasPriceMultiplier = message.maxGasPriceMultiplier);
    message.maxDiscount !== undefined && (obj.maxDiscount = message.maxDiscount);
    message.escalationStartFraction !== undefined && (obj.escalationStartFraction = message.escalationStartFraction);
    message.maxBlockGas !== undefined && (obj.maxBlockGas = (message.maxBlockGas || Long.ZERO).toString());
    message.shortEmaBlockLength !== undefined && (obj.shortEmaBlockLength = Math.round(message.shortEmaBlockLength));
    message.longEmaBlockLength !== undefined && (obj.longEmaBlockLength = Math.round(message.longEmaBlockLength));
    return obj;
  },

  create<I extends Exact<DeepPartial<ModelParams>, I>>(base?: I): ModelParams {
    return ModelParams.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ModelParams>, I>>(object: I): ModelParams {
    const message = createBaseModelParams();
    message.initialGasPrice = object.initialGasPrice ?? "";
    message.maxGasPriceMultiplier = object.maxGasPriceMultiplier ?? "";
    message.maxDiscount = object.maxDiscount ?? "";
    message.escalationStartFraction = object.escalationStartFraction ?? "";
    message.maxBlockGas = (object.maxBlockGas !== undefined && object.maxBlockGas !== null)
      ? Long.fromValue(object.maxBlockGas)
      : Long.ZERO;
    message.shortEmaBlockLength = object.shortEmaBlockLength ?? 0;
    message.longEmaBlockLength = object.longEmaBlockLength ?? 0;
    return message;
  },
};

function createBaseParams(): Params {
  return { model: undefined };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.model !== undefined) {
      ModelParams.encode(message.model, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.model = ModelParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return { model: isSet(object.model) ? ModelParams.fromJSON(object.model) : undefined };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.model !== undefined && (obj.model = message.model ? ModelParams.toJSON(message.model) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.model = (object.model !== undefined && object.model !== null)
      ? ModelParams.fromPartial(object.model)
      : undefined;
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
