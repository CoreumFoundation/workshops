"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from "../constants";
import { selectFormattedBalanceByDenom } from "../features/balances";
import { useDraft } from "../hooks/useDraft";
import { usePriceData } from "../hooks/usePriceData";

const UserStats = () => {
  const { userTickets, userWinChance, numberOfTicketsSold } = useDraft();
  const { coreumPrice, priceHistory } = usePriceData();
  const coreumBalance = useSelector(
    selectFormattedBalanceByDenom(COREUM_TOKEN_TESTNET.denom)
  );
  const ticketBalance = useSelector(
    selectFormattedBalanceByDenom(TICKET_TOKEN_TESTNET.denom)
  );

  // Get the last ticket price from price history
  const getLastTicketPrice = () => {
    if (!priceHistory || priceHistory.length === 0) return 200;
    return priceHistory[priceHistory.length - 1].value;
  };

  // Calculate win rate percentage
  const winRatePercentage = userWinChance?.win_chance
    ? parseFloat(userWinChance.win_chance).toFixed(2)
    : "0.00";

  // Calculate total tickets
  const totalTickets = numberOfTicketsSold?.total_tickets || "0";

  return (
    <div className="w-full flex flex-col gap-4 mb-3 bg-indigo-900/50 p-4 rounded-lg">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center">
        <span className="text-gray-300 font-semibold">Your Balance...</span>
        <div className="flex gap-2">
          <div className="border-2 border-primary/40 text-primary font-semibold py-1 px-4 rounded-full">
            $
            {(
              Number(coreumPrice || "0") *
              getLastTicketPrice() *
              Number(userTickets?.tickets || "0")
            ).toFixed(2)}
          </div>
          <div className="border-2 border-secondary/40 text-secondary font-semibold py-1 px-4 rounded-full">
            {userTickets?.tickets || "0"} $TICKET
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center">
        <span className="text-gray-300 font-semibold">Your Win Rate...</span>
        <div className="border-2 border-primary/40 py-1 px-4 rounded-full text-primary font-semibold">
          {userTickets?.tickets || "0"} in {totalTickets} ({winRatePercentage}%)
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-gray-300 font-semibold text-sm">
            Your Balance...
          </span>
          <div className="flex flex-col gap-2">
            <div className="border-2 border-primary/40 text-primary font-semibold py-1 px-4 rounded-full text-center">
              $
              {(
                Number(coreumPrice || "0") *
                getLastTicketPrice() *
                Number(userTickets?.tickets || "0")
              ).toFixed(2)}{" "}
            </div>
            <div className="border-2 border-secondary/40 text-secondary font-semibold py-1 px-4 rounded-full text-center">
              {userTickets?.tickets || "0"} $TICKET
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-300 font-semibold text-sm">
            Your Win Rate...
          </span>
          <div className="border-2 border-primary/40 py-1 px-4 rounded-full text-primary font-semibold text-center">
            {userTickets?.tickets || "0"} in {totalTickets} ({winRatePercentage}
            %)
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
