import { Chip } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

function FriendStatus({ currentUserId, targetUserId, friendship, sx }) {
  if (currentUserId === targetUserId) return null;

  if (!friendship) return null;

  if (friendship.status === "accepted") {
    return (
      <Chip
        sx={{ ...sx }}
        label="Friend"
        color="success"
        icon={<CheckCircleOutlineIcon />}
      />
    );
  }

  if (friendship.status === "declined") {
    return (
      <Chip
        sx={{ ...sx }}
        label="Declined"
        color="error"
        icon={<NotInterestedIcon />}
      />
    );
  }

  if (friendship.status === "pending") {
    const { from, to } = friendship;
    if (from === currentUserId && to === targetUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          label="Request sent"
          color="warning"
          icon={<MarkEmailReadIcon />}
        />
      );
    } else if (from === targetUserId && to === currentUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          label="Waiting for response"
          color="warning"
          icon={<PauseCircleOutlineIcon />}
        />
      );
    }
  }
}

export default FriendStatus;
