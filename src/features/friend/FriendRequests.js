import React, { useState } from "react";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import IncomingRequest from "./IncomingRequest";
import OutboxIcon from "@mui/icons-material/Outbox";
import OutgoingRequest from "./OutgoingRequest";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { capitalCase } from "change-case";

function FriendRequests() {
  const [currentTab, setCurrentTab] = useState("incoming");

  const handleChange = (newValue) => {
    setCurrentTab(newValue);
  };

  const REQUEST_TABS = [
    {
      value: "incoming",
      icon: <MoveToInboxIcon sx={{ fontSize: 24 }} />,
      component: <IncomingRequest />,
    },
    {
      value: "outgoing",
      icon: <OutboxIcon sx={{ fontSize: 24 }} />,
      component: <OutgoingRequest />,
    },
  ];
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>

      <Tabs
        value={currentTab}
        onChange={(e, value) => handleChange(value)}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
      >
        {REQUEST_TABS.map((tab) => (
          <Tab
            disableRipple
            label={capitalCase(tab.value)}
            key={tab.value}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {REQUEST_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default FriendRequests;
