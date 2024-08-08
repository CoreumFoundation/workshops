import { QueryClientImpl, } from "../asset/ft/v1/query";
import { createProtobufRpcClient } from "@cosmjs/stargate";
export function setupFTExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        ft: {
            params: async () => {
                return await queryService.Params({});
            },
            tokens: async (issuer, pagination) => {
                return await queryService.Tokens({ issuer, pagination });
            },
            token: async (denom) => {
                return await queryService.Token({ denom });
            },
            frozenBalances: async (account, pagination) => {
                return await queryService.FrozenBalances({ account, pagination });
            },
            frozenBalance: async (account, denom) => {
                return await queryService.FrozenBalance({ account, denom });
            },
            whitelistedBalances: async (account, pagination) => {
                return await queryService.WhitelistedBalances({ account, pagination });
            },
            whitelistedBalance: async (account, denom) => {
                return await queryService.WhitelistedBalance({ account, denom });
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZXVtL2V4dGVuc2lvbnMvZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLGVBQWUsR0FRaEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQWUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV4RSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBaUI7SUFDaEQsTUFBTSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFOUMsT0FBTztRQUNMLEVBQUUsRUFBRTtZQUNGLE1BQU0sRUFBRSxLQUFLLElBQWtDLEVBQUU7Z0JBQy9DLE9BQU8sTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxNQUFNLEVBQUUsS0FBSyxFQUNYLE1BQWMsRUFDZCxVQUF3QixFQUNNLEVBQUU7Z0JBQ2hDLE9BQU8sTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBYSxFQUErQixFQUFFO2dCQUMxRCxPQUFPLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELGNBQWMsRUFBRSxLQUFLLEVBQ25CLE9BQWUsRUFDZixVQUF3QixFQUNjLEVBQUU7Z0JBQ3hDLE9BQU8sTUFBTSxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUNELGFBQWEsRUFBRSxLQUFLLEVBQ2xCLE9BQWUsRUFDZixLQUFhLEVBQ3dCLEVBQUU7Z0JBQ3ZDLE9BQU8sTUFBTSxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQUNELG1CQUFtQixFQUFFLEtBQUssRUFDeEIsT0FBZSxFQUNmLFVBQXdCLEVBQ21CLEVBQUU7Z0JBQzdDLE9BQU8sTUFBTSxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN6RSxDQUFDO1lBQ0Qsa0JBQWtCLEVBQUUsS0FBSyxFQUN2QixPQUFlLEVBQ2YsS0FBYSxFQUM2QixFQUFFO2dCQUM1QyxPQUFPLE1BQU0sWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDbkUsQ0FBQztTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==