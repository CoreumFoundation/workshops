import { cosmos } from "@cosmostation/extension-client";
import { getOfflineSigner } from "@cosmostation/cosmos-client";
export const connectCosmostation = async (config) => {
    try {
        const provider = await cosmos();
        const gasPrice = (config.gas_price || "").replace(config.staking_denom || "", "");
        await provider.addChain({
            chainId: config.chain_id,
            chainName: config.chain_name,
            addressPrefix: config.chain_bech32_prefix,
            baseDenom: config.staking_denom,
            displayDenom: "core",
            restURL: config.chain_rest_endpoint,
            coinType: String(config.coin_type),
            decimals: 6,
            gasRate: {
                average: gasPrice,
                low: gasPrice,
                tiny: gasPrice,
            },
        });
    }
    catch (e) {
        throw {
            thrower: e.thrower || "connectCosmostation",
            error: e,
        };
    }
};
export const getCosmosOfflineSigner = async (chain_id) => {
    try {
        return await getOfflineSigner(chain_id);
    }
    catch (e) {
        throw {
            thrower: e.thrower || "getCosmosOfflineSigner",
            error: e,
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zbW9zdGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2Nvc21vc3RhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHL0QsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUFFLE1BQTJCLEVBQUUsRUFBRTtJQUN2RSxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLEVBQUUsQ0FBQztRQUVoQyxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUMvQyxNQUFNLENBQUMsYUFBYSxJQUFJLEVBQUUsRUFDMUIsRUFBRSxDQUNILENBQUM7UUFFRixNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDdEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3hCLFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVTtZQUM1QixhQUFhLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtZQUN6QyxTQUFTLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDL0IsWUFBWSxFQUFFLE1BQU07WUFDcEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUI7WUFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xDLFFBQVEsRUFBRSxDQUFDO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixHQUFHLEVBQUUsUUFBUTtnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLENBQU0sRUFBRTtRQUNmLE1BQU07WUFDSixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxxQkFBcUI7WUFDM0MsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQ3pDLFFBQWdCLEVBQ1EsRUFBRTtJQUMxQixJQUFJO1FBQ0YsT0FBTyxNQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3pDO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixNQUFNO1lBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksd0JBQXdCO1lBQzlDLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDIn0=