"use client";

import React from "react";
import ClientModalWrapper from "./ClientModalWrapper";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { useAppDispatch } from "../store/hooks";
import { setIsConnectModalOpen } from "../features/general";
import { useAccount, useDisconnect } from "graz";
import BuyTicketModal from "./BuyTicketModal";
import BurnTicketModal from "./BurnTicketModal";
import Link from "next/link";
import { CHAIN_ID } from "@/constants";

interface ClientLayoutProps {
  children: React.ReactNode;
  dollarSignSrc: string;
  xIconSrc: string;
  telegramIconSrc: string;
  questionIconSrc: string;
}

export default function ClientLayout({
  children,
  dollarSignSrc,
  xIconSrc,
  telegramIconSrc,
  questionIconSrc,
}: ClientLayoutProps) {
  const dispatch = useAppDispatch();

  const handleConnect = () => {
    dispatch(setIsConnectModalOpen(true));
  };

  const { data: account, isConnected } = useAccount({ chainId: CHAIN_ID });
  const address = account?.bech32Address;
  const { disconnect } = useDisconnect();

  return (
    <div className="flex items-center justify-center min-h-full p-4 pb-4">
      <ConnectWalletModal />
      <BuyTicketModal />
      <BurnTicketModal />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row gap-4 w-full max-w-[1000px]">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full col-span-1 lg:col-span-2 gap-4">
          {/* Logo and title */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <img
                  src={dollarSignSrc}
                  alt="Prediction Market"
                  className="rounded-lg w-20 sm:w-32 h-20 sm:h-32"
                />
                <div className="flex flex-col ml-2">
                  <span className="text-lg sm:text-xl font-bold text-white">
                    Coreum.fun
                  </span>
                  <span className="text-xs sm:text-sm text-primary font-semibold mt-1">
                    The No Loss Crypto Draft
                  </span>
                </div>
              </div>
            </Link>

            {/* Social icons for mobile */}
            <div className="flex sm:hidden gap-2 items-center">
              <ClientModalWrapper
                questionIconSrc={questionIconSrc}
                isMobile={true}
              />
              <div className="text-white  rounded-lg p-2 h-fit border-white/10 border">
                <a
                  href="https://x.com/Coreum_dot_fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src={xIconSrc} alt="X (Twitter)" className="w-4 h-4" />
                </a>
              </div>
              <div className="text-white  rounded-lg p-2 h-fit border-white/10 border">
                <a
                  href="https://t.me/coreum_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={telegramIconSrc}
                    alt="Telegram"
                    className="w-4 h-4"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Wallet and desktop social icons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Social icons for desktop */}
            <div className="hidden sm:flex gap-2 items-center">
              <ClientModalWrapper
                questionIconSrc={questionIconSrc}
                isMobile={false}
              />
              <div className="text-white rounded-lg p-2 sm:p-4 h-fit border-white/10 border">
                <a
                  href="https://x.com/coreum_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={xIconSrc}
                    alt="X (Twitter)"
                    className="w-4 h-4 sm:w-6 sm:h-6"
                  />
                </a>
              </div>
              <div className="text-white  rounded-lg p-2 sm:p-4 h-fit border-white/10 border">
                <a
                  href="https://t.me/coreum_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={telegramIconSrc}
                    alt="Telegram"
                    className="w-4 h-4 sm:w-6 sm:h-6"
                  />
                </a>
              </div>
            </div>

            {isConnected ? (
              <div
                onClick={() => disconnect()}
                className="text-white bg-indigo-900/50 rounded-lg p-2 sm:p-4 h-fit"
              >
                <span className="text-center">
                  {address?.slice(0, 6)}...{address?.slice(-10)}
                </span>
              </div>
            ) : (
              <button
                className="w-full sm:w-auto text-white bg-indigo-900/50 rounded-lg p-4 text-center hover:bg-indigo-900/80 transition-colors"
                onClick={() => handleConnect()}
              >
                <span className="text-center">Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
