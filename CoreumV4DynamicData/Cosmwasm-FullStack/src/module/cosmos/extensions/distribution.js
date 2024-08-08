import { QueryClientImpl } from "../distribution/v1beta1/query";
import { createProtobufRpcClient } from "@cosmjs/stargate";
export function setupDistributionExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        distribution: {
            communityPool: async () => {
                const response = await queryService.CommunityPool({});
                return { ...response };
            },
            delegationRewards: async (delegator, validator) => {
                const response = await queryService.DelegationRewards({
                    delegatorAddress: delegator,
                    validatorAddress: validator,
                });
                return { ...response };
            },
            delegationTotalRewards: async (delegator) => {
                const response = await queryService.DelegationTotalRewards({
                    delegatorAddress: delegator,
                });
                return { ...response };
            },
            delegatorValidators: async (delegator) => {
                const response = await queryService.DelegatorValidators({
                    delegatorAddress: delegator,
                });
                return { ...response };
            },
            delegatorWithdrawAddress: async (delegator) => {
                const response = await queryService.DelegatorWithdrawAddress({
                    delegatorAddress: delegator,
                });
                return { ...response };
            },
            params: async () => {
                const response = await queryService.Params({});
                return { ...response };
            },
            validatorCommission: async (validator) => {
                const response = await queryService.ValidatorCommission({
                    validatorAddress: validator,
                });
                return { ...response };
            },
            validatorOutstandingRewards: async (validator) => {
                const response = await queryService.ValidatorOutstandingRewards({
                    validatorAddress: validator,
                });
                return { ...response };
            },
            validatorSlashes: async (validator, starting_height, ending_height, pagination) => {
                const response = await queryService.ValidatorSlashes({
                    validatorAddress: validator,
                    startingHeight: starting_height,
                    endingHeight: ending_height,
                    pagination,
                });
                return { ...response };
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdHJpYnV0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nvc21vcy9leHRlbnNpb25zL2Rpc3RyaWJ1dGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFlLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEUsTUFBTSxVQUFVLDBCQUEwQixDQUFDLElBQWlCO0lBQzFELE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLE9BQU87UUFDTCxZQUFZLEVBQUU7WUFDWixhQUFhLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLE1BQU0sUUFBUSxHQUFHLE1BQU0sWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUNELGlCQUFpQixFQUFFLEtBQUssRUFBRSxTQUFpQixFQUFFLFNBQWlCLEVBQUUsRUFBRTtnQkFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsaUJBQWlCLENBQUM7b0JBQ3BELGdCQUFnQixFQUFFLFNBQVM7b0JBQzNCLGdCQUFnQixFQUFFLFNBQVM7aUJBQzVCLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0Qsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtnQkFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsc0JBQXNCLENBQUM7b0JBQ3pELGdCQUFnQixFQUFFLFNBQVM7aUJBQzVCLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0QsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsbUJBQW1CLENBQUM7b0JBQ3RELGdCQUFnQixFQUFFLFNBQVM7aUJBQzVCLENBQUMsQ0FBQztnQkFDSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0Qsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtnQkFDcEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsd0JBQXdCLENBQUM7b0JBQzNELGdCQUFnQixFQUFFLFNBQVM7aUJBQzVCLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0QsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRS9DLE9BQU8sRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUMvQyxNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztvQkFDdEQsZ0JBQWdCLEVBQUUsU0FBUztpQkFDNUIsQ0FBQyxDQUFDO2dCQUVILE9BQU8sRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFDRCwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQywyQkFBMkIsQ0FBQztvQkFDOUQsZ0JBQWdCLEVBQUUsU0FBUztpQkFDNUIsQ0FBQyxDQUFDO2dCQUVILE9BQU8sRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxnQkFBZ0IsRUFBRSxLQUFLLEVBQ3JCLFNBQWlCLEVBQ2pCLGVBQXVCLEVBQ3ZCLGFBQXFCLEVBQ3JCLFVBQXdCLEVBQ3hCLEVBQUU7Z0JBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsZ0JBQWdCLENBQUM7b0JBQ25ELGdCQUFnQixFQUFFLFNBQVM7b0JBQzNCLGNBQWMsRUFBRSxlQUFlO29CQUMvQixZQUFZLEVBQUUsYUFBYTtvQkFDM0IsVUFBVTtpQkFDWCxDQUFDLENBQUM7Z0JBRUgsT0FBTyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDekIsQ0FBQztTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==