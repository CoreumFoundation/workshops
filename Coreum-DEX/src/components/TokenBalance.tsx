"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectFormattedBalanceByDenom } from "../features/balances";
import { useAppSelector } from "../store/hooks";

const TokenBalance = () => {
  const { base, quote } = useSelector(
    (state: RootState) => state.dex.tokenPair
  );

  const baseBalance = useSelector(selectFormattedBalanceByDenom(base.denom));
  const quoteBalance = useSelector(selectFormattedBalanceByDenom(quote.denom));

  return (
    <div className="flex justify-between bg-indigo-900/50 p-4 rounded-lg">
      {/* Base token (highlighted, always left) */}
      <div className="flex flex-col">
        <span className="text-white font-semibold text-font">
          {base.symbol} balance
        </span>
        <span className="text-primary text-2xl font-bold">{baseBalance}</span>
      </div>
      {/* Quote token (dimmed, always right) */}
      <div className="flex flex-col items-end">
        <span className="text-white/60 font-semibold">
          {quote.symbol} Balance
        </span>
        <span className="text-white/60 text-2xl">{quoteBalance}</span>
      </div>
    </div>
  );
};

export default TokenBalance;
