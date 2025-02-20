import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import MarketsTable from "../components/MarketsTable";
import Tabs from "../components/base/Tabs";
import MarketService from "../services/markets.service";

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
      .then((response) => setMarkets(response))
      .catch(() => {
        toast.error("خطا در دریافت اطلاعات");
      });
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/?tab=${tab}`, { replace: true });
  };

  return (
    <div className="p-4">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="mt-4">
        {markets ? (
          <MarketsTable
            data={markets}
            activeTab={activeTab as "irt" | "usdt"}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Markets;
