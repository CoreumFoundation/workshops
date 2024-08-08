import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSend as NFTMsgSend } from "./nft/v1beta1/tx";
import { MsgIssueClass as NFTMsgIssueClass, MsgMint as NFTMsgMint, MsgAddToWhitelist as NFTMsgAddToWhitelist, MsgBurn as NFTMsgBurn, MsgRemoveFromWhitelist as NFTMsgRemoveFromWhitelist, MsgFreeze as NFTMsgFreeze, MsgUnfreeze as NFTMsgUnfreeze } from "./asset/nft/v1/tx";
import { MsgIssue as FTMsgIssue, MsgMint as FTMsgMint, MsgBurn as FTMsgBurn, MsgFreeze as FTMsgFreeze, MsgUnfreeze as FTMsgUnfreeze, MsgGloballyFreeze as FTMsgGloballyFreeze, MsgGloballyUnfreeze as FTMsgGloballyUnfreeze, MsgSetWhitelistedLimit as FTMsgSetWhitelistedLimit } from "./asset/ft/v1/tx";
import { FTMsgs, NFTMsgs } from "../types/msgs";
export { Feature } from "./asset/ft/v1/token";
export { ClassFeature } from "./asset/nft/v1/nft";
/** @internal */
export interface CoreumMessage {
    typeUrl: string;
    value: any;
}
/**
 * Registry of the Custom Messages of the Coreum blockchain
 */
export declare const coreumRegistry: ReadonlyArray<[string, GeneratedType]>;
/**
 * Transaction Module for the Fungible Tokens module. (assetft)
 */
export declare namespace FT {
    /** MsgMint message creator
     * Mints new fungible tokens.
     *
     * @param object Represents the properties available for this MsgMint message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Mint: (object: FTMsgs.MsgMint) => {
        typeUrl: string;
        value: FTMsgMint;
    };
    /** MsgIssue message creator
     * Defines a method to issue a new fungible token.
     *
     * @param object Represents the properties available for this MsgIssue message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Issue: (object: FTMsgs.MsgIssue) => {
        typeUrl: string;
        value: FTMsgIssue;
    };
    /** MsgBurn message creator
     * Burns the specified fungible tokens from senders balance if the sender has enough balance.
     *
     * @param object Represents the properties available for this MsgBurn message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Burn: (object: FTMsgs.MsgBurn) => {
        typeUrl: string;
        value: FTMsgBurn;
    };
    /** MsgFreeze message creator
     * Freezes a part of the fungible tokens in an account, only if the freezable feature is enabled on that token.
     *
     * @param object Represents the properties available for this MsgIssue message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Freeze: (object: FTMsgs.MsgFreeze) => {
        typeUrl: string;
        value: FTMsgFreeze;
    };
    /** MsgGloballyFreeze message creator
     * Freezes fungible token so no operations are allowed with it before unfrozen. This operation is idempotent so global freeze of already frozen token does nothing.
     *
     * @param object Represents the properties available for this MsgGloballyFreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const GloballyFreeze: (object: FTMsgs.MsgGloballyFreeze) => {
        typeUrl: string;
        value: FTMsgGloballyFreeze;
    };
    /** MsgGloballyUnfreeze message creator
     * Unfreezes fungible token and unblocks basic operations on it. This operation is idempotent so global unfreezing of non-frozen token does nothing.
     *
     * @param object Represents the properties available for this MsgGloballyUnfreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const GloballyUnfreeze: (object: FTMsgs.MsgGloballyUnfreeze) => {
        typeUrl: string;
        value: FTMsgGloballyUnfreeze;
    };
    /** MsgUnfreeze message creator
     * Unfreezes a part of the frozen fungible tokens in an account, only if there are such frozen tokens on that account.
     *
     * @param object Represents the properties available for this MsgUnfreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Unfreeze: (object: FTMsgs.MsgUnfreeze) => {
        typeUrl: string;
        value: FTMsgUnfreeze;
    };
    /** MsgSetWhitelistedLimit message creator
     * Sets the limit of how many tokens a specific account may hold.
     *
     * @param object Represents the properties available for this MsgSetWhitelistedLimit message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const SetWhitelistedLimit: (object: FTMsgs.MsgSetWhitelistedLimit) => {
        typeUrl: string;
        value: FTMsgSetWhitelistedLimit;
    };
}
/**
 * Transaction Module for the Non-Fungible Tokens modules (assetnft, nftbeta).
 */
export declare namespace NFT {
    /** MsgMint message creator
     * Mints new non-fungible token in the class.
     *
     * @param object Represents the properties available for this MsgMint message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Mint: (object: NFTMsgs.MsgMint) => {
        typeUrl: string;
        value: NFTMsgMint;
    };
    /** MsgAddToWhitelist message creator
     * Sets the account as whitelisted to hold the NFT
     *
     * @param object Represents the properties available for this MsgAddToWhitelist message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const AddToWhitelist: (object: NFTMsgs.MsgAddToWhitelist) => {
        typeUrl: string;
        value: NFTMsgAddToWhitelist;
    };
    /** MsgRemoveFromWhitelist message creator
     * Removes an account from whitelisted list of the NFT
     *
     * @param object Represents the properties available for this MsgRemoveFromWhitelist message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const RemoveFromWhitelist: (object: NFTMsgs.MsgRemoveFromWhitelist) => {
        typeUrl: string;
        value: NFTMsgRemoveFromWhitelist;
    };
    /** MsgBurn message creator
     * Burns the existing non-fungible token in the class.
     *
     * @param object Represents the properties available for this MsgBurn message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Burn: (object: NFTMsgs.MsgBurn) => {
        typeUrl: string;
        value: NFTMsgBurn;
    };
    /** MsgFreeze message creator
     * Freezes an NFT
     *
     * @param object Represents the properties available for this MsgFreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Freeze: (object: NFTMsgs.MsgFreeze) => {
        typeUrl: string;
        value: NFTMsgFreeze;
    };
    /** MsgUnfreeze message creator
     * Removes the freeze effect already put on an NFT
     *
     * @param object Represents the properties available for this MsgUnfreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Unfreeze: (object: NFTMsgs.MsgUnfreeze) => {
        typeUrl: string;
        value: NFTMsgUnfreeze;
    };
    /** MsgIssueClass message creator
     * Creates new non-fungible token class.
     *
     * @param object Represents the properties available for this MsgIssueClass message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const IssueClass: (object: NFTMsgIssueClass) => {
        typeUrl: string;
        value: NFTMsgIssueClass;
    };
    /** MsgSend message creator
     * Represents a message to send a nft from one account to another account.
     *
     * @param object Represents the properties available for this MsgSend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Send: (object: NFTMsgs.MsgSend) => {
        typeUrl: string;
        value: NFTMsgSend;
    };
}
