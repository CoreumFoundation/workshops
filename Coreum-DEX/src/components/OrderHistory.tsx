import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatOrder } from "../features/dex/queries";
import { useDex } from "../hooks/useDex";

export const OrderHistory = () => {
  const { orderHistory, isLoading } = useSelector(
    (state: RootState) => state.dex
  );
  const { fetchHistory } = useDex();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (isLoading) {
    return <div>Loading order history...</div>;
  }

  return (
    <div>
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No order history found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Side</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => {
              const formatted = formatOrder(order);
              return (
                <tr key={order.id}>
                  <td>{formatted.side}</td>
                  <td>{formatted.price}</td>
                  <td>{formatted.volume}</td>
                  <td>{formatted.total}</td>
                  <td>{formatted.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
