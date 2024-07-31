import { assetNftRegistry, assetFtRegistry } from "./asset";
import { nftBetaRegistry } from "./nft";
import { MsgSend as NFTMsgSend } from "./nft/v1beta1/tx";
import { MsgIssueClass as NFTMsgIssueClass, MsgMint as NFTMsgMint, MsgAddToWhitelist as NFTMsgAddToWhitelist, MsgBurn as NFTMsgBurn, MsgRemoveFromWhitelist as NFTMsgRemoveFromWhitelist, MsgFreeze as NFTMsgFreeze, MsgUnfreeze as NFTMsgUnfreeze, } from "./asset/nft/v1/tx";
import { MsgIssue as FTMsgIssue, MsgMint as FTMsgMint, MsgBurn as FTMsgBurn, MsgFreeze as FTMsgFreeze, MsgUnfreeze as FTMsgUnfreeze, MsgGloballyFreeze as FTMsgGloballyFreeze, MsgGloballyUnfreeze as FTMsgGloballyUnfreeze, MsgSetWhitelistedLimit as FTMsgSetWhitelistedLimit, } from "./asset/ft/v1/tx";
export { Feature } from "./asset/ft/v1/token";
export { ClassFeature } from "./asset/nft/v1/nft";
/**
 * Registry of the Custom Messages of the Coreum blockchain
 */
export const coreumRegistry = [
    ...assetFtRegistry,
    ...assetNftRegistry,
    ...nftBetaRegistry,
];
/**
 * Transaction Module for the Fungible Tokens module. (assetft)
 */
export var FT;
(function (FT) {
    /** MsgMint message creator
     * Mints new fungible tokens.
     *
     * @param object Represents the properties available for this MsgMint message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.Mint = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgMint",
            value: FTMsgMint.fromPartial(object),
        };
    };
    /** MsgIssue message creator
     * Defines a method to issue a new fungible token.
     *
     * @param object Represents the properties available for this MsgIssue message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.Issue = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgIssue",
            value: FTMsgIssue.fromPartial(object),
        };
    };
    /** MsgBurn message creator
     * Burns the specified fungible tokens from senders balance if the sender has enough balance.
     *
     * @param object Represents the properties available for this MsgBurn message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.Burn = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgBurn",
            value: FTMsgBurn.fromPartial(object),
        };
    };
    /** MsgFreeze message creator
     * Freezes a part of the fungible tokens in an account, only if the freezable feature is enabled on that token.
     *
     * @param object Represents the properties available for this MsgIssue message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.Freeze = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgFreeze",
            value: FTMsgFreeze.fromPartial(object),
        };
    };
    /** MsgGloballyFreeze message creator
     * Freezes fungible token so no operations are allowed with it before unfrozen. This operation is idempotent so global freeze of already frozen token does nothing.
     *
     * @param object Represents the properties available for this MsgGloballyFreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.GloballyFreeze = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgGloballyFreeze",
            value: FTMsgGloballyFreeze.fromPartial(object),
        };
    };
    /** MsgGloballyUnfreeze message creator
     * Unfreezes fungible token and unblocks basic operations on it. This operation is idempotent so global unfreezing of non-frozen token does nothing.
     *
     * @param object Represents the properties available for this MsgGloballyUnfreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.GloballyUnfreeze = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgGloballyUnfreeze",
            value: FTMsgGloballyUnfreeze.fromPartial(object),
        };
    };
    /** MsgUnfreeze message creator
     * Unfreezes a part of the frozen fungible tokens in an account, only if there are such frozen tokens on that account.
     *
     * @param object Represents the properties available for this MsgUnfreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.Unfreeze = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgUnfreeze",
            value: FTMsgUnfreeze.fromPartial(object),
        };
    };
    /** MsgSetWhitelistedLimit message creator
     * Sets the limit of how many tokens a specific account may hold.
     *
     * @param object Represents the properties available for this MsgSetWhitelistedLimit message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    FT.SetWhitelistedLimit = function (object) {
        return {
            typeUrl: "/coreum.asset.ft.v1.MsgSetWhitelistedLimit",
            value: FTMsgSetWhitelistedLimit.fromPartial(object),
        };
    };
})(FT || (FT = {}));
/**
 * Transaction Module for the Non-Fungible Tokens modules (assetnft, nftbeta).
 */
export var NFT;
(function (NFT) {
    /** MsgMint message creator
     * Mints new non-fungible token in the class.
     *
     * @param object Represents the properties available for this MsgMint message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.Mint = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgMint",
            value: NFTMsgMint.fromPartial(object),
        };
    };
    /** MsgAddToWhitelist message creator
     * Sets the account as whitelisted to hold the NFT
     *
     * @param object Represents the properties available for this MsgAddToWhitelist message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.AddToWhitelist = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgAddToWhitelist",
            value: NFTMsgAddToWhitelist.fromPartial(object),
        };
    };
    /** MsgRemoveFromWhitelist message creator
     * Removes an account from whitelisted list of the NFT
     *
     * @param object Represents the properties available for this MsgRemoveFromWhitelist message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.RemoveFromWhitelist = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgRemoveFromWhitelist",
            value: NFTMsgRemoveFromWhitelist.fromPartial(object),
        };
    };
    /** MsgBurn message creator
     * Burns the existing non-fungible token in the class.
     *
     * @param object Represents the properties available for this MsgBurn message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.Burn = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgBurn",
            value: NFTMsgBurn.fromPartial(object),
        };
    };
    /** MsgFreeze message creator
     * Freezes an NFT
     *
     * @param object Represents the properties available for this MsgFreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.Freeze = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgFreeze",
            value: NFTMsgFreeze.fromPartial(object),
        };
    };
    /** MsgUnfreeze message creator
     * Removes the freeze effect already put on an NFT
     *
     * @param object Represents the properties available for this MsgUnfreeze message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.Unfreeze = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgUnfreeze",
            value: NFTMsgUnfreeze.fromPartial(object),
        };
    };
    /** MsgIssueClass message creator
     * Creates new non-fungible token class.
     *
     * @param object Represents the properties available for this MsgIssueClass message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.IssueClass = function (object) {
        return {
            typeUrl: "/coreum.asset.nft.v1.MsgIssueClass",
            value: NFTMsgIssueClass.fromPartial(object),
        };
    };
    /** MsgSend message creator
     * Represents a message to send a nft from one account to another account.
     *
     * @param object Represents the properties available for this MsgSend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    NFT.Send = function (object) {
        return {
            typeUrl: "/coreum.nft.v1beta1.MsgSend",
            value: NFTMsgSend.fromPartial(object),
        };
    };
})(NFT || (NFT = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZXVtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN4QyxPQUFPLEVBQUUsT0FBTyxJQUFJLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pELE9BQU8sRUFDTCxhQUFhLElBQUksZ0JBQWdCLEVBQ2pDLE9BQU8sSUFBSSxVQUFVLEVBQ3JCLGlCQUFpQixJQUFJLG9CQUFvQixFQUN6QyxPQUFPLElBQUksVUFBVSxFQUNyQixzQkFBc0IsSUFBSSx5QkFBeUIsRUFDbkQsU0FBUyxJQUFJLFlBQVksRUFDekIsV0FBVyxJQUFJLGNBQWMsR0FDOUIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQ0wsUUFBUSxJQUFJLFVBQVUsRUFDdEIsT0FBTyxJQUFJLFNBQVMsRUFDcEIsT0FBTyxJQUFJLFNBQVMsRUFDcEIsU0FBUyxJQUFJLFdBQVcsRUFDeEIsV0FBVyxJQUFJLGFBQWEsRUFDNUIsaUJBQWlCLElBQUksbUJBQW1CLEVBQ3hDLG1CQUFtQixJQUFJLHFCQUFxQixFQUM1QyxzQkFBc0IsSUFBSSx3QkFBd0IsR0FDbkQsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUWxEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQztJQUNwRSxHQUFHLGVBQWU7SUFDbEIsR0FBRyxnQkFBZ0I7SUFDbkIsR0FBRyxlQUFlO0NBQ25CLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sS0FBVyxFQUFFLENBNEdsQjtBQTVHRCxXQUFpQixFQUFFO0lBQ2pCOzs7OztPQUtHO0lBQ1UsT0FBSSxHQUFHLFVBQVUsTUFBc0I7UUFDbEQsT0FBTztZQUNMLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ3JDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNVLFFBQUssR0FBRyxVQUFVLE1BQXVCO1FBQ3BELE9BQU87WUFDTCxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLEtBQUssRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUN0QyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUY7Ozs7O09BS0c7SUFDVSxPQUFJLEdBQUcsVUFBVSxNQUFzQjtRQUNsRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxLQUFLLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDckMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ1UsU0FBTSxHQUFHLFVBQVUsTUFBd0I7UUFDdEQsT0FBTztZQUNMLE9BQU8sRUFBRSwrQkFBK0I7WUFDeEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ3ZDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNVLGlCQUFjLEdBQUcsVUFBVSxNQUFnQztRQUN0RSxPQUFPO1lBQ0wsT0FBTyxFQUFFLHVDQUF1QztZQUNoRCxLQUFLLEVBQUUsbUJBQW1CLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUMvQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUY7Ozs7O09BS0c7SUFDVSxtQkFBZ0IsR0FBRyxVQUM5QixNQUFrQztRQUVsQyxPQUFPO1lBQ0wsT0FBTyxFQUFFLHlDQUF5QztZQUNsRCxLQUFLLEVBQUUscUJBQXFCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNqRCxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUY7Ozs7O09BS0c7SUFDVSxXQUFRLEdBQUcsVUFBVSxNQUEwQjtRQUMxRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLGlDQUFpQztZQUMxQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDekMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ1Usc0JBQW1CLEdBQUcsVUFDakMsTUFBcUM7UUFFckMsT0FBTztZQUNMLE9BQU8sRUFBRSw0Q0FBNEM7WUFDckQsS0FBSyxFQUFFLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDcEQsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsRUE1R2dCLEVBQUUsS0FBRixFQUFFLFFBNEdsQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxLQUFXLEdBQUcsQ0EwR25CO0FBMUdELFdBQWlCLEdBQUc7SUFDbEI7Ozs7O09BS0c7SUFDVSxRQUFJLEdBQUcsVUFBVSxNQUF1QjtRQUNuRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxLQUFLLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDdEMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ1Usa0JBQWMsR0FBRyxVQUFVLE1BQWlDO1FBQ3ZFLE9BQU87WUFDTCxPQUFPLEVBQUUsd0NBQXdDO1lBQ2pELEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ2hELENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNVLHVCQUFtQixHQUFHLFVBQ2pDLE1BQXNDO1FBRXRDLE9BQU87WUFDTCxPQUFPLEVBQUUsNkNBQTZDO1lBQ3RELEtBQUssRUFBRSx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ3JELENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNVLFFBQUksR0FBRyxVQUFVLE1BQXVCO1FBQ25ELE9BQU87WUFDTCxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLEtBQUssRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUN0QyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUY7Ozs7O09BS0c7SUFDVSxVQUFNLEdBQUcsVUFBVSxNQUF5QjtRQUN2RCxPQUFPO1lBQ0wsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxLQUFLLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDeEMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ1UsWUFBUSxHQUFHLFVBQVUsTUFBMkI7UUFDM0QsT0FBTztZQUNMLE9BQU8sRUFBRSxrQ0FBa0M7WUFDM0MsS0FBSyxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQzFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNVLGNBQVUsR0FBRyxVQUFVLE1BQXdCO1FBQzFELE9BQU87WUFDTCxPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQzVDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNVLFFBQUksR0FBRyxVQUFVLE1BQXVCO1FBQ25ELE9BQU87WUFDTCxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLEtBQUssRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUN0QyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxFQTFHZ0IsR0FBRyxLQUFILEdBQUcsUUEwR25CIn0=