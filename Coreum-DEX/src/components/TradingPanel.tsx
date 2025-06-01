"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
import { selectFormattedBalanceByDenom } from "../features/balances";
import ReviewDexTxModal from "./ReviewDexTxModal";
import TradeSuccessModal from "./TradeSuccessModal";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useAppDispatch } from "../store/hooks";
import { setIsTxExecuting } from "../features/general";
import { setSelectedOrder } from "../features/dex";
import { formatOrder } from "../features/dex/queries";
import { convertDexPriceToNumber } from "../utils/convertUnitToSubunit";
import { toast } from "sonner";
import { TICKET_TOKEN_TESTNET, COREUM_TOKEN_TESTNET } from "../constants";
import { usePriceData } from "../hooks/usePriceData";

const TradingPanel = () => {
  const { tokenPair, selectedOrder } = useSelector(
    (state: RootState) => state.dex
  );
  const { base, quote } = tokenPair;
  const dispatch = useAppDispatch();
  const { createOrder } = useCreateOrder();
  const { refetch: refetchPrice, coreumPrice } = usePriceData();

  const baseBalance = useSelector(selectFormattedBalanceByDenom(base.denom));
  const quoteBalance = useSelector(selectFormattedBalanceByDenom(quote.denom));

  // State for buy/sell and order type
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const orderType = "limit";
  const [percent, setPercent] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isManualSideChange, setIsManualSideChange] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>();
  const [lastAmount, setLastAmount] = useState<string>("");
  const [lastPrice, setLastPrice] = useState<string>("");

  // Handle selected order changes
  useEffect(() => {
    if (selectedOrder) {
      const formatted = formatOrder(selectedOrder);
      // Reset manual side change flag when new order is selected
      setIsManualSideChange(false);
      // Set the opposite side of the selected order
      setSide(formatted.side.toLowerCase() === "buy" ? "sell" : "buy");
      setAmount(formatted.volume);
      // Convert DEX price to regular number
      setPrice(convertDexPriceToNumber(formatted.price));
      setPercent(null);
    }
  }, [selectedOrder]);

  // Handle token pair changes
  useEffect(() => {
    // Reset form when token pair changes
    resetForm();
  }, [tokenPair]);

  // Handle manual side change
  const handleSideChange = (newSide: "buy" | "sell") => {
    setIsManualSideChange(true);
    setSide(newSide);
    // Reset form when changing sides
    resetForm();
  };

  // Reset manual side change flag when form is reset
  const resetForm = () => {
    setAmount("");
    setPrice("");
    setPercent(null);
    setIsManualSideChange(false);
    dispatch(setSelectedOrder(null));
  };

  // Format amount based on token type
  const formatAmount = (value: string) => {
    if (base.denom === TICKET_TOKEN_TESTNET.denom) {
      return value === "" ? "" : Math.floor(Number(value)).toString();
    }
    return value;
  };

  // Format price based on token type
  const formatPrice = (value: string) => {
    if (quote.denom === TICKET_TOKEN_TESTNET.denom) {
      return value === "" ? "" : Math.floor(Number(value)).toString();
    }
    return value;
  };

  // Update amount when percent changes
  useEffect(() => {
    if (percent === null) return;

    if (side === "buy") {
      // For buy, calculate based on base balance (TICKET)
      const baseBalanceNum = parseFloat(baseBalance.replace(/,/g, ""));
      const p = percent;

      if (isNaN(baseBalanceNum) || baseBalanceNum === 0) {
        setAmount("");
        return;
      }

      let newAmount = (baseBalanceNum * p) / 100;

      // If base token is TICKET, ensure whole number
      if (base.denom === TICKET_TOKEN_TESTNET.denom) {
        newAmount = Math.floor(newAmount);
      }

      setAmount(newAmount > 0 ? newAmount.toString() : "");
    } else {
      // For sell, calculate based on quote balance (COREUM)
      const quoteBalanceNum = parseFloat(quoteBalance.replace(/,/g, ""));
      const p = percent;

      if (isNaN(quoteBalanceNum) || quoteBalanceNum === 0) {
        setAmount("");
        return;
      }

      let newAmount = (quoteBalanceNum * p) / 100;

      // If base token is TICKET, ensure whole number
      if (base.denom === TICKET_TOKEN_TESTNET.denom) {
        newAmount = Math.floor(newAmount);
      }

      setAmount(newAmount > 0 ? newAmount.toString() : "");
    }
  }, [percent, side, baseBalance, quoteBalance, base.denom]);

  // Calculate total value for limit orders
  const calculateTotal = () => {
    if (!amount || !price) return 0;
    const total = parseFloat(amount) * parseFloat(price);
    return isNaN(total) ? 0 : total;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only enforce whole numbers for TICKET token
    if (base.denom === TICKET_TOKEN_TESTNET.denom) {
      if (value === "" || /^\d+$/.test(value)) {
        setAmount(value);
        setPercent(null);
      }
    } else {
      // Allow decimals for other tokens (like COREUM)
      setAmount(value);
      setPercent(null);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only enforce whole numbers for TICKET token
    if (quote.denom === TICKET_TOKEN_TESTNET.denom) {
      if (value === "" || /^\d+$/.test(value)) {
        setPrice(value);
      }
    } else {
      // Allow decimals for other tokens (like COREUM)
      setPrice(value);
    }
  };

  const handlePercentClick = (p: number) => {
    setPercent(p);
  };

  const handleConfirmOrder = async () => {
    // Validate whole numbers only for TICKET token in both amount and price
    if (
      base.denom === TICKET_TOKEN_TESTNET.denom &&
      !Number.isInteger(Number(amount))
    ) {
      toast.error("Ticket amount must be a whole number");
      return;
    }
    if (
      quote.denom === TICKET_TOKEN_TESTNET.denom &&
      !Number.isInteger(Number(price))
    ) {
      toast.error("Ticket price must be a whole number");
      return;
    }

    try {
      dispatch(setIsTxExecuting(true));
      const response = await createOrder(
        side,
        amount,
        price,
        base.denom,
        quote.denom,
        orderType,
        "Good till Cancel",
        "standard"
      );

      // Store transaction hash
      if (response?.transactionHash) {
        setLastTxHash(response.transactionHash);
      }

      // Store the last amount and price before resetting
      setLastAmount(amount);
      setLastPrice(price);

      try {
        // Calculate price per ticket
        const pricePerTicket =
          side === "buy"
            ? parseFloat(price) / parseFloat(amount)
            : parseFloat(price) * parseFloat(amount);

        // Store the price
        const response = await fetch("/api/ticket_price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: pricePerTicket }),
        });
        const data = await response.json();
        console.log("Ticket price stored:", data);
      } catch (error) {
        console.error("Failed to store ticket price:", error);
      }

      // Refetch price data after successful trade
      refetchPrice();

      setIsReviewModalOpen(false);
      if (response.code == 0) {
        setIsSuccessModalOpen(true);
      }
      resetForm();
    } catch (error) {
      setIsReviewModalOpen(false);
      resetForm();
      console.error("Failed to create order:", error);
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  };

  // Calculate USD value
  const calculateUSDValue = () => {
    if (!amount || !price || !coreumPrice) return "0.00";
    const total = parseFloat(amount) * parseFloat(price);

    // If quote token is TICKET, multiply by Coreum price
    if (quote.denom === TICKET_TOKEN_TESTNET.denom) {
      return (total * coreumPrice).toFixed(2);
    }
    // If quote token is COREUM, the total is already in COREUM, so multiply by Coreum price
    if (quote.denom === COREUM_TOKEN_TESTNET.denom) {
      return (total * coreumPrice).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="bg-indigo-900/50 p-4 rounded-lg">
      {/* Balances row */}
      <div className="flex justify-between mb-4">
        <div>
          <span className="text-xs text-white/60 mr-2">
            {base.symbol} Available
          </span>
          <span className="text-xs text-white font-mono">{baseBalance}</span>
        </div>
        <div>
          <span className="text-xs text-white/60 mr-2">
            {quote.symbol} Available
          </span>
          <span className="text-xs text-white font-mono">{quoteBalance}</span>
        </div>
      </div>
      {/* Buy/Sell buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          className={`py-2 rounded-md font-semibold ${
            side === "buy"
              ? "bg-primary text-black"
              : "bg-primary/40 text-white"
          }`}
          onClick={() => handleSideChange("buy")}
        >
          Buy
        </button>
        <button
          className={`py-2 rounded-md font-semibold ${
            side === "sell"
              ? "bg-secondary text-black"
              : "bg-secondary/40 text-white"
          }`}
          onClick={() => handleSideChange("sell")}
        >
          Sell
        </button>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">Amount</p>
        <div className="flex gap-2 mb-2">
          {[25, 50, 100].map((p) => (
            <button
              key={p}
              className={`py-1 px-2 rounded-md text-xs font-semibold ${
                percent === p
                  ? "bg-secondary/40 text-white"
                  : "border-secondary/50 border text-white"
              }`}
              onClick={() => handlePercentClick(p)}
            >
              {p === 100 ? "MAX" : `${p}%`}
            </button>
          ))}
        </div>
        {/* Amount (base token) */}
        <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
          <div className="relative w-11 h-11 z-10 mr-2">
            <Image src={base.logo} alt={`${base.symbol} Logo`} fill />
          </div>
          <input
            type={base.denom === TICKET_TOKEN_TESTNET.denom ? "text" : "number"}
            inputMode={
              base.denom === TICKET_TOKEN_TESTNET.denom ? "numeric" : "decimal"
            }
            pattern={
              base.denom === TICKET_TOKEN_TESTNET.denom ? "[0-9]*" : undefined
            }
            placeholder={`Enter Amount${
              base.denom === TICKET_TOKEN_TESTNET.denom
                ? " (whole numbers only)"
                : ""
            }`}
            className="bg-transparent w-full outline-none text-white"
            value={amount}
            onChange={handleAmountChange}
          />
          <span className="ml-2 text-white font-semibold">{base.symbol}</span>
        </div>
        {/* Price (quote token) */}
        <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
          <div className="relative w-11 h-11 z-10 mr-2">
            <Image src={quote.logo} alt={`${quote.symbol} Logo`} fill />
          </div>
          <input
            type={
              quote.denom === TICKET_TOKEN_TESTNET.denom ? "text" : "number"
            }
            inputMode={
              quote.denom === TICKET_TOKEN_TESTNET.denom ? "numeric" : "decimal"
            }
            pattern={
              quote.denom === TICKET_TOKEN_TESTNET.denom ? "[0-9]*" : undefined
            }
            placeholder={`Enter Price${
              quote.denom === TICKET_TOKEN_TESTNET.denom
                ? " (whole numbers only)"
                : ""
            }`}
            className="bg-transparent w-full outline-none text-white"
            value={price}
            onChange={handlePriceChange}
          />
          <span className="ml-2 text-white font-semibold">{quote.symbol}</span>
        </div>
        <p className="text-xs text-gray-400">≈ ${calculateUSDValue()} USD</p>
      </div>
      <button
        className="w-full bg-primary text-black py-2 rounded-md mb-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setIsReviewModalOpen(true)}
        disabled={
          !amount ||
          Number(amount) <= 0 ||
          (orderType === "limit" && (!price || Number(price) <= 0))
        }
      >
        Review {side === "buy" ? "Buy" : "Sell"} Order
      </button>
      <ReviewDexTxModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onConfirm={handleConfirmOrder}
        side={side}
        amount={amount}
        price={price}
        baseSymbol={base.symbol}
        quoteSymbol={quote.symbol}
      />
      <TradeSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        side={side}
        amount={lastAmount}
        baseSymbol={base.symbol}
        quoteSymbol={quote.symbol}
        txHash={lastTxHash}
        price={lastPrice}
      />
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Total:</p>
        <p className="text-xs">
          {calculateTotal().toFixed(8)} {quote.symbol}
        </p>
      </div>
    </div>
  );
};

export default TradingPanel;
