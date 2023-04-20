import React from "react";
import useAuth from "../../hooks/useAuth";
import FriendStatus from "../friend/FriendStatus";
import { Avatar, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

function ProfileCover({ profile }) {
  const {
    name,
    friendship,
    avatarUrl,
    coverUrl,
    jobTitle,
    _id: targetUserId,
  } = profile;
  const { user } = useAuth();
  const currentUserId = user._id;

  const RootStyle = styled("div")(({ theme }) => ({
    "&:before": {
      top: 0,
      zIndex: 9,
      content: "''",
      width: "100%",
      height: "100%",
      position: "absolute",
    },
  }));

  const InfoStyle = styled("div")(({ theme }) => ({
    right: 0,
    left: 0,
    zIndex: 99,
    marginTop: theme.spacing(5),
    position: "absolute",
    [theme.breakpoints.up("md")]: {
      right: "auto",
      display: "flex",
      alignItems: "center",
      left: theme.spacing(3),
      bottom: theme.spacing(5),
    },
  }));

  const friendStatus = (
    <FriendStatus
      sx={{ m: 1 }}
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );

  const handleError = (e) => {
    const imgIndex = Math.floor(Math.random() * 5) + 1;
    e.target.src = `/cover/pic${imgIndex}.jpg`;
    e.target.onError = null;
  };
  return (
    <RootStyle>
      <InfoStyle>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{jobTitle}</Typography>
          {friendStatus}
        </Box>
      </InfoStyle>

      <Box sx={{ overflow: "hidden" }}>
        <img
          src={coverUrl}
          alt="cover"
          width="100%"
          height="100%"
          onError={handleError}
        />
      </Box>
    </RootStyle>
  );
}

export default ProfileCover;
