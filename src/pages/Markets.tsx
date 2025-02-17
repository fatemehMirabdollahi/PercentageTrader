import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Markets() {
  const tabs = [
    { name: "پایه تومان", value: "irt" },
    { name: "پایه تتر", value: "usdt" },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedTab = queryParams.get("tab");
    if (selectedTab && tabs.map((t) => t.value).includes(selectedTab)) {
      setActiveTab(selectedTab);
    } else {
      handleTabChange(tabs[0].value);
    }
  }, [location.search]);

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
              activeTab === tab.value ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "irt" ? (
          <div>Simple content for پایه تومان</div>
        ) : (
          <div>Simple content for پایه تتر</div>
        )}
      </div>
    </div>
  );
}

export default Markets;
