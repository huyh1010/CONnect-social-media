import { Box } from "@mui/material";
import React from "react";
import logoImg from "../logo.png";
import { Link as RouterLink } from "react-router-dom";

function Logo({ disabledlink = false, sx }) {
  const logo = (
    <Box sx={{ width: 100, height: 100, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (!disabledlink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
