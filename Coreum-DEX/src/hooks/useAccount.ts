import { setAccount, setIsConnected } from "../features/general/index";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAccount } from "graz";
import { useEffect } from "react";
import { CHAIN_ID } from "../constants";
export const useConnectedAccount = () => {
  const { data, isConnected } = useAccount({
    chainId: CHAIN_ID,
  });
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.general.account);
  const isAccountConnected = useAppSelector(state => state.general.isConnected);

  useEffect(() => {
    if (data?.bech32Address && account !== data?.bech32Address) {
      dispatch(setAccount(data?.bech32Address));
    }
  }, [account, data?.bech32Address, isConnected]);

  useEffect(() => {
    if (isConnected !== isAccountConnected) {
      dispatch(setIsConnected(isConnected));

      if (isConnected && data?.bech32Address) {
        dispatch(setAccount(data?.bech32Address));
      } 
    }
  }, [isAccountConnected, isConnected, data?.bech32Address,account]);
};
