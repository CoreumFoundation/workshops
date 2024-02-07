import { MsgDeposit, MsgSubmitProposal, MsgVote, MsgVoteWeighted, } from "./gov/v1beta1/tx";
import { MsgGrantAllowance, MsgRevokeAllowance } from "./feegrant/v1beta1/tx";
import { MsgMultiSend, MsgSend, MsgSetSendEnabled, MsgUpdateParams, } from "./bank/v1beta1/tx";
import { MsgCommunityPoolSpend, MsgDepositValidatorRewardsPool, MsgFundCommunityPool, MsgSetWithdrawAddress, MsgUpdateParams as DMsgUpdateParams, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, } from "./distribution/v1beta1/tx";
import { MsgCreatePeriodicVestingAccount, MsgCreatePermanentLockedAccount, MsgCreateVestingAccount, } from "./vesting/v1beta1/tx";
import { MsgBeginRedelegate, MsgCancelUnbondingDelegation, MsgCreateValidator, MsgDelegate, MsgEditValidator, MsgUndelegate, MsgUpdateParams as SMsgUpdateParams, } from "./staking/v1beta1/tx";
import { MsgExec, MsgGrant, MsgRevoke } from "./authz/v1beta1/tx";
const authzBaseUrl = "/cosmos.authz.v1beta1.";
const stakeBaseUrl = "/cosmos.staking.v1beta1.";
const govBaseUrl = "/cosmos.gov.v1beta1.";
const fgBaseUrl = "/cosmos.feegrant.v1beta1.";
const bankBaseUrl = "/cosmos.bank.v1beta1.";
const distBaseUrl = "/cosmos.distribution.v1beta1.";
const vestBaseUrl = "/cosmos.vesting.v1beta1.";
export * from "./tx/v1beta1/tx";
/**
 * Module to generate the Messages related to the Authz module of the Blockchain
 */
export var Authz;
(function (Authz) {
    /** MsgGrant message creator
     * Grants the provided authorization to the grantee on the granter's account with the provided expiration time. If there is already a grant for the given (granter, grantee, Authorization) triple, then the grant will be overwritten.
     *
     * @param object Represents the properties available for this MsgGrant message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Authz.Grant = function (object) {
        return {
            typeUrl: authzBaseUrl + "MsgGrant",
            value: MsgGrant.fromPartial(object),
        };
    };
    /** MsgExec message creator
     * Attempts to execute the provided messages using authorizations granted to the grantee. Each message should have only one signer corresponding to the granter of the authorization.
     *
     * @param object Represents the properties available for this MsgExec message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Authz.Exec = function (object) {
        return {
            typeUrl: authzBaseUrl + "MsgExec",
            value: MsgExec.fromPartial(object),
        };
    };
    /** MsgRevoke message creator
     * Revokes any authorization corresponding to the provided method name on the granter's account that has been granted to the grantee.
     *
     * @param object Represents the properties available for this MsgRevoke message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Authz.Revoke = function (object) {
        return {
            typeUrl: authzBaseUrl + "MsgRevoke",
            value: MsgRevoke.fromPartial(object),
        };
    };
})(Authz || (Authz = {}));
/**
 * Module to generate the Messages related to the Staking module of the Blockchain
 */
export var Staking;
(function (Staking) {
    /** MsgBeginRedelegate message creator
     * Defines a method for performing a redelegation of coins from a delegator and source validator to a destination validator.
     *
     * @param object Represents the properties available for this MsgBeginRedelegate message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.BeginRedelegate = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgBeginRedelegate",
            value: MsgBeginRedelegate.fromPartial(object),
        };
    };
    /** MsgCancelUnbondingDelegation message creator
     *
     * @param object Represents the properties available for this MsgCancelUnbondingDelegation message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.CancelUnbondingDelegation = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgCancelUnbondingDelegation",
            value: MsgCancelUnbondingDelegation.fromPartial(object),
        };
    };
    /** MsgCreateValidator message creator
     * Defines a method for creating a new validator.
     *
     * @param object Represents the properties available for this MsgCreateValidator message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.CreateValidator = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgCreateValidator",
            value: MsgCreateValidator.fromPartial(object),
        };
    };
    /** MsgDelegate message creator
     * Defines a method for performing a delegation of coins from a delegator to a validator.
     *
     * @param object Represents the properties available for this MsgDelegate message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.Delegate = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgDelegate",
            value: MsgDelegate.fromPartial(object),
        };
    };
    /** MsgEditValidator message creator
     * Defines a method for editing an existing validator.
     *
     * @param object Represents the properties available for this MsgEditValidator message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.EditValidator = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgEditValidator",
            value: MsgEditValidator.fromPartial(object),
        };
    };
    /** MsgUndelegate message creator
     * Defines a method for performing an undelegation from a delegate and a validator.
     *
     * @param object Represents the properties available for this MsgUndelegate message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.Undelegate = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgUndelegate",
            value: MsgUndelegate.fromPartial(object),
        };
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Staking.UpdateParams = function (object) {
        return {
            typeUrl: stakeBaseUrl + "MsgUpdateParams",
            value: SMsgUpdateParams.fromPartial(object),
        };
    };
})(Staking || (Staking = {}));
/**
 * Module to generate the Messages related to the Governance module of the Blockchain
 */
export var Governance;
(function (Governance) {
    /** MsgDeposit message creator
     * Defines a method to add deposit on a specific proposal.
     *
     * @param object Represents the properties available for this MsgDeposit message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Governance.Deposit = function (object) {
        return {
            typeUrl: govBaseUrl + "MsgDeposit",
            value: MsgDeposit.fromPartial(object),
        };
    };
    /** MsgSubmitProposal message creator
     * Defines a method to create new proposal given a content.
     *
     * @param object Represents the properties available for this MsgSubmitProposal message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Governance.SubmitProposal = function (object) {
        return {
            typeUrl: govBaseUrl + "MsgSubmitProposal",
            value: MsgSubmitProposal.fromPartial(object),
        };
    };
    /** MsgVote message creator
     * Defines a method to add a vote on a specific proposal.
     *
     * @param object Represents the properties available for this MsgVote message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Governance.Vote = function (object) {
        return {
            typeUrl: govBaseUrl + "MsgVote",
            value: MsgVote.fromPartial(object),
        };
    };
    /** MsgVoteWeighted message creator
     * Defines a method to add a weighted vote on a specific proposal.
     *
     * @param object Represents the properties available for this MsgVoteWeighted message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Governance.VoteWeighted = function (object) {
        return {
            typeUrl: govBaseUrl + "MsgVoteWeighted",
            value: MsgVoteWeighted.fromPartial(object),
        };
    };
})(Governance || (Governance = {}));
/**
 * Module to generate the Messages related to the Feegrant module of the Blockchain
 */
export var Feegrant;
(function (Feegrant) {
    /** MsgGrantAllowance message creator
     * Grants fee allowance to the grantee on the granter's account with the provided expiration time.
     *
     * @param object Represents the properties available for this MsgGrantAllowance message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Feegrant.GrantAllowance = function (object) {
        return {
            typeUrl: fgBaseUrl + "MsgGrantAllowance",
            value: MsgGrantAllowance.fromPartial(object),
        };
    };
    /** MsgRevokeAllowance message creator
     * Revokes any fee allowance of granter's account that has been granted to the grantee.
     *
     * @param object Represents the properties available for this MsgRevokeAllowance message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Feegrant.RevokeAllowance = function (object) {
        return {
            typeUrl: fgBaseUrl + "MsgRevokeAllowance",
            value: MsgRevokeAllowance.fromPartial(object),
        };
    };
})(Feegrant || (Feegrant = {}));
/**
 * Module to generate the Messages related to the Bank module of the Blockchain
 */
export var Bank;
(function (Bank) {
    /** MsgMultiSend message creator
     * Defines a method for sending coins from some accounts to other accounts.
     *
     * @param object Represents the properties available for this MsgMultiSend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Bank.MultiSend = function (object) {
        return {
            typeUrl: bankBaseUrl + "MsgMultiSend",
            value: MsgMultiSend.fromPartial(object),
        };
    };
    /** MsgSend message creator
     * Defines a method for sending coins from one account to another account.
     *
     * @param object Represents the properties available for this MsgSend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Bank.Send = function (object) {
        return {
            typeUrl: bankBaseUrl + "MsgSend",
            value: MsgSend.fromPartial(object),
        };
    };
    /** MsgSetSendEnabled message creator
     *
     * @param object Represents the properties available for this MsgSetSendEnabled message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Bank.SetSendEnabled = function (object) {
        return {
            typeUrl: bankBaseUrl + "MsgSetSendEnabled",
            value: MsgSetSendEnabled.fromPartial(object),
        };
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Bank.UpdateParams = function (object) {
        return {
            typeUrl: bankBaseUrl + "MsgUpdateParams",
            value: MsgUpdateParams.fromPartial(object),
        };
    };
})(Bank || (Bank = {}));
/**
 * Module to generate the Messages related to the Distribution module of the Blockchain
 */
export var Distribution;
(function (Distribution) {
    /** MsgWithdrawDelegatorReward message creator
     * Defines a method to withdraw rewards of delegator from a single validator.
     *
     * @param object Represents the properties available for this MsgWithdrawDelegatorReward message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.WithdrawDelegatorReward = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgWithdrawDelegatorReward",
            value: MsgWithdrawDelegatorReward.fromPartial(object),
        };
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.UpdateParams = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgUpdateParams",
            value: DMsgUpdateParams.fromPartial(object),
        };
    };
    /** MsgWithdrawValidatorCommission message creator
     * Defines a method to withdraw the full commission to the validator address.
     *
     * @param object Represents the properties available for this MsgWithdrawValidatorCommission message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.WithdrawValidatorCommission = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgWithdrawValidatorCommission",
            value: MsgWithdrawValidatorCommission.fromPartial(object),
        };
    };
    /** MsgCommunityPoolSpend message creator
     *
     * @param object Represents the properties available for this MsgCommunityPoolSpend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.CommunityPoolSpend = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgCommunityPoolSpend",
            value: MsgCommunityPoolSpend.fromPartial(object),
        };
    };
    /** MsgDepositValidatorRewardsPool message creator
     *
     * @param object Represents the properties available for this MsgDepositValidatorRewardsPool message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.DepositValidatorRewardsPool = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgDepositValidatorRewardsPool",
            value: MsgDepositValidatorRewardsPool.fromPartial(object),
        };
    };
    /** MsgFundCommunityPool message creator
     * Defines a method to allow an account to directly fund the community pool.
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.FundCommunityPool = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgFundCommunityPool",
            value: MsgFundCommunityPool.fromPartial(object),
        };
    };
    /** MsgSetWithdrawAddress message creator
     * Defines a method to change the withdraw address for a delegator (or validator self-delegation).
     *
     * @param object Represents the properties available for this MsgSetWithdrawAddress message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Distribution.SetWithdrawAddress = function (object) {
        return {
            typeUrl: distBaseUrl + "MsgSetWithdrawAddress",
            value: MsgSetWithdrawAddress.fromPartial(object),
        };
    };
})(Distribution || (Distribution = {}));
/**
 * Module to generate the Messages related to the Vesting module of the Blockchain
 */
export var Vesting;
(function (Vesting) {
    /** MsgCreateVestingAccount message creator
     * Defines a method that enables creating a vesting account.
     *
     * @param object Represents the properties available for this MsgCreateVestingAccount message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    Vesting.CreateVestingAccount = function (object) {
        return {
            typeUrl: vestBaseUrl + "MsgCreateVestingAccount",
            value: MsgCreateVestingAccount.fromPartial(object),
        };
    };
    Vesting.CreatePeriodicVestingAccount = function (object) {
        return {
            typeUrl: vestBaseUrl + "MsgCreatePeriodicVestingAccount",
            value: MsgCreatePeriodicVestingAccount.fromPartial(object),
        };
    };
    Vesting.CreatePermanentLockedAccount = function (object) {
        return {
            typeUrl: vestBaseUrl + "MsgCreatePermanentLockedAccount",
            value: MsgCreatePermanentLockedAccount.fromPartial(object),
        };
    };
})(Vesting || (Vesting = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29zbW9zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxlQUFlLEdBQ2hCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUUsT0FBTyxFQUNMLFlBQVksRUFDWixPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLGVBQWUsR0FDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLDhCQUE4QixFQUM5QixvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLGVBQWUsSUFBSSxnQkFBZ0IsRUFDbkMsMEJBQTBCLEVBQzFCLDhCQUE4QixHQUMvQixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFDTCwrQkFBK0IsRUFDL0IsK0JBQStCLEVBQy9CLHVCQUF1QixHQUN4QixNQUFNLHNCQUFzQixDQUFDO0FBRTlCLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsNEJBQTRCLEVBQzVCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLElBQUksZ0JBQWdCLEdBQ3BDLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFZbEUsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFDOUMsTUFBTSxZQUFZLEdBQUcsMEJBQTBCLENBQUM7QUFDaEQsTUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUM7QUFDMUMsTUFBTSxTQUFTLEdBQUcsMkJBQTJCLENBQUM7QUFDOUMsTUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUM7QUFDNUMsTUFBTSxXQUFX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