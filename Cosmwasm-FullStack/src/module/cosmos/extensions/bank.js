import { QueryAllBalancesRequest } from "../bank/v1beta1/query";
import { QueryClientImpl } from "../bank/v1beta1/query";
import { createProtobufRpcClient } from "@cosmjs/stargate";
export function setupBankExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        bank: {
            balance: async (address, denom) => {
                const { balance } = await queryService.Balance({ address, denom });
                return balance;
            },
            allBalances: async (address) => {
                const { balances } = await queryService.AllBalances(QueryAllBalancesRequest.fromPartial({ address }));
                return balances;
            },
            totalSupply: async (pagination) => {
                const supplyResponse = await queryService.TotalSupply({ pagination });
                return {
                    supply: supplyResponse.supply,
                    pagination: supplyResponse.pagination,
                };
            },
            supplyOf: async (denom) => {
                const { amount } = await queryService.SupplyOf({ denom });
                return amount;
            },
            denomMetadata: async (denom) => {
                const { metadata } = await queryService.DenomMetadata({ denom });
                return metadata;
            },
            denomsMetadata: async (pagination) => {
                const { metadatas } = await queryService.DenomsMetadata({ pagination });
                return metadatas;
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3Ntb3MvZXh0ZW5zaW9ucy9iYW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQWUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV4RSxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBaUI7SUFDbEQsTUFBTSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFOUMsT0FBTztRQUNMLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBZSxFQUFFLEtBQWEsRUFBRSxFQUFFO2dCQUNoRCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ25FLE9BQU8sT0FBTyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQWUsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxDQUNqRCx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUNqRCxDQUFDO2dCQUNGLE9BQU8sUUFBUSxDQUFDO1lBQ2xCLENBQUM7WUFFRCxXQUFXLEVBQUUsS0FBSyxFQUFFLFVBQXdCLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxjQUFjLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFFdEUsT0FBTztvQkFDTCxNQUFNLEVBQUUsY0FBYyxDQUFDLE1BQU07b0JBQzdCLFVBQVUsRUFBRSxjQUFjLENBQUMsVUFBVTtpQkFDdEMsQ0FBQztZQUNKLENBQUM7WUFFRCxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQWEsRUFBRSxFQUFFO2dCQUNoQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQztZQUVELGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBYSxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUVqRSxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDO1lBRUQsY0FBYyxFQUFFLEtBQUssRUFBRSxVQUF3QixFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUV4RSxPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9