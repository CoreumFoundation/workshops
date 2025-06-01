"use client";

import coreum_logo from "../../public/coreum.svg";

import {
  setIsBurnTicketModalOpen,
  setIsBuyTicketModalOpen,
  setIsConnectModalOpen,
} from "../features/general";
import { useAppDispatch } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { useAccount } from "graz";
import { useDraft } from "../hooks/useDraft";
import { usePriceData } from "../hooks/usePriceData";
import { CHAIN_ID } from "@/constants";
import superledger_podcast_logo from "../assets/superledger_podcast.webp";
import winner_shark from "../assets/shark_winner.webp";
import Link from "next/link";

const HeroSection = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount({ chainId: CHAIN_ID });
  const {
    numberOfTicketsSold,
    accumulatedRewards,
    bonusRewards,
    draftState,
    winner,
    numberOfTicketsBurned,
  } = useDraft();
  const { coreumPrice } = usePriceData();
  const isSoldOut = numberOfTicketsSold?.tickets_remaining === "0";

  // Calculate grand prize and USD value (same as StatsCards)
  const grandPrize =
    ((Number(accumulatedRewards?.accumulated_rewards) || 0) +
      (Number(bonusRewards?.bonus_rewards) || 0)) *
    10 ** -6;
  const grandPrizeUSD = grandPrize * (coreumPrice || 0);

  // Animated number state
  const [displayedAmount, setDisplayedAmount] = useState(0);

  useEffect(() => {
    let rafId: number;
    let start = 0;
    const duration = 1200; // ms
    const increment = (grandPrizeUSD || 0) / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < grandPrizeUSD) {
        setDisplayedAmount(Math.floor(start));
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayedAmount(Math.floor(grandPrizeUSD));
      }
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [grandPrizeUSD]);

  const handleOpenModal = () => {
    if (isSoldOut) return;
    if (isConnected) {
      dispatch(setIsBuyTicketModalOpen(true));
    } else {
      dispatch(setIsConnectModalOpen(true));
    }
  };

  const handleOpenBurnTicketsModal = () => {
    if (isConnected) {
      dispatch(setIsBurnTicketModalOpen(true));
    } else {
      dispatch(setIsConnectModalOpen(true));
    }
  };

  const timeStampToDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  const truncateAddress = (address: string | null | undefined) => {
    if (!address) return "Not selected yet";
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  const isBurnable =
    draftState?.undelegation_done_timestamp &&
    draftState?.undelegation_done_timestamp * 1000 < Date.now();

  return (
    <section className="relative w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight">
            Enter with{" "}
            <span className="inline-flex items-center mx-1.5">
              <img
                src={coreum_logo.src}
                alt="Coreum Logo"
                className="w-6 h-6 sm:w-7 sm:h-7 align-middle"
                style={{ display: "inline-block" }}
              />
            </span>
            to win up to{" "}
            <span
              className="text-primary inline-block"
              style={{
                minWidth: "100px",
                fontVariantNumeric: "tabular-nums",
                fontFamily: "monospace",
              }}
            >
              ${displayedAmount.toLocaleString()}
            </span>
          </h1> */}

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight">
            <span className="text-primary">Winner</span> Takes Home{" "}
            <span className="text-primary">
              {Math.floor(Number(winner?.rewards || 0) * 10 ** -6)} $COREUM!
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 text-center max-w-xl">
            You can withdraw your full deposit at the end of the Draft
          </p>

          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 py-2 sm:py-2">
            <div className="flex items-center gap-1.5 sm:gap-1.5">
              <span className="text-primary text-xl sm:text-2xl font-bold">
                {numberOfTicketsSold?.tickets_remaining || 0}
              </span>
              <span className="text-gray-300 text-sm sm:text-base">left</span>
            </div>
            <div className="w-px h-5 sm:h-6 bg-gray-600"></div>
            <div className="flex items-center gap-1.5 sm:gap-1.5">
              <span className="text-secondary text-xl sm:text-2xl font-bold">
                {numberOfTicketsSold?.tickets_sold || 0}
              </span>
              <span className="text-gray-300 text-sm sm:text-base">sold</span>
            </div>
            <div className="w-px h-5 sm:h-6 bg-gray-600"></div>
            <div className="flex items-center gap-1.5 sm:gap-1.5">
              <span className="text-primary text-xl sm:text-2xl font-bold">
                {numberOfTicketsBurned?.total_burned || 0}
              </span>
              <span className="text-gray-300 text-sm sm:text-base">burned</span>
            </div>
          </div>

          {/* Podcast & Winner Selection Info */}

          {(draftState?.state === "WinnerSelectedUndelegationInProcess" ||
            draftState?.state === "UndelegationCompletedTokensCanBeBurned" ||
            draftState?.state === "DrawFinished") && (
            <div className="flex flex-col items-center bg-indigo-900/50 rounded-xl px-3 sm:px-4 py-2 w-full max-w-xl mx-auto ">
              <img src={winner_shark.src} alt="Winner" className="w-40" />
              <span className="text-gray-200 text-base  font-semibold text-center">
                Winner:{" "}
                <Link
                  href={`https://explorer.coreum.com/coreum/accounts/${winner?.winner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-primary">
                    {truncateAddress(winner?.winner)}
                  </span>
                </Link>
              </span>
              <span className="text-gray-200 text-base  font-semibold text-center">
                Rewards:{" "}
                <span className="text-primary">
                  {Number(winner?.rewards) * 10 ** -6} $COREUM
                </span>
              </span>
            </div>
          )}

          {(draftState?.state === "WinnerSelectedUndelegationInProcess" ||
            draftState?.state === "UndelegationCompletedTokensCanBeBurned") && (
            <div className="flex flex-col items-center bg-indigo-900/50 rounded-xl px-3 sm:px-4 py-2 w-full max-w-xl mx-auto ">
              <span className="text-gray-200 text-base  font-semibold text-center">
                Token can be burned on:
                <span className="ml-2 text-primary">
                  {timeStampToDate(
                    draftState?.undelegation_done_timestamp || 0
                  )}
                </span>
              </span>
              <button
                onClick={() => handleOpenBurnTicketsModal()}
                disabled={!isBurnable}
                className={`relative group w-full sm:w-auto min-w-[240px] my-5 ${
                  !isBurnable ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-[#f6d447] rounded-lg blur-sm group-hover:blur-md transition-all duration-300 animate-background bg-[length:_400%_400%] [animation-duration:_6s]"></div>
                <a
                  href="#"
                  className={`relative block rounded-lg bg-[#171b5e]/90 px-6 py-3 text-base font-semibold text-white text-center transition-all duration-300 ${
                    isSoldOut
                      ? "hover:bg-[#171b5e]/90"
                      : "hover:bg-[#171b5e]/80 hover:scale-[1.02]"
                  }`}
                >
                  Burn Tickets 🔥
                </a>
              </button>
            </div>
          )}

          {draftState?.state === "TicketsSoldOutAccumulationInProgress" && (
            <div className="flex flex-col items-center bg-indigo-900/50 rounded-xl px-3 sm:px-4 py-2 w-full max-w-xl mx-auto ">
              <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-1.5 sm:gap-0 mb-1">
                <div className="flex flex-col  items-center  gap-1.5 sm:gap-2 flex-1 sm:justify-start ">
                  <span className="sm:hidden text-gray-200 text-base whitespace-nowrap text-center sm:text-left">
                    Winner Selection on
                  </span>
                  <span className="hidden sm:block text-gray-200 text-base font-semibold  text-center">
                    Winner Selection on The Superledger Podcast
                  </span>

                  {/* <div className="hidden sm:block w-px h-6 bg-gray-700 mx-2" /> */}
                </div>

                <img
                  src={superledger_podcast_logo.src}
                  alt="The Superledger Podcast Logo"
                  className="w-12 h-12 sm:w-15 sm:h-15 rounded-lg shadow bg-black mx-auto sm:ml-4"
                />
                <span className="sm:hidden text-gray-200 text-center text-base font-semibold whitespace-nowrap text-center sm:text-left">
                  The Superledger Podcast
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-sm mt-0.5 justify-center">
                <span className="font-bold text-primary">25 of Mai 2025</span>
                <span className="text-gray-400">on X</span>
                <a
                  href="https://x.com/i/spaces/1zqKVjRaompKB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium group text-sm"
                >
                  Register Here
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {draftState?.state === "TicketSalesOpen" && (
            <button
              onClick={handleOpenModal}
              disabled={isSoldOut}
              className={`relative group w-full sm:w-auto min-w-[240px] ${
                isSoldOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-[#f6d447] rounded-lg blur-sm group-hover:blur-md transition-all duration-300 animate-background bg-[length:_400%_400%] [animation-duration:_6s]"></div>
              <a
                href="#"
                className={`relative block rounded-lg bg-[#171b5e]/90 px-6 py-3 text-base font-semibold text-white text-center transition-all duration-300 ${
                  isSoldOut
                    ? "hover:bg-[#171b5e]/90"
                    : "hover:bg-[#171b5e]/80 hover:scale-[1.02]"
                }`}
              >
                {isSoldOut ? "Tickets Sold Out 🎫" : "BUY Ticket to WIN 🎉"}
              </a>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
