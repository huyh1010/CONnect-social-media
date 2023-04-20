import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Box, Stack } from "@mui/material";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <>
      <Stack sx={{ minHeight: "100vh" }}>
        <AlertMsg />
        <MainHeader />

        <Outlet />
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </>
  );
}

export default MainLayout;
