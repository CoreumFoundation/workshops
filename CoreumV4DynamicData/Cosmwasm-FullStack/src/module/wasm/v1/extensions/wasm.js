import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryClientImpl, } from "../query";
export function setupWasmExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        wasm: {
            smartContractState: async (request) => {
                return await queryService.SmartContractState(request);
            },
            rawContractState: async (request) => {
                return await queryService.RawContractState(request);
            },
            pinnedCodes: async (request) => {
                return await queryService.PinnedCodes(request);
            },
            contractsByCreator: async (request) => {
                return await queryService.ContractsByCreator(request);
            },
            contractsByCode: async (request) => {
                return await queryService.ContractsByCode(request);
            },
            contractInfo: async (request) => {
                return await queryService.ContractInfo(request);
            },
            contractHistory: async (request) => {
                return await queryService.ContractHistory(request);
            },
            allContractState: async (request) => {
                return await queryService.AllContractState(request);
            },
            params: async (request) => {
                return await queryService.Params(request);
            },
            code: async (request) => {
                return await queryService.Code(request);
            },
            codes: async (request) => {
                return await queryService.Codes(request);
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93YXNtL3YxL2V4dGVuc2lvbnMvd2FzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RSxPQUFPLEVBR0wsZUFBZSxHQXFCaEIsTUFBTSxVQUFVLENBQUM7QUFFbEIsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQWlCO0lBQ2xELE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLE9BQU87UUFDTCxJQUFJLEVBQUU7WUFDSixrQkFBa0IsRUFBRSxLQUFLLEVBQ3ZCLE9BQXVDLEVBQ0csRUFBRTtnQkFDNUMsT0FBTyxNQUFNLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBRUQsZ0JBQWdCLEVBQUUsS0FBSyxFQUNyQixPQUFxQyxFQUNHLEVBQUU7Z0JBQzFDLE9BQU8sTUFBTSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUVELFdBQVcsRUFBRSxLQUFLLEVBQ2hCLE9BQWdDLEVBQ0csRUFBRTtnQkFDckMsT0FBTyxNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUVELGtCQUFrQixFQUFFLEtBQUssRUFDdkIsT0FBdUMsRUFDRyxFQUFFO2dCQUM1QyxPQUFPLE1BQU0sWUFBWSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFFRCxlQUFlLEVBQUUsS0FBSyxFQUNwQixPQUFvQyxFQUNHLEVBQUU7Z0JBQ3pDLE9BQU8sTUFBTSxZQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxZQUFZLEVBQUUsS0FBSyxFQUNqQixPQUFpQyxFQUNHLEVBQUU7Z0JBQ3RDLE9BQU8sTUFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFFRCxlQUFlLEVBQUUsS0FBSyxFQUNwQixPQUFvQyxFQUNHLEVBQUU7Z0JBQ3pDLE9BQU8sTUFBTSxZQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxnQkFBZ0IsRUFBRSxLQUFLLEVBQ3JCLE9BQXFDLEVBQ0csRUFBRTtnQkFDMUMsT0FBTyxNQUFNLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBRUQsTUFBTSxFQUFFLEtBQUssRUFDWCxPQUEyQixFQUNHLEVBQUU7Z0JBQ2hDLE9BQU8sTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFFRCxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQXlCLEVBQThCLEVBQUU7Z0JBQ3BFLE9BQU8sTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFFRCxLQUFLLEVBQUUsS0FBSyxFQUNWLE9BQTBCLEVBQ0csRUFBRTtnQkFDL0IsT0FBTyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsQ0FBQztTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==