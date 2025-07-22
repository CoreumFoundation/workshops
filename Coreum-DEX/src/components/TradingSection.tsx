import React from "react";
import Chart from "./Chart";
import TradingPanel from "./TradingPanel";
import TokenSelector from "./TokenSelector";
import TokenBalance from "./TokenBalance";

const TradingSection = () => {
  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TokenSelector />
        <TokenBalance />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-h-[300px]">
          <Chart />
        </div>
        <div className="min-h-[300px]">
          <TradingPanel />
        </div>
      </div>
    </div>
  );
};

export default TradingSection;
