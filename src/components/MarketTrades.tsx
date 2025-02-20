import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import marketDetailsService from "../services/marketDetails.service";

function MarketTrades() {
  const [trades, setTrades] = useState<Trade[] | null>(null);
  const { marketId } = useParams();

  useEffect(() => {
    const fetchData = () => {
      if (marketId) {
        marketDetailsService
          .getMarketTrades(marketId)
          .then((response) => setTrades(response))
          .catch((err) => console.error("Error fetching markets:", err));
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [marketId]);

  return (
    <div className="overflow-x-auto bg-background text-on-background p-4 rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-on-primary">
            <th className="py-2 px-4 text-right">زمان</th>
            <th className="py-2 px-4 text-right">قیمت</th>
            <th className="py-2 px-4 text-right">حجم</th>
          </tr>
        </thead>
        <tbody>
          {trades &&
            trades.map((trade: Trade) => (
              <tr
                key={trade.id}
                className="border-b border-secondary-container hover:bg-primary-container"
              >
                <td className="py-2 px-4">{trade.time}</td>
                <td className="py-2 px-4">{trade.price.toLocaleString()}</td>
                <td className="py-2 px-4">
                  {trade.match_amount.toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketTrades;
