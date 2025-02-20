import React from "react";

interface Market {
  code: string;
  price: number;
  change_24: number;
  volume_24: number;
}

interface MarketData {
  IRT: Market[];
  USDT: Market[];
}

interface MarketTableProps {
  data: MarketData;
  activeTab: "irt" | "usdt";
}

const MarketsTable: React.FC<MarketTableProps> = ({ data, activeTab }) => {
  const markets = activeTab === "irt" ? data.IRT : data.USDT;

  return (
    <div className="overflow-x-auto bg-background text-on-background p-4 rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-on-primary">
            <th className="py-2 px-4 text-right">بازار</th>
            <th className="py-2 px-4 text-right">قیمت</th>
            <th className="py-2 px-4 text-right">تغییر قیمت 24h</th>
            <th className="py-2 px-4 text-right">حجم 24h</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market) => (
            <tr
              key={market.code}
              className="border-b border-secondary-container hover:bg-primary-container"
            >
              <td className="py-2 px-4">{market.code}</td>
              <td className="py-2 px-4">{market.price.toLocaleString()}</td>
              <td
                className={`py-2 px-4 ${
                  market.change_24 >= 0 ? "text-positive" : "text-negative"
                }`}
              >
                {market.change_24}%
              </td>
              <td className="py-2 px-4">{market.volume_24.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketsTable;
