import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import { createReaction } from "./postSlice";

function PostReactions({ post }) {
  const dispatch = useDispatch();
  const handleClick = (emoji) => {
    dispatch(createReaction({ postId: post._id, emoji }));
  };
  return (
    <Stack direction="row" alignItems={"center"}>
      <IconButton
        sx={{ color: "primary.main" }}
        onClick={() => handleClick("like")}
      >
        <ThumbUpIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="h6">{post?.reactions?.like}</Typography>

      <IconButton
        sx={{ color: "error.main" }}
        onClick={() => handleClick("dislike")}
      >
        <ThumbDownIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="h6">{post?.reactions?.dislike}</Typography>
    </Stack>
  );
}

export default PostReactions;
