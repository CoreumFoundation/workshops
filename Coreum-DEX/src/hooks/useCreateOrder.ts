import { useCallback } from 'react';
import React from 'react';
import { useCoreum } from '../providers/CoreumProvider';
import { useAccount } from 'graz';
import { OrderType, Side, TimeInForce } from 'coreum-js-nightly/dist/main/coreum/dex/v1/order';
import { useDex } from './useDex';
import { DEX } from 'coreum-js-nightly';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEstimateTxGasFee } from './useEstimateTxGasFee';
import { CHAIN_ID, COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from '../constants';
import { convertPriceToDexPrice, convertUnitToSubunit } from '../utils/convertUnitToSubunit';
import { toast } from 'sonner';
import { useRefetchBalances } from './useBalances';
import dollar_sign from "../../public/dollar_sign.gif";

const generateOrderId = (side: string, baseSymbol: string, quoteSymbol: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${side}-${baseSymbol}-${quoteSymbol}-${timestamp}-${randomStr}`.toLowerCase();
};

export const useCreateOrder = () => {
  const { client } = useCoreum();
  const { data: account } = useAccount({chainId: CHAIN_ID});
  const { signingClient } = useEstimateTxGasFee();
  const { fetchOrders } = useDex();
  const { refetchBalances } = useRefetchBalances();
  const { base, quote } = useSelector((state: RootState) => state.dex.tokenPair);
    
//The currency pair represents how much of the quote currency you need to get one unit of the base currency.
//https://www.investopedia.com/terms/b/basecurrency.asp

    //Base: COREUM (what you are buying)
    //Quote: TICKET (what you are paying with)

    //base_denom - when you buy, you are buying the base_denom, when you sell, you are selling the base_denom.
    //quote_denom - when you buy, you are selling the quote_denom, when you sell, you are buying the quote_denom.



  const createOrder = useCallback(async (
    side: 'buy' | 'sell',
    amount: string,
    price: string,
    baseDenom: string,
    quoteDenom: string,
    orderType: 'market' | 'limit',
    timeInForce: string = 'Good till Cancel',
    execution: 'standard' | 'passive' = 'standard'
  ) => {
    if (!client || !account?.bech32Address || !signingClient) {
      throw new Error('Client, account, or signing client not initialized');
    }

    try {
      // Get precision from token constants
      const basePrecision = base.denom === COREUM_TOKEN_TESTNET.denom 
        ? COREUM_TOKEN_TESTNET.precision 
        : TICKET_TOKEN_TESTNET.precision;
      
      const quotePrecision = quote.denom === COREUM_TOKEN_TESTNET.denom 
        ? COREUM_TOKEN_TESTNET.precision 
        : TICKET_TOKEN_TESTNET.precision;
      
      console.log('basePrecision', basePrecision);
      console.log('quotePrecision', quotePrecision);
        console.log("price", price);
        console.log("side", side);
        console.log("amount", amount);
        console.log("baseDenom", baseDenom);
        console.log("quoteDenom", quoteDenom);
        console.log("orderType", orderType);
        console.log("timeInForce", timeInForce);
        console.log("execution", execution);
      
      //TODO: check if this is correct: 1e-6 -> 0.000001 TICKET per ucore, meaning 1 TICKET per COREUM
      const quantityInSubunit = convertUnitToSubunit({ amount, precision: basePrecision as number });
      const priceInSubunit = convertUnitToSubunit({ amount: price, precision: quotePrecision as number });
      const priceInDexPrice = convertPriceToDexPrice( price );
      console.log("priceInDexPrice", priceInDexPrice);
      
      console.log("quantityInSubunit", quantityInSubunit);
      console.log("priceInSubunit", priceInSubunit);

      const orderId = generateOrderId(side, base.symbol, quote.symbol);

      // 1. Create the order message
      const orderMsg = DEX.PlaceOrder({
        sender: account.bech32Address,
        side: side === 'buy' ? Side.SIDE_BUY : Side.SIDE_SELL,
        quantity: quantityInSubunit,
        price: priceInDexPrice,
        baseDenom: baseDenom,
        quoteDenom,
        // TODO use the right time param coming from the UI
        timeInForce: TimeInForce.TIME_IN_FORCE_GTC,
        goodTil: undefined,
        type: orderType === 'market' ? OrderType.ORDER_TYPE_MARKET : OrderType.ORDER_TYPE_LIMIT,
        id: orderId,
      });
        
      // 2. Calculate transaction fee

      const fee = {
        amount: [
          {
            denom: "ucore",
            amount: "0.044647239000471281",
          },
        ],
        gas: "1208774",
      };
      // 3. Send the transaction using the signing client
      const response = await signingClient.signAndBroadcast(
        account.bech32Address,
        [orderMsg],
        fee
      );

      // 4. Refresh orders and balances after successful creation
      fetchOrders();
      refetchBalances();

      console.log("response", response);

      if(response.code ==  0) {
        toast.success('Order created successfully! 🎉', {
        });
      } else {
        toast.error('Failed to create order', {
          description: "Insufficient balance",
          icon: React.createElement('img', { src: dollar_sign.src, alt: 'dollar sign', style: { width: '20px', height: '20px' } }),
        });
      }

      return response;
    } catch (error) {
      refetchBalances();
      fetchOrders();
      console.error('Error creating order:', error);
        toast.error('Failed to create order', {
          description: (error as Error).message,
          icon: React.createElement('img', { src: dollar_sign.src, alt: 'dollar sign', style: { width: '20px', height: '20px' } }),
        });
      
      throw error;
    }
  }, [client, account?.bech32Address, signingClient, fetchOrders, base.denom, quote.denom]);

  return { createOrder };
}; 
