import React, { useState } from "react";
import { useDraft } from "../hooks/useDraft";
import { TICKET_TOKEN_TESTNET } from "../constants";

function getEmoji(tickets: string) {
  const ticketNum = parseInt(tickets);
  if (ticketNum >= 5) return "🦈";
  if (ticketNum === 4) return "🐋";
  if (ticketNum === 3) return "🐡";
  if (ticketNum === 2) return "🐠";
  return "🦐";
}

const Holders = () => {
  const [selected, setSelected] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { ticketHolders } = useDraft();
  const ITEMS_PER_PAGE = 4;

  // Transform participants data to match the existing UI format
  const holdersData =
    ticketHolders?.holders
      .map((holder) => ({
        address: holder.address.slice(0, 4) + "..." + holder.address.slice(-4),
        tickets: parseInt(holder.tickets),
        winRate: parseFloat(holder.win_chance), // Convert to percentage
        deposit: parseInt(holder.tickets) * 200, // TODO: Get price from the contract
      }))
      .sort((a, b) => b.tickets - a.tickets) || [];

  const paginatedHolders = holdersData.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = holdersData.length > currentPage * ITEMS_PER_PAGE;

  if (!ticketHolders) {
    return <div className="text-white/70">Loading holders...</div>;
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-white min-w-[600px]">
          <thead>
            <tr className="text-left text-white/70 text-sm">
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4 text-right">Tickets</th>
              <th className="py-2 px-4 text-right">Win Rate</th>
              <th className="py-2 px-4 text-right">Deposit</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedHolders.map((row, idx) => (
              <tr
                key={row.address + idx}
                className={`cursor-pointer ${
                  selected === idx ? "bg-white/10" : ""
                } rounded-lg`}
                onClick={() => setSelected(idx)}
              >
                <td className="py-2 px-4 rounded-l-lg">{row.address}</td>
                <td className="py-2 px-4 text-right">{row.tickets}</td>
                <td className="py-2 px-4 text-right">
                  {row.winRate.toFixed(2)}%
                </td>
                <td className="py-2 px-4 text-right">{row.deposit}</td>
                <td className="py-2 px-4 rounded-r-lg text-right">
                  {getEmoji(row.tickets.toString())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {paginatedHolders.map((row, idx) => (
          <div
            key={row.address + idx}
            className={`bg-white/5 rounded-lg p-4 cursor-pointer ${
              selected === idx ? "bg-white/10" : ""
            }`}
            onClick={() => setSelected(idx)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/70">{row.address}</span>
              <span className="text-xl">
                {getEmoji(row.tickets.toString())}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Tickets</span>
                <span>{row.tickets}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Win Rate</span>
                <span>{row.winRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Deposit</span>
                <span>{row.deposit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className={`px-6 py-2 rounded-md ${
            hasMore
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
          onClick={() => hasMore && setCurrentPage((prev) => prev + 1)}
          disabled={!hasMore}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Holders;
