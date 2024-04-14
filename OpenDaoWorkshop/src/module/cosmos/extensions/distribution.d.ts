import { PageRequest } from "../distribution/v1beta1/pagination";
import { QueryClient } from "@cosmjs/stargate";
export declare function setupDistributionExtension(base: QueryClient): {
    distribution: {
        communityPool: () => Promise<{
            pool: import("../base/v1beta1/coin").DecCoin[];
        }>;
        delegationRewards: (delegator: string, validator: string) => Promise<{
            rewards: import("../base/v1beta1/coin").DecCoin[];
        }>;
        delegationTotalRewards: (delegator: string) => Promise<{
            rewards: import("../distribution/v1beta1/distribution").DelegationDelegatorReward[];
            total: import("../base/v1beta1/coin").DecCoin[];
        }>;
        delegatorValidators: (delegator: string) => Promise<{
            validators: string[];
        }>;
        delegatorWithdrawAddress: (delegator: string) => Promise<{
            withdrawAddress: string;
        }>;
        params: () => Promise<{
            params: import("../distribution/v1beta1/distribution").Params;
        }>;
        validatorCommission: (validator: string) => Promise<{
            commission: import("../distribution/v1beta1/distribution").ValidatorAccumulatedCommission;
        }>;
        validatorOutstandingRewards: (validator: string) => Promise<{
            rewards: import("../distribution/v1beta1/distribution").ValidatorOutstandingRewards;
        }>;
        validatorSlashes: (validator: string, starting_height: number, ending_height: number, pagination?: PageRequest) => Promise<{
            slashes: import("../distribution/v1beta1/distribution").ValidatorSlashEvent[];
            pagination: import("../distribution/v1beta1/pagination").PageResponse;
        }>;
    };
};
