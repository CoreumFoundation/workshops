"use client";
import React, { useState } from "react";
import { useDraft } from "../hooks/useDraft";
import { usePriceData } from "../hooks/usePriceData";

const RewardsSection = () => {
  const { bonusRewards, accumulatedRewards, refetchAll } = useDraft();
  const { coreumPrice } = usePriceData();
  const [tileStates, setTileStates] = useState({
    bonus: { isRefreshing: false },
    yield: { isRefreshing: false },
  });

  // Calculate total deposited in USD
  const rewardAmount = bonusRewards?.bonus_rewards
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        Number(bonusRewards?.bonus_rewards) * 10 ** -6 * (coreumPrice || 0)
      )
    : "$0.00";

  // Calculate prize yield in USD
  const prizeYieldUSD = accumulatedRewards?.accumulated_rewards
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        Number(accumulatedRewards?.accumulated_rewards) *
          10 ** -6 *
          (coreumPrice || 0)
      )
    : "$0.00";

  const handleRefresh = async (tileId: "bonus" | "yield") => {
    if (Object.values(tileStates).some((state) => state.isRefreshing)) return;

    try {
      setTileStates({
        bonus: { isRefreshing: true },
        yield: { isRefreshing: true },
      });

      await refetchAll();
    } finally {
      setTileStates({
        bonus: { isRefreshing: false },
        yield: { isRefreshing: false },
      });
    }
  };

  // Format COREUM amount with 2 decimal places for bonus rewards
  const formatBonusAmount = (value: string | undefined) => {
    if (!value) return "0.00";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) * 10 ** -6);
  };

  // Format COREUM amount with 6 decimal places for prize yield
  const formatPrizeAmount = (value: string | undefined) => {
    if (!value) return "0.000000";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(Number(value) * 10 ** -6);
  };

  const getCardClassName = (tileId: "bonus" | "yield", isMobile = false) => {
    const baseClasses = isMobile
      ? "bg-indigo-900/50 p-4 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200"
      : "bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200";

    const stateClasses = tileStates[tileId].isRefreshing
      ? "opacity-50 scale-95"
      : "hover:bg-indigo-900/70 hover:scale-[1.02]";

    return `${baseClasses} ${stateClasses}`;
  };

  return (
    <div className="w-full mb-8">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        <div
          className={getCardClassName("bonus")}
          onClick={() => handleRefresh("bonus")}
        >
          <h3 className="text-gray-300 mb-2 text-lg">Bonus Rewards</h3>
          <p className="text-primary text-3xl mb-2">{rewardAmount}</p>
          <p className="text-md text-gray-400">
            {formatBonusAmount(bonusRewards?.bonus_rewards)} $COREUM
          </p>
        </div>
        <div
          className={getCardClassName("yield")}
          onClick={() => handleRefresh("yield")}
        >
          <h3 className="text-gray-300 mb-2 text-lg">Prize Yield</h3>
          <p className="text-primary text-3xl mb-2">{prizeYieldUSD}</p>
          <p className="text-md text-gray-400">
            {formatPrizeAmount(accumulatedRewards?.accumulated_rewards)} $COREUM
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div
          className={getCardClassName("bonus", true)}
          onClick={() => handleRefresh("bonus")}
        >
          <h3 className="text-gray-300 mb-1 text-sm">Bonus Rewards</h3>
          <p className="text-primary text-xl font-medium mb-1">
            {rewardAmount}
          </p>
          <p className="text-xs text-gray-400">
            {formatBonusAmount(bonusRewards?.bonus_rewards)} $COREUM
          </p>
        </div>
        <div
          className={getCardClassName("yield", true)}
          onClick={() => handleRefresh("yield")}
        >
          <h3 className="text-gray-300 mb-1 text-sm">Prize Yield</h3>
          <p className="text-primary text-xl font-medium mb-1">
            {prizeYieldUSD}
          </p>
          <p className="text-xs text-gray-400">
            {formatPrizeAmount(accumulatedRewards?.accumulated_rewards)} $COREUM
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
