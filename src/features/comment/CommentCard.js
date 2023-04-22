import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import { fDate } from "../../utils/formatTime";
import CommentReactions from "./CommentReactions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";

import ConfirmDeleteComment from "../../components/CommentDialog";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function CommentCard({ comment, postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };
  const openDialog = () => {
    setIsOpen(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={comment?.author?.avatarUrl} alt={comment?.author?.name} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={{ sm: "center" }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment?.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReactions comment={comment} />
        </Box>
      </Paper>
      <div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon sx={{ fontSize: 30 }} />
        </IconButton>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={openDialog}
        >
          <MenuItem disableRipple>Delete Comment</MenuItem>
          <ConfirmDeleteComment
            closeDialog={closeDialog}
            isOpen={isOpen}
            id={comment._id}
            postId={postId}
          />
        </StyledMenu>
      </div>
    </Stack>
  );
}

export default CommentCard;
