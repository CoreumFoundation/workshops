/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { AccessConfig, Params } from "./types";
export const protobufPackage = "cosmwasm.wasm.v1";
function createBaseMsgStoreCode() {
    return {
        sender: "",
        wasmByteCode: new Uint8Array(),
        instantiatePermission: undefined,
    };
}
export const MsgStoreCode = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.wasmByteCode.length !== 0) {
            writer.uint32(18).bytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            AccessConfig.encode(message.instantiatePermission, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreCode();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.wasmByteCode = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            wasmByteCode: isSet(object.wasmByteCode)
                ? bytesFromBase64(object.wasmByteCode)
                : new Uint8Array(),
            instantiatePermission: isSet(object.instantiatePermission)
                ? AccessConfig.fromJSON(object.instantiatePermission)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.wasmByteCode !== undefined &&
            (obj.wasmByteCode = base64FromBytes(message.wasmByteCode !== undefined
                ? message.wasmByteCode
                : new Uint8Array()));
        message.instantiatePermission !== undefined &&
            (obj.instantiatePermission = message.instantiatePermission
                ? AccessConfig.toJSON(message.instantiatePermission)
                : undefined);
        return obj;
    },
    create(base) {
        return MsgStoreCode.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreCode();
        message.sender = object.sender ?? "";
        message.wasmByteCode = object.wasmByteCode ?? new Uint8Array();
        message.instantiatePermission =
            object.instantiatePermission !== undefined &&
                object.instantiatePermission !== null
                ? AccessConfig.fromPartial(object.instantiatePermission)
                : undefined;
        return message;
    },
};
function createBaseMsgStoreCodeResponse() {
    return { codeId: 0, checksum: new Uint8Array() };
}
export const MsgStoreCodeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.codeId !== 0) {
            writer.uint32(8).uint64(message.codeId);
        }
        if (message.checksum.length !== 0) {
            writer.uint32(18).bytes(message.checksum);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreCodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.checksum = reader.bytes();
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
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            checksum: isSet(object.checksum)
                ? bytesFromBase64(object.checksum)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.codeId !== undefined && (obj.codeId = Math.round(message.codeId));
        message.checksum !== undefined &&
            (obj.checksum = base64FromBytes(message.checksum !== undefined ? message.checksum : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgStoreCodeResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreCodeResponse();
        message.codeId = object.codeId ?? 0;
        message.checksum = object.checksum ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgInstantiateContract() {
    return {
        sender: "",
        admin: "",
        codeId: 0,
        label: "",
        msg: new Uint8Array(),
        funds: [],
    };
}
export const MsgInstantiateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        if (message.codeId !== 0) {
            writer.uint32(24).uint64(message.codeId);
        }
        if (message.label !== "") {
            writer.uint32(34).string(message.label);
        }
        if (message.msg.length !== 0) {
            writer.uint32(42).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.label = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            admin: isSet(object.admin) ? String(object.admin) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            label: isSet(object.label) ? String(object.label) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
            funds: Array.isArray(object?.funds)
                ? object.funds.map((e) => Coin.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.admin !== undefined && (obj.admin = message.admin);
        message.codeId !== undefined && (obj.codeId = Math.round(message.codeId));
        message.label !== undefined && (obj.label = message.label);
        message.msg !== undefined &&
            (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
        if (message.funds) {
            obj.funds = message.funds.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.funds = [];
        }
        return obj;
    },
    create(base) {
        return MsgInstantiateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContract();
        message.sender = object.sender ?? "";
        message.admin = object.admin ?? "";
        message.codeId = object.codeId ?? 0;
        message.label = object.label ?? "";
        message.msg = object.msg ?? new Uint8Array();
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgInstantiateContractResponse() {
    return { address: "", data: new Uint8Array() };
}
export const MsgInstantiateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgInstantiateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContractResponse();
        message.address = object.address ?? "";
        message.data = object.data ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgInstantiateContract2() {
    return {
        sender: "",
        admin: "",
        codeId: 0,
        label: "",
        msg: new Uint8Array(),
        funds: [],
        salt: new Uint8Array(),
        fixMsg: false,
    };
}
export const MsgInstantiateContract2 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        if (message.codeId !== 0) {
            writer.uint32(24).uint64(message.codeId);
        }
        if (message.label !== "") {
            writer.uint32(34).string(message.label);
        }
        if (message.msg.length !== 0) {
            writer.uint32(42).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(50).fork()).ldelim();
        }
        if (message.salt.length !== 0) {
            writer.uint32(58).bytes(message.salt);
        }
        if (message.fixMsg === true) {
            writer.uint32(64).bool(message.fixMsg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContract2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.label = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.salt = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.fixMsg = reader.bool();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            admin: isSet(object.admin) ? String(object.admin) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            label: isSet(object.label) ? String(object.label) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
            funds: Array.isArray(object?.funds)
                ? object.funds.map((e) => Coin.fromJSON(e))
                : [],
            salt: isSet(object.salt)
                ? bytesFromBase64(object.salt)
                : new Uint8Array(),
            fixMsg: isSet(object.fixMsg) ? Boolean(object.fixMsg) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.admin !== undefined && (obj.admin = message.admin);
        message.codeId !== undefined && (obj.codeId = Math.round(message.codeId));
        message.label !== undefined && (obj.label = message.label);
        message.msg !== undefined &&
            (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
        if (message.funds) {
            obj.funds = message.funds.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.funds = [];
        }
        message.salt !== undefined &&
            (obj.salt = base64FromBytes(message.salt !== undefined ? message.salt : new Uint8Array()));
        message.fixMsg !== undefined && (obj.fixMsg = message.fixMsg);
        return obj;
    },
    create(base) {
        return MsgInstantiateContract2.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContract2();
        message.sender = object.sender ?? "";
        message.admin = object.admin ?? "";
        message.codeId = object.codeId ?? 0;
        message.label = object.label ?? "";
        message.msg = object.msg ?? new Uint8Array();
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        message.salt = object.salt ?? new Uint8Array();
        message.fixMsg = object.fixMsg ?? false;
        return message;
    },
};
function createBaseMsgInstantiateContract2Response() {
    return { address: "", data: new Uint8Array() };
}
export const MsgInstantiateContract2Response = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContract2Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgInstantiateContract2Response.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContract2Response();
        message.address = object.address ?? "";
        message.data = object.data ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgExecuteContract() {
    return { sender: "", contract: "", msg: new Uint8Array(), funds: [] };
}
export const MsgExecuteContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
        }
        if (message.msg.length !== 0) {
            writer.uint32(26).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecuteContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
            funds: Array.isArray(object?.funds)
                ? object.funds.map((e) => Coin.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.contract !== undefined && (obj.contract = message.contract);
        message.msg !== undefined &&
            (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
        if (message.funds) {
            obj.funds = message.funds.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.funds = [];
        }
        return obj;
    },
    create(base) {
        return MsgExecuteContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgExecuteContract();
        message.sender = object.sender ?? "";
        message.contract = object.contract ?? "";
        message.msg = object.msg ?? new Uint8Array();
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgExecuteContractResponse() {
    return { data: new Uint8Array() };
}
export const MsgExecuteContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecuteContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
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
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgExecuteContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgExecuteContractResponse();
        message.data = object.data ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgMigrateContract() {
    return { sender: "", contract: "", codeId: 0, msg: new Uint8Array() };
}
export const MsgMigrateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
        }
        if (message.codeId !== 0) {
            writer.uint32(24).uint64(message.codeId);
        }
        if (message.msg.length !== 0) {
            writer.uint32(34).bytes(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMigrateContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.msg = reader.bytes();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.contract !== undefined && (obj.contract = message.contract);
        message.codeId !== undefined && (obj.codeId = Math.round(message.codeId));
        message.msg !== undefined &&
            (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgMigrateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgMigrateContract();
        message.sender = object.sender ?? "";
        message.contract = object.contract ?? "";
        message.codeId = object.codeId ?? 0;
        message.msg = object.msg ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgMigrateContractResponse() {
    return { data: new Uint8Array() };
}
export const MsgMigrateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMigrateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
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
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgMigrateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgMigrateContractResponse();
        message.data = object.data ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgUpdateAdmin() {
    return { sender: "", newAdmin: "", contract: "" };
}
export const MsgUpdateAdmin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.newAdmin !== "") {
            writer.uint32(18).string(message.newAdmin);
        }
        if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateAdmin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.newAdmin = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contract = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.newAdmin !== undefined && (obj.newAdmin = message.newAdmin);
        message.contract !== undefined && (obj.contract = message.contract);
        return obj;
    },
    create(base) {
        return MsgUpdateAdmin.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateAdmin();
        message.sender = object.sender ?? "";
        message.newAdmin = object.newAdmin ?? "";
        message.contract = object.contract ?? "";
        return message;
    },
};
function createBaseMsgUpdateAdminResponse() {
    return {};
}
export const MsgUpdateAdminResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateAdminResponse();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateAdminResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateAdminResponse();
        return message;
    },
};
function createBaseMsgClearAdmin() {
    return { sender: "", contract: "" };
}
export const MsgClearAdmin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClearAdmin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contract = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.contract !== undefined && (obj.contract = message.contract);
        return obj;
    },
    create(base) {
        return MsgClearAdmin.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgClearAdmin();
        message.sender = object.sender ?? "";
        message.contract = object.contract ?? "";
        return message;
    },
};
function createBaseMsgClearAdminResponse() {
    return {};
}
export const MsgClearAdminResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClearAdminResponse();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgClearAdminResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgClearAdminResponse();
        return message;
    },
};
function createBaseMsgUpdateInstantiateConfig() {
    return { sender: "", codeId: 0, newInstantiatePermission: undefined };
}
export const MsgUpdateInstantiateConfig = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.codeId !== 0) {
            writer.uint32(16).uint64(message.codeId);
        }
        if (message.newInstantiatePermission !== undefined) {
            AccessConfig.encode(message.newInstantiatePermission, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateInstantiateConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.newInstantiatePermission = AccessConfig.decode(reader, reader.uint32());
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            newInstantiatePermission: isSet(object.newInstantiatePermission)
                ? AccessConfig.fromJSON(object.newInstantiatePermission)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.codeId !== undefined && (obj.codeId = Math.round(message.codeId));
        message.newInstantiatePermission !== undefined &&
            (obj.newInstantiatePermission = message.newInstantiatePermission
                ? AccessConfig.toJSON(message.newInstantiatePermission)
                : undefined);
        return obj;
    },
    create(base) {
        return MsgUpdateInstantiateConfig.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateInstantiateConfig();
        message.sender = object.sender ?? "";
        message.codeId = object.codeId ?? 0;
        message.newInstantiatePermission =
            object.newInstantiatePermission !== undefined &&
                object.newInstantiatePermission !== null
                ? AccessConfig.fromPartial(object.newInstantiatePermission)
                : undefined;
        return message;
    },
};
function createBaseMsgUpdateInstantiateConfigResponse() {
    return {};
}
export const MsgUpdateInstantiateConfigResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateInstantiateConfigResponse();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateInstantiateConfigResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateInstantiateConfigResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", params: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
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
    fromJSON(object) {
        return {
            authority: isSet(object.authority) ? String(object.authority) : "",
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params =
            object.params !== undefined && object.params !== null
                ? Params.fromPartial(object.params)
                : undefined;
        return message;
    },
};
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
};
function createBaseMsgSudoContract() {
    return { authority: "", contract: "", msg: new Uint8Array() };
}
export const MsgSudoContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
        }
        if (message.msg.length !== 0) {
            writer.uint32(26).bytes(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSudoContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.msg = reader.bytes();
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
            authority: isSet(object.authority) ? String(object.authority) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        message.contract !== undefined && (obj.contract = message.contract);
        message.msg !== undefined &&
            (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgSudoContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSudoContract();
        message.authority = object.authority ?? "";
        message.contract = object.contract ?? "";
        message.msg = object.msg ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgSudoContractResponse() {
    return { data: new Uint8Array() };
}
export const MsgSudoContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSudoContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
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
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgSudoContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSudoContractResponse();
        message.data = object.data ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgPinCodes() {
    return { authority: "", codeIds: [] };
}
export const MsgPinCodes = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        writer.uint32(18).fork();
        for (const v of message.codeIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPinCodes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag === 16) {
                        message.codeIds.push(longToNumber(reader.uint64()));
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.codeIds.push(longToNumber(reader.uint64()));
                        }
                        continue;
                    }
                    break;
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
            authority: isSet(object.authority) ? String(object.authority) : "",
            codeIds: Array.isArray(object?.codeIds)
                ? object.codeIds.map((e) => Number(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        if (message.codeIds) {
            obj.codeIds = message.codeIds.map((e) => Math.round(e));
        }
        else {
            obj.codeIds = [];
        }
        return obj;
    },
    create(base) {
        return MsgPinCodes.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgPinCodes();
        message.authority = object.authority ?? "";
        message.codeIds = object.codeIds?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgPinCodesResponse() {
    return {};
}
export const MsgPinCodesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPinCodesResponse();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgPinCodesResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgPinCodesResponse();
        return message;
    },
};
function createBaseMsgUnpinCodes() {
    return { authority: "", codeIds: [] };
}
export const MsgUnpinCodes = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        writer.uint32(18).fork();
        for (const v of message.codeIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnpinCodes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag === 16) {
                        message.codeIds.push(longToNumber(reader.uint64()));
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.codeIds.push(longToNumber(reader.uint64()));
                        }
                        continue;
                    }
                    break;
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
            authority: isSet(object.authority) ? String(object.authority) : "",
            codeIds: Array.isArray(object?.codeIds)
                ? object.codeIds.map((e) => Number(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        if (message.codeIds) {
            obj.codeIds = message.codeIds.map((e) => Math.round(e));
        }
        else {
            obj.codeIds = [];
        }
        return obj;
    },
    create(base) {
        return MsgUnpinCodes.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUnpinCodes();
        message.authority = object.authority ?? "";
        message.codeIds = object.codeIds?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgUnpinCodesResponse() {
    return {};
}
export const MsgUnpinCodesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnpinCodesResponse();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUnpinCodesResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUnpinCodesResponse();
        return message;
    },
};
function createBaseMsgStoreAndInstantiateContract() {
    return {
        authority: "",
        wasmByteCode: new Uint8Array(),
        instantiatePermission: undefined,
        unpinCode: false,
        admin: "",
        label: "",
        msg: new Uint8Array(),
        funds: [],
        source: "",
        builder: "",
        codeHash: new Uint8Array(),
    };
}
export const MsgStoreAndInstantiateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.wasmByteCode.length !== 0) {
            writer.uint32(26).bytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            AccessConfig.encode(message.instantiatePermission, writer.uint32(34).fork()).ldelim();
        }
        if (message.unpinCode === true) {
            writer.uint32(40).bool(message.unpinCode);
        }
        if (message.admin !== "") {
            writer.uint32(50).string(message.admin);
        }
        if (message.label !== "") {
            writer.uint32(58).string(message.label);
        }
        if (message.msg.length !== 0) {
            writer.uint32(66).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(74).fork()).ldelim();
        }
        if (message.source !== "") {
            writer.uint32(82).string(message.source);
        }
        if (message.builder !== "") {
            writer.uint32(90).string(message.builder);
        }
        if (message.codeHash.length !== 0) {
            writer.uint32(98).bytes(message.codeHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreAndInstantiateContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.wasmByteCode = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.unpinCode = reader.bool();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.label = reader.string();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.source = reader.string();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.builder = reader.string();
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.codeHash = reader.bytes();
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
            authority: isSet(object.authority) ? String(object.authority) : "",
            wasmByteCode: isSet(object.wasmByteCode)
                ? bytesFromBase64(object.wasmByteCode)
                : new Uint8Array(),
            instantiatePermission: isSet(object.instantiatePermission)
                ? AccessConfig.fromJSON(object.instantiatePermission)
                : undefined,
            unpinCode: isSet(object.unpinCode) ? Boolean(object.unpinCode) : false,
            admin: isSet(object.admin) ? String(object.admin) : "",
            label: isSet(object.label) ? String(object.label) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
            funds: Array.isArray(object?.funds)
                ? object.funds.map((e) => Coin.fromJSON(e))
                : [],
            source: isSet(object.source) ? String(object.source) : "",
            builder: isSet(object.builder) ? String(object.builder) : "",
            codeHash: isSet(object.codeHash)
                ? bytesFromBase64(object.codeHash)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        message.wasmByteCode !== undefined &&
            (obj.wasmByteCode = base64FromBytes(message.wasmByteCode !== undefined
                ? message.wasmByteCode
                : new Uint8Array()));
        message.instantiatePermission !== undefined &&
            (obj.instantiatePermission = message.instantiatePermission
                ? AccessConfig.toJSON(message.instantiatePermission)
                : undefined);
        message.unpinCode !== undefined && (obj.unpinCode = message.unpinCode);
        message.admin !== undefined && (obj.admin = message.admin);
        message.label !== undefined && (obj.label = message.label);
        message.msg !== undefined &&
            (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
        if (message.funds) {
            obj.funds = message.funds.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.funds = [];
        }
        message.source !== undefined && (obj.source = message.source);
        message.builder !== undefined && (obj.builder = message.builder);
        message.codeHash !== undefined &&
            (obj.codeHash = base64FromBytes(message.codeHash !== undefined ? message.codeHash : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgStoreAndInstantiateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreAndInstantiateContract();
        message.authority = object.authority ?? "";
        message.wasmByteCode = object.wasmByteCode ?? new Uint8Array();
        message.instantiatePermission =
            object.instantiatePermission !== undefined &&
                object.instantiatePermission !== null
                ? AccessConfig.fromPartial(object.instantiatePermission)
                : undefined;
        message.unpinCode = object.unpinCode ?? false;
        message.admin = object.admin ?? "";
        message.label = object.label ?? "";
        message.msg = object.msg ?? new Uint8Array();
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        message.source = object.source ?? "";
        message.builder = object.builder ?? "";
        message.codeHash = object.codeHash ?? new Uint8Array();
        return message;
    },
};
function createBaseMsgStoreAndInstantiateContractResponse() {
    return { address: "", data: new Uint8Array() };
}
export const MsgStoreAndInstantiateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreAndInstantiateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    create(base) {
        return MsgStoreAndInstantiateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreAndInstantiateContractResponse();
        message.address = object.address ?? "";
        message.data = object.data ?? new Uint8Array();
        return message;
    },
};
export class MsgClientImpl {
    rpc;
    service;
    constructor(rpc, opts) {
        this.service = opts?.service || "cosmwasm.wasm.v1.Msg";
        this.rpc = rpc;
        this.StoreCode = this.StoreCode.bind(this);
        this.InstantiateContract = this.InstantiateContract.bind(this);
        this.InstantiateContract2 = this.InstantiateContract2.bind(this);
        this.ExecuteContract = this.ExecuteContract.bind(this);
        this.MigrateContract = this.MigrateContract.bind(this);
        this.UpdateAdmin = this.UpdateAdmin.bind(this);
        this.ClearAdmin = this.ClearAdmin.bind(this);
        this.UpdateInstantiateConfig = this.UpdateInstantiateConfig.bind(this);
        this.UpdateParams = this.UpdateParams.bind(this);
        this.SudoContract = this.SudoContract.bind(this);
        this.PinCodes = this.PinCodes.bind(this);
        this.UnpinCodes = this.UnpinCodes.bind(this);
        this.StoreAndInstantiateContract =
            this.StoreAndInstantiateContract.bind(this);
    }
    StoreCode(request) {
        const data = MsgStoreCode.encode(request).finish();
        const promise = this.rpc.request(this.service, "StoreCode", data);
        return promise.then((data) => MsgStoreCodeResponse.decode(_m0.Reader.create(data)));
    }
    InstantiateContract(request) {
        const data = MsgInstantiateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "InstantiateContract", data);
        return promise.then((data) => MsgInstantiateContractResponse.decode(_m0.Reader.create(data)));
    }
    InstantiateContract2(request) {
        const data = MsgInstantiateContract2.encode(request).finish();
        const promise = this.rpc.request(this.service, "InstantiateContract2", data);
        return promise.then((data) => MsgInstantiateContract2Response.decode(_m0.Reader.create(data)));
    }
    ExecuteContract(request) {
        const data = MsgExecuteContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "ExecuteContract", data);
        return promise.then((data) => MsgExecuteContractResponse.decode(_m0.Reader.create(data)));
    }
    MigrateContract(request) {
        const data = MsgMigrateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "MigrateContract", data);
        return promise.then((data) => MsgMigrateContractResponse.decode(_m0.Reader.create(data)));
    }
    UpdateAdmin(request) {
        const data = MsgUpdateAdmin.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateAdmin", data);
        return promise.then((data) => MsgUpdateAdminResponse.decode(_m0.Reader.create(data)));
    }
    ClearAdmin(request) {
        const data = MsgClearAdmin.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClearAdmin", data);
        return promise.then((data) => MsgClearAdminResponse.decode(_m0.Reader.create(data)));
    }
    UpdateInstantiateConfig(request) {
        const data = MsgUpdateInstantiateConfig.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateInstantiateConfig", data);
        return promise.then((data) => MsgUpdateInstantiateConfigResponse.decode(_m0.Reader.create(data)));
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    SudoContract(request) {
        const data = MsgSudoContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "SudoContract", data);
        return promise.then((data) => MsgSudoContractResponse.decode(_m0.Reader.create(data)));
    }
    PinCodes(request) {
        const data = MsgPinCodes.encode(request).finish();
        const promise = this.rpc.request(this.service, "PinCodes", data);
        return promise.then((data) => MsgPinCodesResponse.decode(_m0.Reader.create(data)));
    }
    UnpinCodes(request) {
        const data = MsgUnpinCodes.encode(request).finish();
        const promise = this.rpc.request(this.service, "UnpinCodes", data);
        return promise.then((data) => MsgUnpinCodesResponse.decode(_m0.Reader.create(data)));
    }
    StoreAndInstantiateContract(request) {
        const data = MsgStoreAndInstantiateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "StoreAndInstantiateContract", data);
        return promise.then((data) => MsgStoreAndInstantiateContractResponse.decode(_m0.Reader.create(data)));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd2FzbS92MS90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sR0FBRyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUvQyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUM7QUFpVGxELFNBQVMsc0JBQXNCO0lBQzdCLE9BQU87UUFDTCxNQUFNLEVBQUUsRUFBRTtRQUNWLFlBQVksRUFBRSxJQUFJLFVBQVUsRUFBRTtRQUM5QixxQkFBcUIsRUFBRSxTQUFTO0tBQ2pDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHO0lBQzFCLE1BQU0sQ0FDSixPQUFxQixFQUNyQixTQUFxQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUV4QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksT0FBTyxDQUFDLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtZQUMvQyxZQUFZLENBQUMsTUFBTSxDQUNqQixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE1BQU0sQ0FBQyxN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