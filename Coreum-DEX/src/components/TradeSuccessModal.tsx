"use client";
import React, { useState } from "react";
import { Modal } from "./Modal";
import x_logo from "../assets/x-logo-white.png";

interface TradeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  side: "buy" | "sell";
  amount: string;
  baseSymbol: string;
  quoteSymbol: string;
  price: string;
  txHash?: string;
}

export const TradeSuccessModal: React.FC<TradeSuccessModalProps> = ({
  isOpen,
  onClose,
  side,
  amount,
  baseSymbol,
  quoteSymbol,
  price,
  txHash,
}) => {
  const formatSymbol = (symbol: string) => {
    const lowerSymbol = symbol.toLowerCase();
    if (lowerSymbol === "ticket") return "$TICKET";
    if (lowerSymbol === "coreum") return "$COREUM";
    return symbol.toUpperCase();
  };

  const shareText = `Just placed a ${
    side === "buy" ? "buy" : "sell"
  } order for ${amount} ${formatSymbol(baseSymbol)} at ${price} ${formatSymbol(
    quoteSymbol
  )} on the @CoreumOfficial DEX! 🚀\n\nCheck it out: https://coreum.fun`;

  const handleShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="text-green-400">Order Placed Successfully!</span>
        </div>
      }
    >
      <div className="p-3 text-white w-full max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnFqbjc4ZWt5aHQ2MXR1OGZ5ejg4YWkxdWVoMGkwZHk0cm9sOXNxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2m00OCBAsMaHfSrRho/giphy.gif"
              alt="Success"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-center text-white/80 text-sm mb-4">
            You have successfully placed a{" "}
            <span className="text-secondary font-bold">
              {side === "buy" ? "buy" : "sell"}
            </span>{" "}
            order for{" "}
            <span className="text-primary font-bold">
              {amount} {formatSymbol(baseSymbol)}
            </span>{" "}
            at{" "}
            <span className="text-primary font-bold">
              {price} {formatSymbol(quoteSymbol)}
            </span>
          </p>

          {txHash && (
            <div className="bg-indigo-900/30 rounded-lg p-3 mb-4 w-full">
              <p className="text-xs text-white/70 mb-1">Transaction Hash:</p>
              <p className="text-xs font-mono break-all">{txHash}</p>
            </div>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/80 text-white hover:bg-black/60 transition-colors"
          >
            <img src={x_logo.src} alt="X" className="w-4 h-4" />
            Share on X
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TradeSuccessModal;
