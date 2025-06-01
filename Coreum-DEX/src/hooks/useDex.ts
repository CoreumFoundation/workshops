import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCoreum } from '../providers/CoreumProvider';
import { useAccount } from 'graz';
import { fetchOpenOrders, fetchOrderHistory } from '../features/dex';
import type { Client } from 'coreum-js-nightly';
import { RootState } from '../store/store';
import { CHAIN_ID } from '@/constants';

export const useDex = () => {
  const dispatch = useDispatch();
  const { client } = useCoreum();
  const { data: account } = useAccount({chainId: CHAIN_ID});
  const { base, quote } = useSelector((state: RootState) => state.dex.tokenPair);

  const fetchOrders = useCallback(() => {
    if (account?.bech32Address && client) {
      dispatch(
        fetchOpenOrders({
          queryClient: client as Client,
          address: account.bech32Address,
        }) as any
      );
    }
  }, [client, account?.bech32Address, dispatch]);

  // Refetch orders when token pair changes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, base.denom, quote.denom]);

  const fetchHistory = useCallback(() => {
    if (account?.bech32Address && client) {
      dispatch(
        fetchOrderHistory({
          queryClient: client as Client,
          address: account.bech32Address,
        }) as any
      );
    }
  }, [client, account?.bech32Address, dispatch]);

  return {
    fetchOrders,
    fetchHistory,
  };
}; 
