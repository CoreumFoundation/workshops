"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Modal } from "./Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setIsTxExecuting,
  setIsBurnTicketModalOpen,
} from "../features/general";
import Image from "next/image";
import ticketIcon from "../assets/ticket.webp";
import dollorSign from "../../public/dollar_sign.gif";
import coreum_logo from "../../public/coreum.svg";

import {
  CHAIN_ID,
  COREUM_DOT_FUN_CONTRACT_ADDRESS,
  TICKET_TOKEN_TESTNET,
} from "../constants";
import { useAccount } from "graz";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useDraft } from "../hooks/useDraft";
import { useRefetchBalances } from "../hooks/useBalances";
import { toast } from "sonner";
import { CoreumDotFunClient } from "../ts/CoreumDotFun.client";
import { useEstimateTxGasFee } from "../hooks/useEstimateTxGasFee";
import { Coin } from "@cosmjs/amino";
import BurnTicketSuccessModal from "./BurnTicketSuccessModal";

export const BurnTicketModal: React.FC = () => {
  const { data: account } = useAccount({ chainId: CHAIN_ID });
  const { signingClient } = useEstimateTxGasFee();
  const { userTickets, refetchAll } = useDraft();
  const { refetchBalances } = useRefetchBalances();

  const [burnCount, setBurnCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state: any) => state.general.isConnected);
  const isBurnTicketModalOpen = useAppSelector(
    (state) => state.general.isBurnTicketModalOpen
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastBurnCount, setLastBurnCount] = useState<number>(1);
  const [lastTxHash, setLastTxHash] = useState<string>();
  const [lastAmount, setLastAmount] = useState<number>(0);

  const maxBurnable = Number(userTickets?.tickets || 0);

  useEffect(() => {
    setBurnCount(maxBurnable);
  }, [maxBurnable]);

  const handleBurnTickets = useCallback(async () => {
    if (!isConnected) {
      return;
    }
    try {
      dispatch(setIsTxExecuting(true));
      toast.loading("Processing your ticket burn...", {
        id: "burn-tickets",
        icon: React.createElement("img", {
          src: ticketIcon.src,
          alt: "ticket icon",
          style: { width: "20px", height: "20px" },
        }),
      });
      if (!signingClient || !account?.bech32Address) {
        throw new Error("Client or account not initialized");
      }

      const fee = {
        amount: [
          {
            denom: "ucore",
            amount: "0.044647239000471281",
          },
        ],
        gas: "1208774",
      };

      const funds: Coin = {
        denom: TICKET_TOKEN_TESTNET.denom,
        amount: (
          10 ** (TICKET_TOKEN_TESTNET.precision || 6) *
          maxBurnable
        ).toString(),
      };

      const coreumDotFunClient = new CoreumDotFunClient(
        signingClient as unknown as SigningCosmWasmClient,
        account.bech32Address,
        COREUM_DOT_FUN_CONTRACT_ADDRESS
      );

      const result = await coreumDotFunClient.burnTickets(
        {
          numberOfTickets: maxBurnable.toString(),
        },
        fee,
        account.bech32Address,
        [funds]
      );
      if (result.transactionHash) {
        setLastTxHash(result.transactionHash);
      }
      setLastBurnCount(maxBurnable);
      setLastAmount(maxBurnable * 200); // 200 COREUM per ticket
      toast.success("Tickets burned successfully!", {
        id: "burn-tickets",
        icon: React.createElement("img", {
          src: ticketIcon.src,
          alt: "ticket icon",
          style: { width: "20px", height: "20px" },
        }),
      });
      await Promise.all([refetchAll(), refetchBalances()]);
      setIsSuccessModalOpen(true);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to burn tickets:", error);
      await Promise.all([refetchAll(), refetchBalances()]);
      toast.error("Failed to burn tickets", {
        id: "burn-tickets",
        description: (error as Error).message,
        icon: React.createElement("img", {
          src: ticketIcon.src,
          alt: "ticket icon",
          style: { width: "20px", height: "20px" },
        }),
      });
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  }, [
    maxBurnable,
    isConnected,
    dispatch,
    signingClient,
    account,
    refetchAll,
    refetchBalances,
  ]);

  const handleCloseModal = () => {
    dispatch(setIsBurnTicketModalOpen(false));
  };

  return (
    <>
      <Modal
        isOpen={isBurnTicketModalOpen}
        title={"BURN TICKETS"}
        onClose={handleCloseModal}
        wrapperClassName="w-[480px] bg-gray-700/90"
      >
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <Image
              src={dollorSign.src}
              alt="Ticket"
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
              <label className="text-white">Burn all your tickets</label>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <p>Tickets Owned: {maxBurnable}</p>
              <p className="mt-1 text-yellow-400">
                Don't forget to cancel your orders
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span>You will get back:</span>
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold">
                    {maxBurnable * 200}
                  </span>
                  <Image
                    src={coreum_logo.src}
                    alt="Coreum Logo"
                    width={16}
                    height={16}
                    className="align-middle"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleBurnTickets}
            disabled={!isConnected || maxBurnable < 1}
            className="w-full py-4 bg-primary/80 hover:bg-primary rounded-lg font-medium text-white transition-colors"
          >
            BURN {maxBurnable} TICKET{maxBurnable > 1 ? "S" : ""}
          </button>
        </div>
      </Modal>
      <BurnTicketSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        ticketCount={lastBurnCount}
        amount={lastAmount}
        txHash={lastTxHash}
      />
    </>
  );
};

export default BurnTicketModal;
