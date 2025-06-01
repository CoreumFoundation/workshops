import { useConnectedAccount } from "../../hooks/useAccount";
import { useAccountBalances } from "../../hooks/useBalances";
import { useDraft } from "../../hooks/useDraft";

import { FC } from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  useAccountBalances();
  useConnectedAccount();
  useDraft();
  return children;
};
