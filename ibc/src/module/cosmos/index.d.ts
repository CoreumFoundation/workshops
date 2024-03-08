import { MsgDeposit, MsgSubmitProposal, MsgVote, MsgVoteWeighted } from "./gov/v1beta1/tx";
import { MsgGrantAllowance, MsgRevokeAllowance } from "./feegrant/v1beta1/tx";
import { MsgMultiSend, MsgSend, MsgSetSendEnabled, MsgUpdateParams } from "./bank/v1beta1/tx";
import { MsgCommunityPoolSpend, MsgDepositValidatorRewardsPool, MsgFundCommunityPool, MsgSetWithdrawAddress, MsgUpdateParams as DMsgUpdateParams, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission } from "./distribution/v1beta1/tx";
import { MsgCreatePeriodicVestingAccount, MsgCreatePermanentLockedAccount, MsgCreateVestingAccount } from "./vesting/v1beta1/tx";
import { MsgBeginRedelegate, MsgCancelUnbondingDelegation, MsgCreateValidator, MsgDelegate, MsgEditValidator, MsgUndelegate, MsgUpdateParams as SMsgUpdateParams } from "./staking/v1beta1/tx";
import { MsgExec, MsgGrant, MsgRevoke } from "./authz/v1beta1/tx";
import { StakingMsgs, DistributionMsgs, BankMsgs, FeegrantMsgs, VestingMsgs, AuthzMsgs, GovMsgs } from "../types/msgs";
export * from "./tx/v1beta1/tx";
/**
 * Module to generate the Messages related to the Authz module of the Blockchain
 */
export declare namespace Authz {
    /** MsgGrant message creator
     * Grants the provided authorization to the grantee on the granter's account with the provided expiration time. If there is already a grant for the given (granter, grantee, Authorization) triple, then the grant will be overwritten.
     *
     * @param object Represents the properties available for this MsgGrant message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Grant: (object: AuthzMsgs.MsgGrant) => {
        typeUrl: string;
        value: MsgGrant;
    };
    /** MsgExec message creator
     * Attempts to execute the provided messages using authorizations granted to the grantee. Each message should have only one signer corresponding to the granter of the authorization.
     *
     * @param object Represents the properties available for this MsgExec message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Exec: (object: AuthzMsgs.MsgExec) => {
        typeUrl: string;
        value: MsgExec;
    };
    /** MsgRevoke message creator
     * Revokes any authorization corresponding to the provided method name on the granter's account that has been granted to the grantee.
     *
     * @param object Represents the properties available for this MsgRevoke message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Revoke: (object: AuthzMsgs.MsgRevoke) => {
        typeUrl: string;
        value: MsgRevoke;
    };
}
/**
 * Module to generate the Messages related to the Staking module of the Blockchain
 */
export declare namespace Staking {
    /** MsgBeginRedelegate message creator
     * Defines a method for performing a redelegation of coins from a delegator and source validator to a destination validator.
     *
     * @param object Represents the properties available for this MsgBeginRedelegate message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const BeginRedelegate: (object: StakingMsgs.MsgBeginRedelegate) => {
        typeUrl: string;
        value: MsgBeginRedelegate;
    };
    /** MsgCancelUnbondingDelegation message creator
     *
     * @param object Represents the properties available for this MsgCancelUnbondingDelegation message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const CancelUnbondingDelegation: (object: StakingMsgs.MsgCancelUnbondingDelegation) => {
        typeUrl: string;
        value: MsgCancelUnbondingDelegation;
    };
    /** MsgCreateValidator message creator
     * Defines a method for creating a new validator.
     *
     * @param object Represents the properties available for this MsgCreateValidator message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const CreateValidator: (object: StakingMsgs.MsgCreateValidator) => {
        typeUrl: string;
        value: MsgCreateValidator;
    };
    /** MsgDelegate message creator
     * Defines a method for performing a delegation of coins from a delegator to a validator.
     *
     * @param object Represents the properties available for this MsgDelegate message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Delegate: (object: StakingMsgs.MsgDelegate) => {
        typeUrl: string;
        value: MsgDelegate;
    };
    /** MsgEditValidator message creator
     * Defines a method for editing an existing validator.
     *
     * @param object Represents the properties available for this MsgEditValidator message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const EditValidator: (object: StakingMsgs.MsgEditValidator) => {
        typeUrl: string;
        value: MsgEditValidator;
    };
    /** MsgUndelegate message creator
     * Defines a method for performing an undelegation from a delegate and a validator.
     *
     * @param object Represents the properties available for this MsgUndelegate message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Undelegate: (object: StakingMsgs.MsgUndelegate) => {
        typeUrl: string;
        value: MsgUndelegate;
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UpdateParams: (object: StakingMsgs.MsgUpdateParams) => {
        typeUrl: string;
        value: SMsgUpdateParams;
    };
}
/**
 * Module to generate the Messages related to the Governance module of the Blockchain
 */
export declare namespace Governance {
    /** MsgDeposit message creator
     * Defines a method to add deposit on a specific proposal.
     *
     * @param object Represents the properties available for this MsgDeposit message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Deposit: (object: GovMsgs.MsgDeposit) => {
        typeUrl: string;
        value: MsgDeposit;
    };
    /** MsgSubmitProposal message creator
     * Defines a method to create new proposal given a content.
     *
     * @param object Represents the properties available for this MsgSubmitProposal message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const SubmitProposal: (object: GovMsgs.MsgSubmitProposal) => {
        typeUrl: string;
        value: MsgSubmitProposal;
    };
    /** MsgVote message creator
     * Defines a method to add a vote on a specific proposal.
     *
     * @param object Represents the properties available for this MsgVote message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Vote: (object: GovMsgs.MsgVote) => {
        typeUrl: string;
        value: MsgVote;
    };
    /** MsgVoteWeighted message creator
     * Defines a method to add a weighted vote on a specific proposal.
     *
     * @param object Represents the properties available for this MsgVoteWeighted message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const VoteWeighted: (object: GovMsgs.MsgVoteWeighted) => {
        typeUrl: string;
        value: MsgVoteWeighted;
    };
}
/**
 * Module to generate the Messages related to the Feegrant module of the Blockchain
 */
export declare namespace Feegrant {
    /** MsgGrantAllowance message creator
     * Grants fee allowance to the grantee on the granter's account with the provided expiration time.
     *
     * @param object Represents the properties available for this MsgGrantAllowance message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const GrantAllowance: (object: FeegrantMsgs.MsgGrantAllowance) => {
        typeUrl: string;
        value: MsgGrantAllowance;
    };
    /** MsgRevokeAllowance message creator
     * Revokes any fee allowance of granter's account that has been granted to the grantee.
     *
     * @param object Represents the properties available for this MsgRevokeAllowance message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const RevokeAllowance: (object: FeegrantMsgs.MsgRevokeAllowance) => {
        typeUrl: string;
        value: MsgRevokeAllowance;
    };
}
/**
 * Module to generate the Messages related to the Bank module of the Blockchain
 */
export declare namespace Bank {
    /** MsgMultiSend message creator
     * Defines a method for sending coins from some accounts to other accounts.
     *
     * @param object Represents the properties available for this MsgMultiSend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const MultiSend: (object: BankMsgs.MsgMultiSend) => {
        typeUrl: string;
        value: MsgMultiSend;
    };
    /** MsgSend message creator
     * Defines a method for sending coins from one account to another account.
     *
     * @param object Represents the properties available for this MsgSend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const Send: (object: BankMsgs.MsgSend) => {
        typeUrl: string;
        value: MsgSend;
    };
    /** MsgSetSendEnabled message creator
     *
     * @param object Represents the properties available for this MsgSetSendEnabled message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const SetSendEnabled: (object: BankMsgs.MsgSetSendEnabled) => {
        typeUrl: string;
        value: MsgSetSendEnabled;
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UpdateParams: (object: BankMsgs.MsgUpdateParams) => {
        typeUrl: string;
        value: MsgUpdateParams;
    };
}
/**
 * Module to generate the Messages related to the Distribution module of the Blockchain
 */
export declare namespace Distribution {
    /** MsgWithdrawDelegatorReward message creator
     * Defines a method to withdraw rewards of delegator from a single validator.
     *
     * @param object Represents the properties available for this MsgWithdrawDelegatorReward message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const WithdrawDelegatorReward: (object: DistributionMsgs.MsgWithdrawDelegatorReward) => {
        typeUrl: string;
        value: MsgWithdrawDelegatorReward;
    };
    /** MsgUpdateParams message creator
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const UpdateParams: (object: DistributionMsgs.MsgUpdateParams) => {
        typeUrl: string;
        value: DMsgUpdateParams;
    };
    /** MsgWithdrawValidatorCommission message creator
     * Defines a method to withdraw the full commission to the validator address.
     *
     * @param object Represents the properties available for this MsgWithdrawValidatorCommission message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const WithdrawValidatorCommission: (object: DistributionMsgs.MsgWithdrawValidatorCommission) => {
        typeUrl: string;
        value: MsgWithdrawValidatorCommission;
    };
    /** MsgCommunityPoolSpend message creator
     *
     * @param object Represents the properties available for this MsgCommunityPoolSpend message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const CommunityPoolSpend: (object: DistributionMsgs.MsgCommunityPoolSpend) => {
        typeUrl: string;
        value: MsgCommunityPoolSpend;
    };
    /** MsgDepositValidatorRewardsPool message creator
     *
     * @param object Represents the properties available for this MsgDepositValidatorRewardsPool message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const DepositValidatorRewardsPool: (object: DistributionMsgs.MsgDepositValidatorRewardsPool) => {
        typeUrl: string;
        value: MsgDepositValidatorRewardsPool;
    };
    /** MsgFundCommunityPool message creator
     * Defines a method to allow an account to directly fund the community pool.
     *
     * @param object Represents the properties available for this MsgUpdateParams message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const FundCommunityPool: (object: DistributionMsgs.MsgFundCommunityPool) => {
        typeUrl: string;
        value: MsgFundCommunityPool;
    };
    /** MsgSetWithdrawAddress message creator
     * Defines a method to change the withdraw address for a delegator (or validator self-delegation).
     *
     * @param object Represents the properties available for this MsgSetWithdrawAddress message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const SetWithdrawAddress: (object: DistributionMsgs.MsgSetWithdrawAddress) => {
        typeUrl: string;
        value: MsgSetWithdrawAddress;
    };
}
/**
 * Module to generate the Messages related to the Vesting module of the Blockchain
 */
export declare namespace Vesting {
    /** MsgCreateVestingAccount message creator
     * Defines a method that enables creating a vesting account.
     *
     * @param object Represents the properties available for this MsgCreateVestingAccount message.
     * @returns A Msg object with the typeUrl and value object for the proper message
     */
    const CreateVestingAccount: (object: VestingMsgs.MsgCreateVestingAccount) => {
        typeUrl: string;
        value: MsgCreateVestingAccount;
    };
    const CreatePeriodicVestingAccount: (object: VestingMsgs.MsgCreatePeriodicVestingAccount) => {
        typeUrl: string;
        value: MsgCreatePeriodicVestingAccount;
    };
    const CreatePermanentLockedAccount: (object: VestingMsgs.MsgCreatePermanentLockedAccount) => {
        typeUrl: string;
        value: MsgCreatePermanentLockedAccount;
    };
}
