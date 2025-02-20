import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Tabs from "../components/base/Tabs";
import MarketTrades from "../components/MarketTrades";
import MarketOrders from "../components/MarketOrders";

function MarketDetails() {
  const tabs = [
    { name: "سفارشات خرید", value: "buy" },
    { name: "سفارشات فروش", value: "sell" },
    { name: "معاملات", value: "trades" },
  ];

  const { marketId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedTab = queryParams.get("tab");
    if (selectedTab && tabs.some((t) => t.value === selectedTab)) {
      setActiveTab(selectedTab);
    } else {
      handleTabChange(tabs[0].value);
    }
  }, [location.search]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/market/${marketId}/?tab=${tab}`, { replace: true });
  };

  return (
    <div className="p-4">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="mt-4">
        {activeTab === "trades" && <MarketTrades />}
        {activeTab === "buy" && <MarketOrders orderType="buy" />}
        {activeTab === "sell" && <MarketOrders orderType="sell" />}
      </div>
    </div>
  );
}

export default MarketDetails;
