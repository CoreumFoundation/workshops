import { QueryClientImpl, } from "../asset/nft/v1/query";
import { createProtobufRpcClient } from "@cosmjs/stargate";
export function setupNFTExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        nft: {
            params: async () => {
                return await queryService.Params({});
            },
            class: async (class_id) => {
                return await queryService.Class({ id: class_id });
            },
            frozen: async (nft_id, class_id) => {
                return await queryService.Frozen({ id: nft_id, classId: class_id });
            },
            whitelisted: async (nft_id, class_id, account) => {
                return await queryService.Whitelisted({
                    id: nft_id,
                    classId: class_id,
                    account,
                });
            },
            whitelistedAccountsForNFT: async (nft_id, class_id, pagination) => {
                return await queryService.WhitelistedAccountsForNFT({
                    id: nft_id,
                    classId: class_id,
                    pagination,
                });
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmV1bS9leHRlbnNpb25zL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBS0wsZUFBZSxHQUVoQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBZSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhFLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFpQjtJQUNqRCxNQUFNLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU5QyxPQUFPO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsTUFBTSxFQUFFLEtBQUssSUFBa0MsRUFBRTtnQkFDL0MsT0FBTyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBZ0IsRUFBK0IsRUFBRTtnQkFDN0QsT0FBTyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDO1lBQ0QsTUFBTSxFQUFFLEtBQUssRUFDWCxNQUFjLEVBQ2QsUUFBZ0IsRUFDYyxFQUFFO2dCQUNoQyxPQUFPLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELFdBQVcsRUFBRSxLQUFLLEVBQ2hCLE1BQWMsRUFDZCxRQUFnQixFQUNoQixPQUFlLEVBQ29CLEVBQUU7Z0JBQ3JDLE9BQU8sTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDO29CQUNwQyxFQUFFLEVBQUUsTUFBTTtvQkFDVixPQUFPLEVBQUUsUUFBUTtvQkFDakIsT0FBTztpQkFDUixDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QseUJBQXlCLEVBQUUsS0FBSyxFQUM5QixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsVUFBd0IsRUFDeUIsRUFBRTtnQkFDbkQsT0FBTyxNQUFNLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQztvQkFDbEQsRUFBRSxFQUFFLE1BQU07b0JBQ1YsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLFVBQVU7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==