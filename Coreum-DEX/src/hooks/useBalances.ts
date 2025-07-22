import { fetchBalancesByAccount, setBalances, shouldRefetchBalances } from "../features/balances/";
import { setAccount } from "../features/general";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";

export const useRefetchBalances = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.general.account);
  const isLoading = useAppSelector(state => state.balances.isLoading);

  const refetchBalances = () => {
    if (account.length && !isLoading) {
      dispatch(fetchBalancesByAccount({ account }));
    }
  };

  return { refetchBalances };
};

export const useAccountBalances = () => {
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const shouldRefetch = useAppSelector(state => state.balances.shouldRefetch);
  const network = useAppSelector(state => state.general.network);

  const dispatch = useAppDispatch();

  const isBalancesFetched = useAppSelector(state => state.balances.isFetched);
  const isLoading = useAppSelector(state => state.balances.isLoading);
  const balances = useAppSelector(state => state.balances.list);

  useEffect(() => {
    if (!isConnected) {
      // Reset balances when disconnected
      dispatch(setBalances([]));
    } else if (isConnected && account.length && !isLoading) {
      // Fetch balances when connected and account is available
      // This will trigger on both initial connection and reconnection
      dispatch(fetchBalancesByAccount({ account }));
    }
  }, [account, dispatch, isConnected, isLoading, network]);

  useEffect(() => {
    if (shouldRefetch && !isLoading && account.length) {
      dispatch(fetchBalancesByAccount({ account }));
      dispatch(shouldRefetchBalances(false));
    }
  }, [shouldRefetch, isLoading, dispatch, account, network]);
};
