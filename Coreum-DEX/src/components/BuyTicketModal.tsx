"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Modal } from "./Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsTxExecuting, setIsBuyTicketModalOpen } from "../features/general";
import Image from "next/image";
import dollorSign from "../../public/dollar_sign.gif";
import ticketIcon from "../assets/ticket.webp";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  COREUM_TOKEN_TESTNET,
  CHAIN_ID,
  COREUM_DOT_FUN_CONTRACT_ADDRESS,
  COREUM_DOT_FUN_TICKET_PRICE,
} from "../constants";
import { selectFormattedBalanceByDenom } from "../features/balances";
import { CoreumDotFunClient } from "../ts/CoreumDotFun.client";
import { TICKET_TOKEN_TESTNET } from "../constants";
import { useEstimateTxGasFee } from "../hooks/useEstimateTxGasFee";
import { useAccount } from "graz";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import { coreumRegistry, cosmwasmRegistry } from "coreum-js-nightly";
import { useDraft } from "../hooks/useDraft";
import { useRefetchBalances } from "../hooks/useBalances";
import { toast } from "sonner";
import { usePriceData } from "../hooks/usePriceData";
import BuyTicketSuccessModal from "./BuyTicketSuccessModal";

const registryTypes = [
  ...defaultRegistryTypes,
  ...coreumRegistry,
  ...cosmwasmRegistry,
];
const registry = new Registry(registryTypes);

export const BuyTicketModal: React.FC = () => {
  const { data: account } = useAccount({ chainId: CHAIN_ID });
  const { signingClient } = useEstimateTxGasFee();
  const { numberOfTicketsSold, refetchAll } = useDraft();
  const { refetchBalances } = useRefetchBalances();
  const { coreumPrice } = usePriceData();

  const [ticketCount, setTicketCount] = useState<number>(1);
  const [amount, setAmount] = useState<number>(200);
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state: any) => state.general.isConnected);
  const isBuyTicketModalOpen = useAppSelector(
    (state) => state.general.isBuyTicketModalOpen
  );
  const coreumBalance = useSelector(
    selectFormattedBalanceByDenom(COREUM_TOKEN_TESTNET.denom)
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>();
  const [lastTicketCount, setLastTicketCount] = useState<number>(1);
  const [lastAmount, setLastAmount] = useState<number>(200);

  // Calculate win rate based on selected tickets
  const calculateWinRate = () => {
    if (!numberOfTicketsSold?.total_tickets) return "0";
    const totalTickets = parseFloat(numberOfTicketsSold.total_tickets);
    if (totalTickets === 0) return "0";
    return ((ticketCount / totalTickets) * 100).toFixed(2);
  };

  // Update amount whenever ticket count changes
  useEffect(() => {
    setAmount(ticketCount * 200);
  }, [ticketCount]);

  const handleTicketSelect = (count: number) => {
    setTicketCount(count);
  };

  const handleBuyTickets = useCallback(async () => {
    if (!isConnected) {
      return;
    }

    try {
      dispatch(setIsTxExecuting(true));
      toast.loading("Processing your ticket purchase...", {
        id: "buy-tickets",
        icon: React.createElement("img", {
          src: dollorSign.src,
          alt: "dollar sign",
          style: { width: "20px", height: "20px" },
        }),
      });

      if (!signingClient || !account?.bech32Address) {
        throw new Error("Client or account not initialized");
      }

      const funds: Coin = {
        denom: COREUM_TOKEN_TESTNET.denom,
        amount: (Number(COREUM_DOT_FUN_TICKET_PRICE) * ticketCount).toString(),
      };

      const fee = {
        amount: [
          {
            denom: "ucore",
            amount: "0.044647239000471281",
          },
        ],
        gas: "1208774",
      };

      const coreumDotFunClient = new CoreumDotFunClient(
        signingClient as unknown as SigningCosmWasmClient,
        account.bech32Address,
        COREUM_DOT_FUN_CONTRACT_ADDRESS
      );

      const result = await coreumDotFunClient.buyTicket(
        { numberOfTickets: ticketCount.toString() },
        fee,
        account.bech32Address,
        [funds]
      );

      // Store transaction hash and values for success modal
      if (result.transactionHash) {
        setLastTxHash(result.transactionHash);
      }
      setLastTicketCount(ticketCount);
      setLastAmount(amount);

      // Show success toast
      toast.success("Tickets purchased successfully!", {
        id: "buy-tickets",
        icon: React.createElement("img", {
          src: dollorSign.src,
          alt: "dollar sign",
          style: { width: "20px", height: "20px" },
        }),
      });

      // Refetch all data after successful purchase
      await Promise.all([refetchAll(), refetchBalances()]);

      // Show success modal
      setIsSuccessModalOpen(true);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to buy tickets:", error);
      await Promise.all([refetchAll(), refetchBalances()]);

      // Show error toast
      toast.error("Failed to buy tickets", {
        id: "buy-tickets",
        description: (error as Error).message,
        icon: React.createElement("img", {
          src: dollorSign.src,
          alt: "dollar sign",
          style: { width: "20px", height: "20px" },
        }),
      });
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  }, [
    ticketCount,
    amount,
    isConnected,
    dispatch,
    signingClient,
    account,
    refetchAll,
    refetchBalances,
  ]);

  const handleCloseModal = () => {
    dispatch(setIsBuyTicketModalOpen(false));
  };

  return (
    <>
      <Modal
        isOpen={isBuyTicketModalOpen}
        title={"BUY TICKET"}
        onClose={handleCloseModal}
        wrapperClassName="w-[480px] bg-gray-700/90"
      >
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <Image
              src={dollorSign.src}
              alt="Dollar"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>

          <div className="w-full mb-6">
            <div className="flex items-center mb-2">
              <Image
                src={ticketIcon.src}
                alt="Ticket"
                width={24}
                height={24}
                className="mr-2"
              />
              <label className="text-white">Number of tickets</label>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleTicketSelect(num)}
                  className={`py-2 rounded-lg ${
                    ticketCount === num
                      ? "bg-primary text-white"
                      : "bg-indigo-700/50 text-gray-300 hover:bg-indigo-600/80 ease-in-out duration-300"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <p>Win Rate: {calculateWinRate()}%</p>
              <p>
                Tickets Remaining:{" "}
                {numberOfTicketsSold?.tickets_remaining || "0"}
              </p>
              <p className="text-gray-400">
                Info: Maximum 5 tickets per wallet
              </p>
            </div>
          </div>

          <div className="w-full mb-6">
            <label className="block text-white mb-2">
              Amount (200 COREUM per ticket)
            </label>
            <div className="flex items-center bg-indigo-700/50 rounded-lg">
              <div className="ml-4 flex items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4869 1.66681C13.8323 1.80548 16.3985 3.20954 18.0653 6.04654C18.8747 7.42748 19.2225 8.93552 19.0905 10.5072C18.8327 13.5868 17.2799 15.8979 14.4619 17.3829C13.0529 18.1225 11.5241 18.4172 9.92928 18.3132C7.8848 18.1803 6.09812 17.4408 4.58723 16.1002C4.35341 15.8922 4.35341 15.8806 4.58723 15.6611C5.46859 14.8117 6.34994 13.9682 7.21929 13.113C7.36319 12.9685 7.44712 12.957 7.615 13.1015C9.7614 14.9157 13.0649 14.3148 14.33 11.8534C15.703 9.18399 13.8503 6.19099 10.9665 5.88475C9.68352 5.74608 8.56829 6.11009 7.60301 6.91323C7.45312 7.03458 7.37517 7.04035 7.23728 6.91323C6.34394 6.04075 5.44461 5.17406 4.53328 4.30735C4.3774 4.16291 4.40137 4.07046 4.54527 3.93756C5.42662 3.1402 6.43987 2.55085 7.57303 2.15794C8.51433 1.83438 9.47963 1.67836 10.4869 1.66681Z"
                    fill="white"
                  />
                  <path
                    d="M13.0399 9.8956C13.0399 11.1927 11.9971 12.255 10.7065 12.255C9.3899 12.255 8.3405 11.2187 8.33398 9.90855C8.33398 8.61149 9.37683 7.54913 10.6674 7.54913C11.984 7.54913 13.0333 8.58549 13.0399 9.8956Z"
                    fill="white"
                  />
                </svg>
              </div>
              <input
                type="number"
                value={amount}
                readOnly
                className="w-full bg-transparent text-white p-3 focus:outline-none"
              />
            </div>
            <p className="text-gray-400 mt-1">
              ≈ ${(amount * (coreumPrice || 0)).toFixed(2)} USD
            </p>
          </div>

          <button
            onClick={handleBuyTickets}
            disabled={!isConnected}
            className="w-full py-4 bg-primary/80 hover:bg-primary rounded-lg font-medium text-white transition-colors"
          >
            BUY {ticketCount} TICKET{ticketCount > 1 ? "S" : ""}
          </button>
        </div>
      </Modal>
      <BuyTicketSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        ticketCount={lastTicketCount}
        amount={lastAmount}
        txHash={lastTxHash}
      />
    </>
  );
};

export default BuyTicketModal;
