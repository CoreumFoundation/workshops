import React from "react";
import { Modal } from "./Modal";
import { ArrowBottomRightIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ReviewDexTxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  side: "buy" | "sell";
  amount: string;
  price: string;
  baseSymbol: string;
  quoteSymbol: string;
  estimatedFee?: string;
}

export const ReviewDexTxModal: React.FC<ReviewDexTxModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  side,
  amount,
  price,
  baseSymbol,
  quoteSymbol,
  estimatedFee,
}) => {
  const isTxExecuting = useSelector(
    (state: RootState) => state.general.isTxExecuting
  );
  const total = (parseFloat(amount) * parseFloat(price)).toFixed(8);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          {side === "buy" ? (
            <ArrowBottomRightIcon className="text-green-400 w-6 h-6" />
          ) : (
            <ArrowTopLeftIcon className="text-red-400 w-6 h-6" />
          )}
          <span>Review {side === "buy" ? "Buy" : "Sell"} Order</span>
        </div>
      }
    >
      <div className="p-3 text-white w-full max-w-md mx-auto">
        <div className="bg-indigo-900/30 rounded-lg p-3 mb-3">
          <p className="text-white/80 text-sm">
            {side === "buy" ? "Buying" : "Selling"} {amount} {baseSymbol} at{" "}
            {price} {quoteSymbol} per {baseSymbol} (Total: {total} {quoteSymbol}
            )
          </p>
        </div>

        <div className="bg-indigo-900/50 rounded-lg p-3 mb-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Pair</span>
              <span className="font-medium">
                {baseSymbol}/{quoteSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Type</span>
              <span
                className={`font-medium ${
                  side === "buy" ? "text-green-400" : "text-red-400"
                }`}
              >
                {side === "buy" ? "Buy" : "Sell"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Amount</span>
              <span className="font-medium">
                {amount} {baseSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Price</span>
              <span className="font-medium">
                {price} {quoteSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center col-span-2 border-t border-white/10 pt-2">
              <span className="text-white/70">Total</span>
              <span className="font-medium">
                {total} {quoteSymbol}
              </span>
            </div>
            {estimatedFee && (
              <div className="flex justify-between items-center col-span-2">
                <span className="text-white/70">Fee</span>
                <span className="font-medium">
                  {estimatedFee} {quoteSymbol}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            onClick={onClose}
            disabled={isTxExecuting}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1.5 rounded-lg bg-primary text-black font-semibold hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            onClick={onConfirm}
            disabled={
              isTxExecuting ||
              !amount ||
              !price ||
              Number(amount) <= 0 ||
              Number(price) <= 0
            }
          >
            {isTxExecuting ? "Broadcasting..." : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDexTxModal;
