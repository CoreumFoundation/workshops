"use client";
import React from "react";
import { useDraft } from "../hooks/useDraft";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const Countdown = () => {
  const { draftState } = useDraft();

  const getStateMessage = () => {
    switch (draftState?.state) {
      case "TicketSalesOpen":
        return "Ticket sales are open!";
      case "TicketsSoldOutAccumulationInProgress":
        return "Tickets sold out! Accumulating rewards...";
      case "WinnerSelectedUndelegationInProcess":
        return "Winner selected! Undelegation in progress...";
      case "UndelegationCompletedTokensCanBeBurned":
        return "Undelegation completed! Tokens can be burned.";
      case "DrawFinished":
        return "Draw finished!";
      default:
        return "Loading draft state...";
    }
  };

  return (
    <div className="w-full text-center mb-8 text-lg font-medium">
      <p className="text-gray-300 flex items-center justify-center gap-2">
        Draft Status:{" "}
        <span className="text-secondary">{getStateMessage()}</span>
        <div className="flex items-center gap-2">
          <a
            href="https://medium.com/@coreumlabs/introducing-coreum-fun-ac28118771a9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <svg
              className="w-5 h-5"
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
      </p>
    </div>
  );
};

export default Countdown;
