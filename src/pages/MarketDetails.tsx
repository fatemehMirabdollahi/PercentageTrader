import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Tabs from "../components/base/Tabs"; // Import the new Tabs component

function MarketDetails() {
  const tabs = [
    { name: "سفارشات خرید", value: "buyOrders" },
    { name: "سفارشات فروش", value: "sellOrders" },
    { name: "معاملات", value: "trades" },
  ];
  const { marketId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/market/${marketId}?tab=${tab}`, { replace: true });
  };

  return (
    <div className="p-4">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default MarketDetails;
