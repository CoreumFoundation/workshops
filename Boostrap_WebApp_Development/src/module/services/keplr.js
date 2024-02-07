export const connectKeplr = async (config) => {
    // Keplr extension injects the offline signer that is compatible with cosmJS.
    // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
    // And it also injects the helper function to `window.keplr`.
    // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
    }
    else {
        if (window.keplr.experimentalSuggestChain) {
            const stakingDenom = "core";
            const gasPrice = Number((config.gas_price || "").replace(config.staking_denom || "", ""));
            try {
                // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
                // cosmoshub-3 is integrated to Keplr so the code should return without errors.
                // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
                // If the user approves, the chain will be added to the user's Keplr extension.
                // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
                // If the same chain id is already registered, it will resolve and not require the user interactions.
                await window.keplr.experimentalSuggestChain({
                    // Chain-id of the Cosmos SDK chain.
                    chainId: config.chain_id,
                    // The name of the chain to be displayed to the user.
                    chainName: config.chain_name,
                    // RPC endpoint of the chain.
                    rpc: config.chain_rpc_endpoint,
                    // REST endpoint of the chain.
                    rest: config.chain_rest_endpoint,
                    // Staking coin information
                    stakeCurrency: {
                        // Coin denomination to be displayed to the user.
                        coinDenom: stakingDenom,
                        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                        coinMinimalDenom: config.staking_denom,
                        // # of decimal points to convert minimal denomination to user-facing denomination.
                        coinDecimals: 6,
                        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                        // coinGeckoId: ""
                    },
                    // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
                    // The 'stake' button in Keplr extension will link to the webpage.
                    // walletUrlForStaking: "",
                    // The BIP44 path.
                    bip44: {
                        // You can only set the coin type of BIP44.
                        // 'Purpose' is fixed to 44.
                        coinType: Number(config.coin_type),
                    },
                    // Bech32 configuration to show the address to user.
                    bech32Config: {
                        bech32PrefixAccAddr: config.chain_bech32_prefix,
                        bech32PrefixAccPub: `${config.chain_bech32_prefix}pub`,
                        bech32PrefixValAddr: `${config.chain_bech32_prefix}valoper`,
                        bech32PrefixValPub: `${config.chain_bech32_prefix}valoperpub`,
                        bech32PrefixConsAddr: `${config.chain_bech32_prefix}valcons`,
                        bech32PrefixConsPub: `${config.chain_bech32_prefix}valconspub`,
                    },
                    // List of all coin/tokens used in this chain.
                    currencies: [
                        {
                            // Coin denomination to be displayed to the user.
                            coinDenom: stakingDenom,
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: config.staking_denom,
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        },
                    ],
                    // List of coin/tokens used as a fee token in this chain.
                    feeCurrencies: [
                        {
                            // Coin denomination to be displayed to the user.
                            coinDenom: stakingDenom,
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: config.staking_denom,
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        },
                    ],
                    // (Optional) The number of the coin type.
                    // This field is only used to fetch the address from ENS.
                    // Ideally, it is recommended to be the same with BIP44 path's coin type.
                    // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
                    // So, this is separated to support such chains.
                    coinType: Number(config.coin_type),
                    // (Optional) This is used to set the fee of the transaction.
                    // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
                    // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                    // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                    gasPriceStep: {
                        low: gasPrice,
                        average: gasPrice,
                        high: gasPrice,
                    },
                });
            }
            catch (e) {
                console.log("E_SUGGESTING_CHAIN => ", e);
                alert("Failed to suggest the chain");
            }
        }
        else {
            alert("Please use the recent version of Keplr extension");
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VwbHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMva2VwbHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxNQUEyQixFQUFFLEVBQUU7SUFDaEUsNkVBQTZFO0lBQzdFLG1HQUFtRztJQUNuRyw2REFBNkQ7SUFDN0QsMkdBQTJHO0lBQzNHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1FBQzdDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDTCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUU7WUFDekMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FDckIsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDakUsQ0FBQztZQUVGLElBQUk7Z0JBQ0Ysa0hBQWtIO2dCQUNsSCwrRUFBK0U7Z0JBQy9FLG9HQUFvRztnQkFDcEcsK0VBQStFO2dCQUMvRSx5SEFBeUg7Z0JBQ3pILHFHQUFxRztnQkFDckcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDO29CQUMxQyxvQ0FBb0M7b0JBQ3BDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUTtvQkFDeEIscURBQXFEO29CQUNyRCxTQUFTLEVBQUUsTUFBTSxDQUFDLFVBQVU7b0JBQzVCLDZCQUE2QjtvQkFDN0IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7b0JBQzlCLDhCQUE4QjtvQkFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUI7b0JBQ2hDLDJCQUEyQjtvQkFDM0IsYUFBYSxFQUFFO3dCQUNiLGlEQUFpRDt3QkFDakQsU0FBUyxFQUFFLFlBQVk7d0JBQ3ZCLDJEQUEyRDt3QkFDM0QsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGFBQWE7d0JBQ3RDLG1GQUFtRjt3QkFDbkYsWUFBWSxFQUFFLENBQUM7d0JBQ2Ysc0ZBQXNGO3dCQUN0RixtRkFBbUY7d0JBQ25GLGtCQUFrQjtxQkFDbkI7b0JBQ0QsK0hBQStIO29CQUMvSCxrRUFBa0U7b0JBQ2xFLDJCQUEyQjtvQkFDM0Isa0JBQWtCO29CQUNsQixLQUFLLEVBQUU7d0JBQ0wsMkNBQTJDO3dCQUMzQyw0QkFBNEI7d0JBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztxQkFDbkM7b0JBQ0Qsb0RBQW9EO29CQUNwRCxZQUFZLEVBQUU7d0JBQ1osbUJBQW1CLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjt3QkFDL0Msa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUMsbUJBQW1CLEtBQUs7d0JBQ3RELG1CQUFtQixFQUFFLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixTQUFTO3dCQUMzRCxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsWUFBWTt3QkFDN0Qsb0JBQW9CLEVBQUUsR0FBRyxNQUFNLENBQUMsbUJBQW1CLFNBQVM7d0JBQzVELG1CQUFtQixFQUFFLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixZQUFZO3FCQUMvRDtvQkFDRCw4Q0FBOEM7b0JBQzlDLFVBQVUsRUFBRTt3QkFDVjs0QkFDRSxpREFBaUQ7NEJBQ2pELFNBQVMsRUFBRSxZQUFZOzRCQUN2QiwyREFBMkQ7NEJBQzNELGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxhQUFhOzRCQUN0QyxtRkFBbUY7NEJBQ25GLFlBQVksRUFBRSxDQUFDOzRCQUNmLHNGQUFzRjs0QkFDdEYsbUZBQW1GOzRCQUNuRixrQkFBa0I7eUJBQ25CO3FCQUNGO29CQUNELHlEQUF5RDtvQkFDekQsYUFBYSxFQUFFO3dCQUNiOzRCQUNFLGlEQUFpRDs0QkFDakQsU0FBUyxFQUFFLFlBQVk7NEJBQ3ZCLDJEQUEyRDs0QkFDM0QsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGFBQWE7NEJBQ3RDLG1GQUFtRjs0QkFDbkYsWUFBWSxFQUFFLENBQUM7NEJBQ2Ysc0ZBQXNGOzRCQUN0RixtRkFBbUY7NEJBQ25GLGtCQUFrQjt5QkFDbkI7cUJBQ0Y7b0JBQ0QsMENBQTBDO29CQUMxQyx5REFBeUQ7b0JBQ3pELHlFQUF5RTtvQkFDekUsbUZBQW1GO29CQUNuRixnREFBZ0Q7b0JBQ2hELFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDbEMsNkRBQTZEO29CQUM3RCw0SEFBNEg7b0JBQzVILGlHQUFpRztvQkFDakcsMkhBQTJIO29CQUMzSCxZQUFZLEVBQUU7d0JBQ1osR0FBRyxFQUFFLFFBQVE7d0JBQ2IsT0FBTyxFQUFFLFFBQVE7d0JBQ2pCLElBQUksRUFBRSxRQUFRO3FCQUNmO2lCQUNGLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFNLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDdEM7U0FDRjthQUFNO1lBQ0wsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDM0Q7S0FDRjtBQUNILENBQUMsQ0FBQyJ9