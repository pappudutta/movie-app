import React, { useState } from "react";
import "./style.scss";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const activeTab = (tab, index) => {
    setSelectedTab(index);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className={`movingBg`} style={{ left: selectedTab * 100 }} />
      </div>
    </div>
  );
};

export default SwitchTab;
