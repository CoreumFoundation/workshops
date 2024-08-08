/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { CompactBitArray } from "../../../crypto/multisig/v1beta1/multisig";
export const protobufPackage = "cosmos.tx.signing.v1beta1";
/**
 * SignMode represents a signing mode with its own security guarantees.
 *
 * This enum should be considered a registry of all known sign modes
 * in the Cosmos ecosystem. Apps are not expected to support all known
 * sign modes. Apps that would like to support custom  sign modes are
 * encouraged to open a small PR against this file to add a new case
 * to this SignMode enum describing their sign mode so that different
 * apps have a consistent version of this enum.
 */
export var SignMode;
(function (SignMode) {
    /**
     * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     * rejected.
     */
    SignMode[SignMode["SIGN_MODE_UNSPECIFIED"] = 0] = "SIGN_MODE_UNSPECIFIED";
    /**
     * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     * verified with raw bytes from Tx.
     */
    SignMode[SignMode["SIGN_MODE_DIRECT"] = 1] = "SIGN_MODE_DIRECT";
    /**
     * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     * human-readable textual representation on top of the binary representation
     * from SIGN_MODE_DIRECT. It is currently experimental, and should be used
     * for testing purposes only, until Textual is fully released. Please follow
     * the tracking issue https://github.com/cosmos/cosmos-sdk/issues/11970.
     */
    SignMode[SignMode["SIGN_MODE_TEXTUAL"] = 2] = "SIGN_MODE_TEXTUAL";
    /**
     * SIGN_MODE_DIRECT_AUX - SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
     * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
     * require signers signing over other signers' `signer_info`. It also allows
     * for adding Tips in transactions.
     *
     * Since: cosmos-sdk 0.46
     */
    SignMode[SignMode["SIGN_MODE_DIRECT_AUX"] = 3] = "SIGN_MODE_DIRECT_AUX";
    /**
     * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     * Amino JSON and will be removed in the future.
     */
    SignMode[SignMode["SIGN_MODE_LEGACY_AMINO_JSON"] = 127] = "SIGN_MODE_LEGACY_AMINO_JSON";
    /**
     * SIGN_MODE_EIP_191 - SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
     * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
     *
     * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
     * but is not implemented on the SDK by default. To enable EIP-191, you need
     * to pass a custom `TxConfig` that has an implementation of
     * `SignModeHandler` for EIP-191. The SDK may decide to fully support
     * EIP-191 in the future.
     *
     * Since: cosmos-sdk 0.45.2
     */
    SignMode[SignMode["SIGN_MODE_EIP_191"] = 191] = "SIGN_MODE_EIP_191";
    SignMode[SignMode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SignMode || (SignMode = {}));
export function signModeFromJSON(object) {
    switch (object) {
        case 0:
        case "SIGN_MODE_UNSPECIFIED":
            return SignMode.SIGN_MODE_UNSPECIFIED;
        case 1:
        case "SIGN_MODE_DIRECT":
            return SignMode.SIGN_MODE_DIRECT;
        case 2:
        case "SIGN_MODE_TEXTUAL":
            return SignMode.SIGN_MODE_TEXTUAL;
        case 3:
        case "SIGN_MODE_DIRECT_AUX":
            return SignMode.SIGN_MODE_DIRECT_AUX;
        case 127:
        case "SIGN_MODE_LEGACY_AMINO_JSON":
            return SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        case 191:
        case "SIGN_MODE_EIP_191":
            return SignMode.SIGN_MODE_EIP_191;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SignMode.UNRECOGNIZED;
    }
}
export function signModeToJSON(object) {
    switch (object) {
        case SignMode.SIGN_MODE_UNSPECIFIED:
            return "SIGN_MODE_UNSPECIFIED";
        case SignMode.SIGN_MODE_DIRECT:
            return "SIGN_MODE_DIRECT";
        case SignMode.SIGN_MODE_TEXTUAL:
            return "SIGN_MODE_TEXTUAL";
        case SignMode.SIGN_MODE_DIRECT_AUX:
            return "SIGN_MODE_DIRECT_AUX";
        case SignMode.SIGN_MODE_LEGACY_AMINO_JSON:
            return "SIGN_MODE_LEGACY_AMINO_JSON";
        case SignMode.SIGN_MODE_EIP_191:
            return "SIGN_MODE_EIP_191";
        case SignMode.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseSignatureDescriptors() {
    return { signatures: [] };
}
export const SignatureDescriptors = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.signatures) {
            SignatureDescriptor.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptors();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signatures.push(SignatureDescriptor.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            signatures: Array.isArray(object?.signatures)
                ? object.signatures.map((e) => SignatureDescriptor.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => e ? SignatureDescriptor.toJSON(e) : undefined);
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptors.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptors();
        message.signatures =
            object.signatures?.map((e) => SignatureDescriptor.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSignatureDescriptor() {
    return { publicKey: undefined, data: undefined, sequence: 0 };
}
export const SignatureDescriptor = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.publicKey !== undefined) {
            Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.data !== undefined) {
            SignatureDescriptor_Data.encode(message.data, writer.uint32(18).fork()).ldelim();
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.publicKey = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = SignatureDescriptor_Data.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            publicKey: isSet(object.publicKey)
                ? Any.fromJSON(object.publicKey)
                : undefined,
            data: isSet(object.data)
                ? SignatureDescriptor_Data.fromJSON(object.data)
                : undefined,
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.publicKey !== undefined &&
            (obj.publicKey = message.publicKey
                ? Any.toJSON(message.publicKey)
                : undefined);
        message.data !== undefined &&
            (obj.data = message.data
                ? SignatureDescriptor_Data.toJSON(message.data)
                : undefined);
        message.sequence !== undefined &&
            (obj.sequence = Math.round(message.sequence));
        return obj;
    },
    create(base) {
        return SignatureDescriptor.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor();
        message.publicKey =
            object.publicKey !== undefined && object.publicKey !== null
                ? Any.fromPartial(object.publicKey)
                : undefined;
        message.data =
            object.data !== undefined && object.data !== null
                ? SignatureDescriptor_Data.fromPartial(object.data)
                : undefined;
        message.sequence = object.sequence ?? 0;
        return message;
    },
};
function createBaseSignatureDescriptor_Data() {
    return { single: undefined, multi: undefined };
}
export const SignatureDescriptor_Data = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.single !== undefined) {
            SignatureDescriptor_Data_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            SignatureDescriptor_Data_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor_Data();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.single = SignatureDescriptor_Data_Single.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.multi = SignatureDescriptor_Data_Multi.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            single: isSet(object.single)
                ? SignatureDescriptor_Data_Single.fromJSON(object.single)
                : undefined,
            multi: isSet(object.multi)
                ? SignatureDescriptor_Data_Multi.fromJSON(object.multi)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.single !== undefined &&
            (obj.single = message.single
                ? SignatureDescriptor_Data_Single.toJSON(message.single)
                : undefined);
        message.multi !== undefined &&
            (obj.multi = message.multi
                ? SignatureDescriptor_Data_Multi.toJSON(message.multi)
                : undefined);
        return obj;
    },
    create(base) {
        return SignatureDescriptor_Data.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor_Data();
        message.single =
            object.single !== undefined && object.single !== null
                ? SignatureDescriptor_Data_Single.fromPartial(object.single)
                : undefined;
        message.multi =
            object.multi !== undefined && object.multi !== null
                ? SignatureDescriptor_Data_Multi.fromPartial(object.multi)
                : undefined;
        return message;
    },
};
function createBaseSignatureDescriptor_Data_Single() {
    return { mode: 0, signature: new Uint8Array() };
}
export const SignatureDescriptor_Data_Single = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        if (message.signature.length !== 0) {
            writer.uint32(18).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor_Data_Single();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.mode = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.signature = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0,
            signature: isSet(object.signature)
                ? bytesFromBase64(object.signature)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
        message.signature !== undefined &&
            (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
        return obj;
    },
    create(base) {
        return SignatureDescriptor_Data_Single.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor_Data_Single();
        message.mode = object.mode ?? 0;
        message.signature = object.signature ?? new Uint8Array();
        return message;
    },
};
function createBaseSignatureDescriptor_Data_Multi() {
    return { bitarray: undefined, signatures: [] };
}
export const SignatureDescriptor_Data_Multi = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bitarray !== undefined) {
            CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.signatures) {
            SignatureDescriptor_Data.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor_Data_Multi();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bitarray = CompactBitArray.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.signatures.push(SignatureDescriptor_Data.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            bitarray: isSet(object.bitarray)
                ? CompactBitArray.fromJSON(object.bitarray)
                : undefined,
            signatures: Array.isArray(object?.signatures)
                ? object.signatures.map((e) => SignatureDescriptor_Data.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.bitarray !== undefined &&
            (obj.bitarray = message.bitarray
                ? CompactBitArray.toJSON(message.bitarray)
                : undefined);
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => e ? SignatureDescriptor_Data.toJSON(e) : undefined);
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptor_Data_Multi.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor_Data_Multi();
        message.bitarray =
            object.bitarray !== undefined && object.bitarray !== null
                ? CompactBitArray.fromPartial(object.bitarray)
                : undefined;
        message.signatures =
            object.signatures?.map((e) => SignatureDescriptor_Data.fromPartial(e)) ||
                [];
        return message;
    },
};
var tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3Ntb3MvdHgvc2lnbmluZy92MWJldGExL3NpZ25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTVFLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRywyQkFBMkIsQ0FBQztBQUUzRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLENBQU4sSUFBWSxRQStDWDtBQS9DRCxXQUFZLFFBQVE7SUFDbEI7OztPQUdHO0lBQ0gseUVBQXlCLENBQUE7SUFDekI7OztPQUdHO0lBQ0gsK0RBQW9CLENBQUE7SUFDcEI7Ozs7OztPQU1HO0lBQ0gsaUVBQXFCLENBQUE7SUFDckI7Ozs7Ozs7T0FPRztJQUNILHVFQUF3QixDQUFBO0lBQ3hCOzs7T0FHRztJQUNILHVGQUFpQyxDQUFBO0lBQ2pDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsbUVBQXVCLENBQUE7SUFDdkIsd0RBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQS9DVyxRQUFRLEtBQVIsUUFBUSxRQStDbkI7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBVztJQUMxQyxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssQ0FBQyxDQUFDO1FBQ1AsS0FBSyx1QkFBdUI7WUFDMUIsT0FBTyxRQUFRLENBQUMscUJBQXFCLENBQUM7UUFDeEMsS0FBSyxDQUFDLENBQUM7UUFDUCxLQUFLLGtCQUFrQjtZQUNyQixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuQyxLQUFLLENBQUMsQ0FBQztRQUNQLEtBQUssbUJBQW1CO1lBQ3RCLE9BQU8sUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ3BDLEtBQUssQ0FBQyxDQUFDO1FBQ1AsS0FBSyxzQkFBc0I7WUFDekIsT0FBTyxRQUFRLENBQUMsb0JBQW9CLENBQUM7UUFDdkMsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLDZCQUE2QjtZQUNoQyxPQUFPLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQztRQUM5QyxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssbUJBQW1CO1lBQ3RCLE9BQU8sUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ3BDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDUixLQUFLLGNBQWMsQ0FBQztRQUNwQjtZQUNFLE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FBQztLQUNoQztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWdCO0lBQzdDLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxRQUFRLENBQUMscUJBQXFCO1lBQ2pDLE9BQU8sdUJBQXVCLENBQUM7UUFDakMsS0FBSyxRQUFRLENBQUMsZ0JBQWdCO1lBQzVCLE9BQU8sa0JBQWtCLENBQUM7UUFDNUIsS0FBSyxRQUFRLENBQUMsaUJBQWlCO1lBQzdCLE9BQU8sbUJBQW1CLENBQUM7UUFDN0IsS0FBSyxRQUFRLENBQUMsb0JBQW9CO1lBQ2hDLE9BQU8sc0JBQXNCLENBQUM7UUFDaEMsS0FBSyxRQUFRLENBQUMsMkJBQTJCO1lBQ3ZDLE9BQU8sNkJBQTZCLENBQUM7UUFDdkMsS0FBSyxRQUFRLENBQUMsaUJBQWlCO1lBQzdCLE9BQU8sbUJBQW1CLENBQUM7UUFDN0IsS0FBSyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQzNCO1lBQ0UsT0FBTyxjQUFjLENBQUM7S0FDekI7QUFDSCxDQUFDO0FBa0RELFNBQVMsOEJBQThCO0lBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHO0lBQ2xDLE1BQU0sQ0FDSixPQUE2QixFQUM3QixTQUFxQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUV4QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDbEMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkU7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUNKLEtBQThCLEVBQzlCLE1BQWU7UUFFZixNQUFNLE1BQU0sR0FDVixLQUFLLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFJLEdBQUcsR0FBRyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNsRSxNQUFNLE9BQU8sR0FBRyw4QkFBOEIsRUFBRSxDQUFDO1FBQ2pELE9BQU8sTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDdkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVCLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDakIsS0FBSyxDQUFDO29CQUNKLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTt3QkFDZCxNQUFNO3FCQUNQO29CQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNyQixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUNwRCxDQUFDO29CQUNGLFNBQVM7YUFDWjtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLE1BQU07YUFDUDtZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFXO1FBQ2xCLE9BQU87WUFDTCxVQUFVLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLEVBQUU7U0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUE2QjtRQUNsQyxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUM5QyxDQUFDO1NBQ0g7YUFBTTtZQUNMLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUNKLElBQVE7UUFFUixPQUFPLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVcsQ0FDVCxNQUFTO1FBRVQsTUFBTSxPQUFPLEdBQUcsOEJBQThCLEVBQUUsQ0FBQztRQUNqRCxPQUFPLENBQUMsVUFBVTtZQUNoQixNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFFLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRixDQUFDO0FBRUYsU0FBUyw2QkFBNkI7SUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDaEUsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2pDLE1BQU0sQ0FDSixPQUE0QixFQUM1QixTQUFxQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUV4QyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEU7UUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzlCLHdCQUF3QixDQUFDLE1BQU0sQ0FDN0IsT0FBTyxDQUFDLElBQUksRUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUN6QixDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBOEIsRUFBRSxNQUFlO1FBQ3BELE1BQU0sTUFBTSxHQUNWLEtBQUssWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLElBQUksR0FBRyxHQUFHLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ2xFLE1BQU0sT0FBTyxHQUFHLDZCQUE2QixFQUFFLENBQUM7UUFDaEQsT0FBTyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUN2QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUIsUUFBUSxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixLQUFLLENBQUM7b0JBQ0osSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO3dCQUNkLE1BQU07cUJBQ1A7b0JBRUQsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDeEQsU0FBUztnQkFDWCxLQUFLLENBQUM7b0JBQ0osSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO3dCQUNkLE1BQU07cUJBQ1A7b0JBRUQsT0FBTyxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLENBQzVDLE1BQU0sRUFDTixNQUFNLENBQUMsTUFBTSxFQUFFLENBQ2hCLENBQUM7b0JBQ0YsU0FBUztnQkFDWCxLQUFLLENBQUM7b0JBQ0osSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO3dCQUNkLE1BQU07cUJBQ1A7b0JBRUQsT0FBTyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBVSxDQUFDLENBQUM7b0JBQ3pELFNBQVM7YUFDWjtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLE1BQU07YUFDUDtZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFXO1FBQ2xCLE9BQU87WUFDTCxTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxTQUFTO1lBQ2IsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN0QixDQUFDLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxTQUFTO1lBQ2IsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0QsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBNEI7UUFDakMsTUFBTSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUztZQUM3QixDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVM7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDeEIsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJO2dCQUN0QixDQUFDLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDNUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUNKLElBQVE7UUFFUixPQUFPLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVcsQ0FDVCxNQUFTO1FBRVQsTUFBTSxPQUFPLEdBQUcsNkJBQTZCLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsU0FBUztZQUNmLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSTtnQkFDekQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoQixPQUFPLENBQUMsSUFBSTtZQUNWLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSTtnQkFDL0MsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNuRCxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGLENBQUM7QUFFRixTQUFTLGtDQUFrQztJQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDakQsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHO0lBQ3RDLE1BQU0sQ0FDSixPQUFpQyxFQUNqQyxTQUFxQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUV4QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2hDLCtCQUErQixDQUFDLE1BQU0sQ0FDcEMsT0FBTyxDQUFDLE1BQU0sRUFDZCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUN6QixDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQy9CLDhCQUE4QixDQUFDLE1BQU0sQ0FDbkMsT0FBTyxDQUFDLEtBQUssRUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUN6QixDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ1o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUNKLEtBQThCLEVBQzlCLE1BQWU7UUFFZixNQUFNLE1BQU0sR0FDVixLQUFLLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFJLEdBQUcsR0FBRyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNsRSxNQUFNLE9BQU8sR0FBRyxrQ0FBa0MsRUFBRSxDQUFDO1FBQ3JELE9BQU8sTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDdkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVCLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDakIsS0FBSyxDQUFDO29CQUNKLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTt3QkFDZCxNQUFNO3FCQUNQO29CQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsK0JBQStCLENBQUMsTUFBTSxDQUNyRCxNQUFNLEVBQ04sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUNoQixDQUFDO29CQUNGLFNBQVM7Z0JBQ1gsS0FBSyxDQUFDO29CQUNKLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTt3QkFDZCxNQUFNO3FCQUNQO29CQUVELE9BQU8sQ0FBQyxLQUFLLEdBQUcsOEJBQThCLENBQUMsTUFBTSxDQUNuRCxNQUFNLEVBQ04sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUNoQixDQUFDO29CQUNGLFNBQVM7YUFDWjtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLE1BQU07YUFDUDtZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFXO1FBQ2xCLE9BQU87WUFDTCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDekQsQ0FBQyxDQUFDLFNBQVM7WUFDYixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLFNBQVM7U0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFpQztRQUN0QyxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQzFCLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTTtnQkFDMUIsQ0FBQyxDQUFDLCtCQUErQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUN4RCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakIsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ3pCLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSztnQkFDeEIsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUNKLElBQVE7UUFFUixPQUFPLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELFdBQVcsQ0FDVCxNQUFTO1FBRVQsTUFBTSxPQUFPLEdBQUcsa0NBQWtDLEVBQUUsQ0FBQztRQUNyRCxPQUFPLENBQUMsTUFBTTtZQUNaLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSTtnQkFDbkQsQ0FBQyxDQUFDLCtCQUErQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUM1RCxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLO1lBQ1gsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUNqRCxDQUFDLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGLENBQUM7QUFFRixTQUFTLHlDQUF5QztJQUNoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxVQUFVLEVBQUUsRUFBRSxDQUFDO0FBQ2xELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRztJQUM3QyxNQUFNLENBQ0osT0FBd0MsRUFDeEMsU0FBcUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFFeEMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUNKLEtBQThCLEVBQzlCLE1BQWU7UUFFZixNQUFNLE1BQU0sR0FDVixLQUFLLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFJLEdBQUcsR0FBRyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNsRSxNQUFNLE9BQU8sR0FBRyx5Q0FBeUMsRUFBRSxDQUFDO1FBQzVELE9BQU8sTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDdkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVCLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDakIsS0FBSyxDQUFDO29CQUNKLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTt3QkFDYixNQUFNO3FCQUNQO29CQUVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBUyxDQUFDO29CQUNyQyxTQUFTO2dCQUNYLEtBQUssQ0FBQztvQkFDSixJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7d0JBQ2QsTUFBTTtxQkFDUDtvQkFFRCxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDbkMsU0FBUzthQUNaO1lBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDaEMsTUFBTTthQUNQO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDbEIsT0FBTztZQUNMLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFBRTtTQUNyQixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUF3QztRQUM3QyxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDN0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FDOUIsT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUFFLENBQ3ZFLENBQUMsQ0FBQztRQUNMLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFRO1FBRVIsT0FBTywrQkFBK0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxXQUFXLENBQ1QsTUFBUztRQUVULE1BQU0sT0FBTyxHQUFHLHlDQUF5QyxFQUFFLENBQUM7UUFDNUQsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUN6RCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0YsQ0FBQztBQUVGLFNBQVMsd0NBQXdDO0lBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUc7SUFDNUMsTUFBTSxDQUNKLE9BQXVDLEVBQ3ZDLFNBQXFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBRXhDLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDbEMsZUFBZSxDQUFDLE1BQU0sQ0FDcEIsT0FBTyxDQUFDLFFBQVEsRUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDekIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNaO1FBQ0QsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ2xDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hFO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FDSixLQUE4QixFQUM5QixNQUFlO1FBRWYsTUFBTSxNQUFNLEdBQ1YsS0FBSyxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLEdBQUcsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbEUsTUFBTSxPQUFPLEdBQUcsd0NBQXdDLEVBQUUsQ0FBQztRQUMzRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QixRQUFRLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLEtBQUssQ0FBQztvQkFDSixJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7d0JBQ2QsTUFBTTtxQkFDUDtvQkFFRCxPQUFPLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUNuRSxTQUFTO2dCQUNYLEtBQUssQ0FBQztvQkFDSixJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7d0JBQ2QsTUFBTTtxQkFDUDtvQkFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDckIsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FDekQsQ0FBQztvQkFDRixTQUFTO2FBQ1o7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxNQUFNO2FBQ1A7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBVztRQUNsQixPQUFPO1lBQ0wsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUM5QixDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsU0FBUztZQUNiLFVBQVUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQy9CLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDckM7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUU7U0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUF1QztRQUM1QyxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQzVCLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUTtnQkFDOUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN0QixHQUFHLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDbkQsQ0FBQztTQUNIO2FBQU07WUFDTCxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFRO1FBRVIsT0FBTyw4QkFBOEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxXQUFXLENBQ1QsTUFBUztRQUVULE1BQU0sT0FBTyxHQUFHLHdDQUF3QyxFQUFFLENBQUM7UUFDM0QsT0FBTyxDQUFDLFFBQVE7WUFDZCxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUk7Z0JBQ3ZELENBQUMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTyxDQUFDLFVBQVU7WUFDaEIsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsRUFBRSxDQUFDO1FBQ0wsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGLENBQUM7QUFLRixJQUFJLGlCQUFpQixHQUFRLENBQUMsR0FBRyxFQUFFO0lBQ2pDLElBQUksT0FBTyxVQUFVLEtBQUssV0FBVyxFQUFFO1FBQ3JDLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7UUFDL0IsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6QyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsU0FBUyxlQUFlLENBQUMsR0FBVztJQUNsQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtRQUM1QixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUN0RTtTQUFNO1FBQ0wsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNuQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sR0FBRyxDQUFDO0tBQ1o7QUFDSCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBZTtJQUN0QyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtRQUM1QixPQUFPLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxNQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdDO0FBQ0gsQ0FBQztBQTRCRCxTQUFTLFlBQVksQ0FBQyxJQUFVO0lBQzlCLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNwQyxNQUFNLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUMvQiw4Q0FBOEMsQ0FDL0MsQ0FBQztLQUNIO0lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUVELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO0lBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQVcsQ0FBQztJQUM1QixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDakI7QUFFRCxTQUFTLEtBQUssQ0FBQyxLQUFVO0lBQ3ZCLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQy9DLENBQUMifQ==