import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import marketDetailsService from "../services/marketDetails.service";

interface MarketOrdersProps {
  orderType: "buy" | "sell";
}

function MarketOrders({ orderType }: MarketOrdersProps) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { marketId } = useParams();

  useEffect(() => {
    if (marketId) {
      marketDetailsService
        .getMarketOrders(marketId, orderType)
        .then((response) => setOrders(response))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [marketId, orderType]);

  return (
    <div className="overflow-x-auto bg-background text-on-background p-4 rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-on-primary">
            <th className="py-2 px-4 text-right">قیمت</th>
            <th className="py-2 px-4 text-right">ارزش</th>
            <th className="py-2 px-4 text-right">حجم باقیمانده</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-secondary-container hover:bg-primary-container"
              >
                <td className="py-2 px-4">{order.price}</td>
                <td className="py-2 px-4">{order.value}</td>
                <td className="py-2 px-4">{order.remain}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketOrders;
