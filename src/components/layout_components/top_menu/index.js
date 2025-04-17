import React from "react";
import { TabNavigation, Tab } from "evergreen-ui";
import { useLocation, useNavigate } from "react-router-dom";

function Menu() {
  const tabs = React.useMemo(
    () => ["Explorer", "Jobs", "ILM", "Settings"],
    []
  );
  const navigate = useNavigate();

  const getCurrentIndex = () => {
    const page = window.location.pathname.replace("/", "");
    return page;
  };

  return (
    <TabNavigation>
      {tabs.map((tab) => {
        const id = tab.toLowerCase().replace(" ", "-");
        const hash = `${id}`;
        return (
          <Tab
            is="a"
            isSelected={hash === getCurrentIndex()}
            key={tab}
            onSelect={() => navigate(hash)}
          >
            {tab}
          </Tab>
        );
      })}
    </TabNavigation>
  );
}

export default Menu;
