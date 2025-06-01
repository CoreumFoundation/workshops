"use client";
import React, { useState } from "react";
import { useDraft } from "../hooks/useDraft";
import { usePriceData } from "../hooks/usePriceData";

const StatsCards = () => {
  const {
    draftTVL,
    numberOfTicketsSold,
    accumulatedRewards,
    bonusRewards,
    refetchAll,
  } = useDraft();
  const { coreumPrice } = usePriceData();
  const [tileStates, setTileStates] = useState({
    deposited: { isRefreshing: false },
    prize: { isRefreshing: false },
    yield: { isRefreshing: false },
  });

  // Calculate total deposited in USD
  const totalDepositedUSD = draftTVL?.tvl
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(draftTVL?.tvl) * 10 ** -6 * (coreumPrice || 0))
    : "$0.00";

  // Format COREUM amount
  const formatCoreumAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate win chance per ticket
  const calculateWinChance = () => {
    if (!numberOfTicketsSold?.total_tickets) return "0.00";
    const totalTickets = parseFloat(numberOfTicketsSold.total_tickets);
    if (totalTickets === 0) return "0.00";
    return (100 / totalTickets).toFixed(2);
  };

  const winChance = calculateWinChance();

  const grandPrize = (
    ((Number(accumulatedRewards?.accumulated_rewards) || 0) +
      (Number(bonusRewards?.bonus_rewards) || 0)) *
    10 ** -6
  ).toFixed(2);

  const grandPrizeUSD = (Number(grandPrize) * (coreumPrice || 0)).toFixed(2);

  const handleRefresh = async (tileId: "deposited" | "prize" | "yield") => {
    if (Object.values(tileStates).some((state) => state.isRefreshing)) return;

    try {
      setTileStates({
        deposited: { isRefreshing: true },
        prize: { isRefreshing: true },
        yield: { isRefreshing: true },
      });

      await refetchAll();
    } finally {
      setTileStates({
        deposited: { isRefreshing: false },
        prize: { isRefreshing: false },
        yield: { isRefreshing: false },
      });
    }
  };

  const getCardClassName = (
    tileId: "deposited" | "prize" | "yield",
    isMobile = false
  ) => {
    const baseClasses = isMobile
      ? "bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200"
      : "bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200";

    const stateClasses = tileStates[tileId].isRefreshing
      ? "opacity-50 scale-95"
      : "hover:bg-indigo-900/70 hover:scale-[1.02]";

    return `${baseClasses} ${stateClasses}`;
  };

  return (
    <div className="w-full mb-3">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        <div
          className={getCardClassName("deposited")}
          onClick={() => handleRefresh("deposited")}
        >
          <h3 className="text-gray-300 mb-2 text-lg">Total deposited</h3>
          <p className="text-primary text-3xl mb-2">{totalDepositedUSD}</p>
          <p className="text-md text-gray-400">
            {formatCoreumAmount(Number(draftTVL?.tvl) * 10 ** -6 || 0)} $COREUM
          </p>
        </div>
        <div
          className={getCardClassName("prize")}
          onClick={() => handleRefresh("prize")}
        >
          <h3 className="text-gray-300 mb-2 text-lg">Grand Prize</h3>
          <p className="text-primary text-3xl mb-2">{grandPrize} $COREUM</p>
          <button className="text-md text-blue-400">${grandPrizeUSD}</button>
        </div>
        <div
          className={getCardClassName("yield")}
          onClick={() => handleRefresh("yield")}
        >
          <h3 className="text-gray-300 mb-2 text-lg">Yield Source</h3>
          <p className="text-primary text-3xl mb-2">Coreum Labs</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                "https://validator.info/coreum/corevaloper14e0slqpzhgsakm6fwnh5sk6mu2dmdc9ghxhuw5",
                "_blank"
              );
            }}
            className="text-md text-blue-400"
          >
            38% Network Yield
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-2">
        <div
          className={getCardClassName("deposited", true)}
          onClick={() => handleRefresh("deposited")}
        >
          <h3 className="text-gray-300 mb-1 text-sm">Total deposited</h3>
          <p className="text-primary text-lg font-medium mb-1">
            {totalDepositedUSD}
          </p>
          <p className="text-xs text-gray-400">
            {formatCoreumAmount(Number(draftTVL?.tvl) * 10 ** -6 || 0)} $COREUM
          </p>
        </div>
        <div
          className={`${getCardClassName("prize", true)} text-center`}
          onClick={() => handleRefresh("prize")}
        >
          <h3 className="text-gray-300 mb-1 text-sm">Grand Prize</h3>
          <p className="text-primary text-lg font-medium mb-1">
            {grandPrize} $COREUM
          </p>
          <button className="text-xs text-blue-400">${grandPrizeUSD}</button>
        </div>
        <div
          className={`${getCardClassName("yield", true)} col-span-2`}
          onClick={() => handleRefresh("yield")}
        >
          <h3 className="text-gray-300 mb-1 text-sm">Yield Source</h3>
          <p className="text-primary text-lg font-medium mb-1">Coreum Labs</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                "https://validator.info/coreum/corevaloper14e0slqpzhgsakm6fwnh5sk6mu2dmdc9ghxhuw5",
                "_blank"
              );
            }}
            className="text-xs text-blue-400"
          >
            38% Network Yield
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
