import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import { sendCommentReaction } from "./commentSlice";

function CommentReactions({ comment }) {
  const dispatch = useDispatch();
  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };
  return (
    <Stack direction="row" alignItems={"center"}>
      <IconButton
        sx={{ color: "primary.main" }}
        onClick={() => handleClick("like")}
      >
        <ThumbUpIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">{comment?.reactions?.like}</Typography>

      <IconButton
        sx={{ color: "error.main" }}
        onClick={() => handleClick("dislike")}
      >
        <ThumbDownIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">{comment?.reactions?.dislike}</Typography>
    </Stack>
  );
}

export default CommentReactions;
