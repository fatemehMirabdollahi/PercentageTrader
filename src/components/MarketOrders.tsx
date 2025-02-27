import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import marketDetailsService from "../services/marketDetails.service";
import TradeForm from "./TradeForm";

interface MarketOrdersProps {
  orderType: "buy" | "sell";
}

function MarketOrders({ orderType }: MarketOrdersProps) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [cumulativeRow, setCumulativeRow] = useState({
    price: 0,
    value: 0,
    remain: 0,
  });

  const { marketId } = useParams();

  useEffect(() => {
    const fetchData = () => {
      if (marketId) {
        marketDetailsService
          .getMarketOrders(marketId, orderType)
          .then((response) => setOrders(response))
          .catch(() => toast.error("خطا در دریافت اطلاعات"));
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [marketId]);

  useEffect(() => {
    if (orders) {
      const sums = orders.reduce(
        (acc, item) => {
          acc.remain += Number(item.remain);
          acc.value += Number(item.value);
          acc.price += Number(item.price) * Number(item.remain);
          return acc;
        },
        { price: 0, value: 0, remain: 0 }
      );

      setCumulativeRow({
        price: sums.price / sums.remain,
        value: sums.value,
        remain: sums.remain,
      });
    }
  }, [orders]);
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
                <td className="py-2 px-4">{order.price.toLocaleString()}</td>
                <td className="py-2 px-4">{order.value.toLocaleString()}</td>
                <td className="py-2 px-4">{order.remain.toLocaleString()}</td>
              </tr>
            ))}
          {orders?.length ? (
            <tr className="bg-primary text-on-primary">
              <td className="p-4">
                {cumulativeRow.price.toLocaleString() && 0}
              </td>
              <td className="p-4">{cumulativeRow.value.toLocaleString()}</td>
              <td className="p-4">{cumulativeRow.remain.toLocaleString()}</td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <TradeForm
        orderBook={orders || []}
        side={orderType}
        ramainSum={cumulativeRow.remain}
      />
    </div>
  );
}

export default MarketOrders;
