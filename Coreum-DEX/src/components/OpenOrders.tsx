import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatOrder } from "../features/dex/queries";
import { useDex } from "../hooks/useDex";
import { useCancelOrder } from "../hooks/useCancelOrder";
import { ArrowBottomRightIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";
import { useAccount } from "graz";
import { useAppDispatch } from "../store/hooks";
import { setIsTxExecuting } from "../features/general";
import { Modal } from "./Modal";
import { setSelectedOrder } from "../features/dex";
import { convertDexPriceToNumber } from "../utils/convertUnitToSubunit";

export const OpenOrders = () => {
  const { openOrders, isLoading, tokenPair } = useSelector(
    (state: RootState) => state.dex
  );
  const { data: account } = useAccount();
  const { fetchOrders } = useDex();
  const { cancelOrder } = useCancelOrder();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedOrderId) return;

    try {
      dispatch(setIsTxExecuting(true));
      await cancelOrder(selectedOrderId);
      setIsCancelModalOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  };

  const handleOrderClick = (order: any) => {
    const newOrder = { ...order };
    dispatch(setSelectedOrder(newOrder));
  };

  const filteredOrders = openOrders.filter((order) => {
    const formatted = formatOrder(order);
    if (filter === "all") return true;
    return formatted.side === filter.charAt(0).toUpperCase() + filter.slice(1);
  });

  const paginatedOrders = filteredOrders.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = filteredOrders.length > currentPage * ITEMS_PER_PAGE;

  if (isLoading) {
    return <div>Loading open orders...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 gap-2">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "all"
              ? "bg-white/20 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "buy"
              ? "bg-green-500/20 text-green-400"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          onClick={() => {
            setFilter("buy");
            setCurrentPage(1);
          }}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "sell"
              ? "bg-red-500/20 text-red-400"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          onClick={() => {
            setFilter("sell");
            setCurrentPage(1);
          }}
        >
          Sell
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-white min-w-[800px]">
          <thead>
            <tr className="text-left text-white/70 text-sm">
              <th className="py-2 px-4">Side</th>
              <th className="py-2 px-4 text-right">Price</th>
              <th className="py-2 px-4 text-right">Volume</th>
              <th className="py-2 px-4 text-right">Total</th>
              <th className="py-2 px-4 text-right">Remaining</th>
              <th className="py-2 px-4 text-right">Status</th>
              <th className="py-2 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-white/60">
                  No open orders found.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order, idx) => {
                const formatted = formatOrder(order);
                const isCreator = order.creator === account?.bech32Address;
                return (
                  <tr
                    key={order.id + idx}
                    className={`cursor-pointer ${
                      selected === idx ? "bg-white/10" : ""
                    } rounded-lg`}
                    onClick={() => {
                      setSelected(idx);
                      handleOrderClick(order);
                    }}
                  >
                    <td className="py-2 px-4 rounded-l-lg flex items-center gap-2">
                      {formatted.side === "Buy" ? (
                        <ArrowBottomRightIcon className="text-green-400" />
                      ) : (
                        <ArrowTopLeftIcon className="text-red-400" />
                      )}
                      <span>{formatted.side}</span>
                    </td>
                    <td className="py-2 px-4 text-right">
                      {convertDexPriceToNumber(formatted.price)}
                    </td>
                    <td className="py-2 px-4 text-right">
                      {formatted.volume}{" "}
                      <span className="text-white/60">
                        {tokenPair.base.symbol}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right">
                      {formatted.total}{" "}
                      <span className="text-white/60">
                        {tokenPair.quote.symbol}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right">
                      {formatted.remainingQuantity}{" "}
                      <span className="text-white/60">
                        {tokenPair.base.symbol}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right">{formatted.status}</td>
                    <td className="py-2 px-4 rounded-r-lg text-right">
                      {isCreator && (
                        <button
                          className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md hover:bg-red-500/30 transition-colors"
                          onClick={(e) => handleCancelOrder(order.id, e)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedOrders.length === 0 ? (
          <div className="py-4 text-center text-white/60">
            No open orders found.
          </div>
        ) : (
          paginatedOrders.map((order, idx) => {
            const formatted = formatOrder(order);
            const isCreator = order.creator === account?.bech32Address;
            return (
              <div
                key={order.id + idx}
                className={`bg-white/5 rounded-lg p-4 cursor-pointer ${
                  selected === idx ? "bg-white/10" : ""
                }`}
                onClick={() => {
                  setSelected(idx);
                  handleOrderClick(order);
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {formatted.side === "Buy" ? (
                      <ArrowBottomRightIcon className="text-green-400" />
                    ) : (
                      <ArrowTopLeftIcon className="text-red-400" />
                    )}
                    <span className="text-sm">{formatted.side}</span>
                  </div>
                  <span className="text-sm text-white/70">
                    {formatted.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Price</span>
                    <span>{convertDexPriceToNumber(formatted.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Volume</span>
                    <span>
                      {formatted.volume} {tokenPair.base.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Total</span>
                    <span>
                      {formatted.total} {tokenPair.quote.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Remaining</span>
                    <span>
                      {formatted.remainingQuantity} {tokenPair.base.symbol}
                    </span>
                  </div>
                </div>
                {isCreator && (
                  <div className="mt-2 flex justify-end">
                    <button
                      className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md hover:bg-red-500/30 transition-colors text-sm"
                      onClick={(e) => handleCancelOrder(order.id, e)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
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

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedOrderId(null);
        }}
        title="Cancel Order"
      >
        <div className="p-4 text-white w-full max-w-md mx-auto">
          <div className="bg-indigo-900/30 rounded-lg p-6 mb-6">
            <p className="text-lg font-medium mb-2">Confirm Cancellation</p>
            <p className="text-white/80 mb-6">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-red-500/20 text-red-400 px-4 py-2 rounded-md hover:bg-red-500/30 transition-colors"
                onClick={handleConfirmCancel}
              >
                Cancel Order
              </button>
              <button
                className="flex-1 bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors"
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setSelectedOrderId(null);
                }}
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OpenOrders;
