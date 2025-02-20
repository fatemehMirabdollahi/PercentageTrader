import { useState } from "react";
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";

interface MarketTableProps {
  data: MarketsData;
  activeTab: "irt" | "usdt";
}

const ITEMS_PER_PAGE = 10;

function MarketsTable({ data, activeTab }: MarketTableProps) {
  const [pagination, setPagination] = useState({
    irt: {
      currentPage: 1,
      totalPages: Math.ceil(data.irt.length / ITEMS_PER_PAGE),
    },
    usdt: {
      currentPage: 1,
      totalPages: Math.ceil(data.usdt.length / ITEMS_PER_PAGE),
    },
  });

  const navigate = useNavigate();

  const activeMarkets = activeTab === "irt" ? data.irt : data.usdt;
  const { currentPage, totalPages } = pagination[activeTab];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMarkets = activeMarkets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], currentPage: page },
    }));
  };

  const openMarketDetails = (marketId: number) => {
    navigate(`/market/${marketId}`);
  };

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
          {paginatedMarkets.map((market: Market) => (
            <tr
              key={market.code}
              className="border-b border-secondary-container hover:bg-primary-container cursor-pointer"
              onClick={() => {
                openMarketDetails(market.id);
              }}
            >
              <td className="py-2 px-4">
                <div className="flex">
                  <img
                    src={market.currency1.image}
                    className="w-8 h-8"
                    alt=""
                  />
                  <div className="flex flex-col px-2 gap-1">
                    <span>{market.currency1.title}</span>
                    <span className="text-xs font-light">{market.code}</span>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4">
                {market.price.toLocaleString()}{" "}
                <span className="unit">{market.currency2.code}</span>
              </td>
              <td
                className={`py-2 px-4 ${
                  market.change_24 >= 0 ? "text-positive" : "text-negative"
                }`}
              >
                <span dir="ltr"> {market.change_24}% </span>
              </td>
              <td className="py-2 px-4">
                {market.volume_24.toLocaleString()}{" "}
                <span className="unit">{market.currency1.code}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MarketsTable;
