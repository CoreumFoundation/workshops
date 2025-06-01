"use client";
import React from "react";
import { Modal } from "./Modal";
import x_logo from "../assets/x-logo-white.png";

interface BuyTicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketCount: number;
  amount: number;
  txHash?: string;
}

export const BuyTicketSuccessModal: React.FC<BuyTicketSuccessModalProps> = ({
  isOpen,
  onClose,
  ticketCount,
  amount,
  txHash,
}) => {
  const shareText = `Just bought ${ticketCount} $TICKET${
    ticketCount > 1 ? "s" : ""
  } for ${amount} $COREUM on @Coreum_dot_fun! 🎫\n\nCheck it out: https://coreum.fun`;

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
          <span className="text-green-400">
            Tickets Purchased Successfully!
          </span>
        </div>
      }
    >
      <div className="p-3 text-white w-full max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Y4bTJpbXB1NjRoNXdud3h4bm1qZjNmd2RjMzhtNHB1MGVmbzI0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rsANkiygv0Jpyn7mFC/giphy.gif"
              alt="Success"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-center text-white/80 text-sm mb-4">
            You have successfully purchased{" "}
            <span className="text-primary font-bold">
              {ticketCount} $TICKET{ticketCount > 1 ? "s" : ""}
            </span>{" "}
            for <span className="text-primary font-bold">{amount} $COREUM</span>
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

export default BuyTicketSuccessModal;
