import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React from "react";

const DIALOG_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",

  zIndex: 100,
};

function Dialog() {
  return (
    <Card sx={{ ...DIALOG_STYLES, p: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Delete this item?</Typography>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            sx={{ backgroundColor: "secondary.main", color: "text.primary" }}
          >
            CONFIRM
          </Button>
          <Button sx={{ backgroundColor: "error.main", color: "text.primary" }}>
            CANCEL
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

export default Dialog;
