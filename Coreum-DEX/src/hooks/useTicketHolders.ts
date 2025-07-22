import { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'; 
import { fetchTicketHolders } from '../features/tickets/ticketsSlice';
import { TICKET_TOKEN_TESTNET } from "../constants";


export const useTicketHolders = () => {
  const dispatch = useAppDispatch();
  const { holders, isLoading, error } = useAppSelector((state) => state.tickets);
    const [isInitialized, setIsInitialized] = useState(false);

  const refetch = useCallback(() => {
    dispatch(fetchTicketHolders(TICKET_TOKEN_TESTNET.denom));
  }, [dispatch]);

  const initialFetch = useCallback(() => {
    if (!isInitialized) {
      refetch();
      setIsInitialized(true);
    }
  }, [isInitialized, refetch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return {
    holders,
    isLoading,
    error,
    refetch,
    initialFetch,
    isInitialized,
  };
}; 
