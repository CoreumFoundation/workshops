import { QueryClientImpl, } from "../nft/v1beta1/query";
import { createProtobufRpcClient } from "@cosmjs/stargate";
export function setupNFTBetaExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        nftbeta: {
            balance: async (class_id, owner) => {
                return await queryService.Balance({ classId: class_id, owner });
            },
            owner: async (class_id, nft_id) => {
                return await queryService.Owner({
                    classId: class_id,
                    id: nft_id,
                });
            },
            supply: async (class_id) => {
                return await queryService.Supply({ classId: class_id });
            },
            nfts: async (class_id, owner, pagination) => {
                return await queryService.NFTs({
                    classId: class_id,
                    owner,
                    pagination,
                });
            },
            nft: async (nft_id, class_id) => {
                return await queryService.NFT({ classId: class_id, id: nft_id });
            },
            class: async (class_id) => {
                return await queryService.Class({ classId: class_id });
            },
            classes: async (pagination) => {
                return await queryService.Classes({ pagination });
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0YmV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JldW0vZXh0ZW5zaW9ucy9uZnRiZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxlQUFlLEdBUWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFlLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEUsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQWlCO0lBQ3JELE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLE9BQU87UUFDTCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsS0FBSyxFQUNaLFFBQWdCLEVBQ2hCLEtBQWEsRUFDa0IsRUFBRTtnQkFDakMsT0FBTyxNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLEVBQ1YsUUFBZ0IsRUFDaEIsTUFBYyxFQUNlLEVBQUU7Z0JBQy9CLE9BQU8sTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO29CQUM5QixPQUFPLEVBQUUsUUFBUTtvQkFDakIsRUFBRSxFQUFFLE1BQU07aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBZ0IsRUFBZ0MsRUFBRTtnQkFDL0QsT0FBTyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBQ0QsSUFBSSxFQUFFLEtBQUssRUFDVCxRQUFnQixFQUNoQixLQUFhLEVBQ2IsVUFBd0IsRUFDSSxFQUFFO2dCQUM5QixPQUFPLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDN0IsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLEtBQUs7b0JBQ0wsVUFBVTtpQkFDWCxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsR0FBRyxFQUFFLEtBQUssRUFDUixNQUFjLEVBQ2QsUUFBZ0IsRUFDVyxFQUFFO2dCQUM3QixPQUFPLE1BQU0sWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBZ0IsRUFBK0IsRUFBRTtnQkFDN0QsT0FBTyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsT0FBTyxFQUFFLEtBQUssRUFDWixVQUF3QixFQUNPLEVBQUU7Z0JBQ2pDLE9BQU8sTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9