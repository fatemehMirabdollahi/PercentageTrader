import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarketService from "../services/markets.service";
import MarketsTable from "../components/MarketsTable"; // Import the table component
function Markets() {
  const tabs = [
    { name: "پایه تومان", value: "irt" },
    { name: "پایه تتر", value: "usdt" },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const [markets, setMarkets] = useState<MarketsData | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedTab = queryParams.get("tab");
    if (selectedTab && tabs.some((t) => t.value === selectedTab)) {
      setActiveTab(selectedTab);
    } else {
      handleTabChange(tabs[0].value);
    }
  }, [location.search]);

  useEffect(() => {
    MarketService.getMarkets()
      .then((response) => {
        setMarkets(response);
      })
      .catch((err) => {
        console.error("Error fetching markets:", err);
      });
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/?tab=${tab}`, { replace: true });
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === tab.value
                ? "border-b-2 border-primary text-primary"
                : "text-secondary"
            }`}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {markets ? (
          <MarketsTable
            data={markets}
            activeTab={activeTab as "irt" | "usdt"}
          />
        ) : (
          <p className="text-secondary">درحال بارگزاری اطلاعات ...</p>
        )}
      </div>
    </div>
  );
}

export default Markets;
