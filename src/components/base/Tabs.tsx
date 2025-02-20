interface Tab {
  name: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string | undefined;
  onTabChange: (tab: string) => void;
}

function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`py-2 px-4 ${
            activeTab === tab.value
              ? "border-b-2 border-primary text-primary"
              : "text-secondary cursor-pointer"
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
