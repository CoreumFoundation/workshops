"use client";

import { useCallback } from "react";
import { Modal } from "./Modal";
import { WalletType } from "../types/Wallet";
import { WalletOption } from "../config/default";
import { WalletItem } from "./WalletItem";
import { CONNECT_WALLET_OPTIONS } from "../config/default";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsConnectModalOpen } from "../features/general/index";
import {
  WalletType as GrazWalletType,
  useDisconnect,
  useSuggestChainAndConnect,
  useConnect,
} from "graz";
import { coreummainnet } from "../providers/WalletProvider";
import Link from "next/link";

export const ConnectWalletModal = () => {
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { disconnectAsync } = useDisconnect();

  const isConnectWalletModalOpen = useAppSelector(
    (state: any) => state.general.isConnectModalOpen
  );

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsConnectModalOpen(false));
  }, []);

  const handleWalletClick = useCallback(
    async (type: WalletType) => {
      try {
        await suggestAndConnectAsync({
          chainInfo: coreummainnet,
          walletType: type as unknown as GrazWalletType,
        });
        dispatch(setIsConnectModalOpen(false));
      } catch (error) {
        console.error(error);
      }
    },
    [disconnectAsync, dispatch, suggestAndConnectAsync]
  );

  return (
    <Modal
      isOpen={isConnectWalletModalOpen}
      title="Connect Wallet"
      onClose={handleCloseConnectWalletModal}
      wrapperClassName="w-[480px]"
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONNECT_WALLET_OPTIONS.map((walletOption: WalletOption) => {
            return (
              <WalletItem
                key={walletOption.type}
                // @ts-ignore
                type={walletOption.type}
                label={walletOption.label}
                onClick={handleWalletClick}
              />
            );
          })}
        </div>

        <div className="text-center text-sm text-white/70 border-t border-white/10 pt-4">
          By connecting your wallet, you agree to our{" "}
          <Link
            href="/terms-and-conditions"
            className="text-blue-300 hover:opacity-80 transition-opacity"
            onClick={handleCloseConnectWalletModal}
          >
            Terms and Conditions
          </Link>
        </div>
      </div>
    </Modal>
  );
};
