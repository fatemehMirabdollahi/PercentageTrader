import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/base/Tabs";
import MarketOrders from "../components/MarketOrders";
import MarketTrades from "../components/MarketTrades";

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
    <div className="p-4 flex flex-col gap-4 ">
      <div className="flex items-center gap-2" onClick={() => navigate(-1)}>
        <span className="cursor-pointer">لیست رمزارزها</span>
        <ChevronLeftIcon className="size-4" />
        <span className="font-bold">اطلاعات بازار</span>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="mt-4 w-full">
        {activeTab === "trades" && <MarketTrades />}
        {activeTab === "buy" && <MarketOrders orderType="buy" />}
        {activeTab === "sell" && <MarketOrders orderType="sell" />}
      </div>
    </div>
  );
}

export default MarketDetails;
