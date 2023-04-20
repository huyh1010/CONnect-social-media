import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShareIcon from "@mui/icons-material/Share";
import AccountGeneral from "../features/user/AccountGeneral";
import AccountSocialLinks from "../features/user/AccountSocialLinks";
import { capitalCase } from "change-case";

function AccountPage() {
  const [currentTab, setCurrentTab] = useState("general");
  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <AccountGeneral />,
    },
    {
      value: "social links",
      icon: <ShareIcon sx={{ fontSize: 30 }} />,
      component: <AccountSocialLinks />,
    },
  ];
  const handleChange = (newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Container>
      <Typography variant="h5">Account Settings</Typography>
      <Tabs
        value={currentTab}
        onChange={(e, value) => handleChange(value)}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            disableRipple
            label={capitalCase(tab.value)}
            key={tab.value}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box sx={{ mb: 5 }} />
      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default AccountPage;
