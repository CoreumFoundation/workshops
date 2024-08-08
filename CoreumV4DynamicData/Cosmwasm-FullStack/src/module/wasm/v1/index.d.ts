import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgStoreCode, MsgInstantiateContract, MsgInstantiateContract2, MsgExecuteContract, MsgMigrateContract, MsgUpdateAdmin, MsgClearAdmin, MsgUpdateInstantiateConfig, MsgUpdateParams, MsgSudoContract, MsgPinCodes, MsgUnpinCodes, MsgStoreAndInstantiateContract } from "./tx";
export declare const cosmwasmRegistry: ReadonlyArray<[string, GeneratedType]>;
/**
 * Transaction Module for the Smart Contracts Module (wasm)
 */
export declare namespace CosmWasm {
    /** MsgStoreAndInstantiateContract message creator
     *
     * @param object Represents the properties available for this MsgStoreAndInstantiateContract message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const StoreAndInstantiateContract: (object: MsgStoreAndInstantiateContract) => {
        typeUrl: string;
        value: MsgStoreAndInstantiateContract;
    };
    /** MsgUnpinCodes message creator
     *
     * @param object Represents the properties available for this MsgUnpinCodes message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UnpinCodes: (object: MsgUnpinCodes) => {
        typeUrl: string;
        value: MsgUnpinCodes;
    };
    /** MsgPinCodes message creator
     *
     * @param object Represents the properties available for this MsgPinCodes message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const PinCodes: (object: MsgPinCodes) => {
        typeUrl: string;
        value: MsgPinCodes;
    };
    /** MsgSudoContract message creator
     *
     * @param object Represents the properties available for this MsgSudoContract message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const SudoContract: (object: MsgSudoContract) => {
        typeUrl: string;
        value: MsgSudoContract;
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UpdateParams: (object: MsgUpdateParams) => {
        typeUrl: string;
        value: MsgUpdateParams;
    };
    /** MsgUpdateInstantiateConfig message creator
     *
     * @param object Represents the properties available for this MsgUpdateInstantiateConfig message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UpdateInstantiateConfig: (object: MsgUpdateInstantiateConfig) => {
        typeUrl: string;
        value: MsgUpdateInstantiateConfig;
    };
    /**
     * MsgStoreCode message creator
     * Submit Wasm code to the system
     *
     * @param object Represents the properties available for this MsgStoreCode message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const StoreCode: (object: MsgStoreCode) => {
        typeUrl: string;
        value: MsgStoreCode;
    };
    /**
     * MsgInstantiateContract message creator
     * Creates a new smart contract instance for the given code id.
     *
     * @param object Represents the properties available for this MsgInstantiateContract message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const InstantiateContract: (object: MsgInstantiateContract) => {
        typeUrl: string;
        value: MsgInstantiateContract;
    };
    /** MsgInstantiateContract2 message creator
     * Creates a new smart contract instance for the given code id with a predictable address
     *
     * @param object Represents the properties available for this MsgInstantiateContract2 message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const InstantiateContract2: (object: MsgInstantiateContract2) => {
        typeUrl: string;
        value: MsgInstantiateContract2;
    };
    /** MsgClearAdmin message creator
     * Removes any admin stored for a smart contract
     *
     * @param object Represents the properties available for this MsgClearAdmin message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const ClearAdmin: (object: MsgClearAdmin) => {
        typeUrl: string;
        value: MsgClearAdmin;
    };
    /** MsgUpdateAdmin message creator
     * Sets a new admin for a smart contract
     *
     * @param object Represents the properties available for this MsgUpdateAdmin message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UpdateAdmin: (object: MsgUpdateAdmin) => {
        typeUrl: string;
        value: MsgUpdateAdmin;
    };
    /** MsgExecuteContract message creator
     * Submits the given message data to a smart contract
     *
     * @param object Represents the properties available for this MsgExecuteContract message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const ExecuteContract: (object: MsgExecuteContract) => {
        typeUrl: string;
        value: MsgExecuteContract;
    };
    /** MsgMigrateContract message creator
     *  Runs a code upgrade/ downgrade for a smart contract
     *
     * @param object Represents the properties available for this MsgMigrateContract message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const MigrateContract: (object: MsgMigrateContract) => {
        typeUrl: string;
        value: MsgMigrateContract;
    };
}
