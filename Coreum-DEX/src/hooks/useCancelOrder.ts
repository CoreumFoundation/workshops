import React, { useCallback } from 'react';
import { useCoreum } from '../providers/CoreumProvider';
import { useAccount } from 'graz';
import { useDex } from './useDex';
import { DEX } from 'coreum-js-nightly';
import { useEstimateTxGasFee } from './useEstimateTxGasFee';
import { toast } from 'sonner';
import { useRefetchBalances } from './useBalances';
import dollar_sign from "../../public/dollar_sign.gif";
import { CHAIN_ID } from '@/constants';

export const useCancelOrder = () => {
  const { client } = useCoreum();
  const { data: account } = useAccount({chainId: CHAIN_ID});
  const { signingClient } = useEstimateTxGasFee();
  const { fetchOrders } = useDex();
  const { refetchBalances } = useRefetchBalances();

  const cancelOrder = useCallback(async (orderId: string) => {
    if (!client || !account?.bech32Address || !signingClient) {
      throw new Error('Client, account, or signing client not initialized');
    }

    try {
      // Create the cancel order message
      const cancelOrderMsg = DEX.CancelOrder({
        sender: account.bech32Address,
        id: orderId,
      });

      // Calculate transaction fee

         const fee = {
        amount: [
          {
            denom: "ucore",
            amount: "0.044647239000471281",
          },
        ],
        gas: "1208774",
      };

      // Send the transaction using the signing client
      const response = await signingClient.signAndBroadcast(
        account.bech32Address,
        [cancelOrderMsg],
        fee
      );

      // Refresh orders and balances after successful cancellation
      fetchOrders();
      refetchBalances();

      toast.success('Order cancelled successfully! 🎉', {
        description: `Order ID: ${orderId}`,
        icon: React.createElement('img', { src: dollar_sign.src, alt: 'dollar sign', style: { width: '20px', height: '20px' } }),
      });

      return response;
    } catch (error) {
      console.error('Error cancelling order:', error);
      
      // Only show success toast for the specific "Invalid string" error
      if ((error as Error).message === 'Invalid string. Length must be a multiple of 4') {
        // Refresh orders and balances even in this case
        fetchOrders();
        refetchBalances();
        
        toast.success('Order cancelled successfully! 🎉', {
          description: `Order ID: ${orderId}`,
          icon: React.createElement('img', { src: dollar_sign.src, alt: 'dollar sign', style: { width: '20px', height: '20px' } }),
        });
      } else {
        toast.error('Failed to cancel order', {
          description: (error as Error).message,
          icon: React.createElement('img', { src: dollar_sign.src, alt: 'dollar sign', style: { width: '20px', height: '20px' } }),
        });
      }
      throw error;
    }
  }, [client, account?.bech32Address, signingClient, fetchOrders]);

  return { cancelOrder };
};
