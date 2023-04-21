import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getComment } from "./commentSlice";
import { COMMENT_PER_PAGE } from "../../app/config";
import { Pagination, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";

function CommentList({ postId }) {
  const dispatch = useDispatch();
  const {
    isLoading,
    commentsById,
    commentsByPost,
    currentPage,
    totalComments,
  } = useSelector(
    (state) => ({
      commentsByPost: state.comment.commentsByPost[postId],
      totalComments: state.comment.totalCommentsByPost[postId],
      currentPage: state.comment.currentPageByPost[postId] || 1,
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (postId) dispatch(getComment({ postId }));
  }, [postId, dispatch]);

  let renderComments;

  if (commentsByPost) {
    const comments = commentsByPost.map((commentId) => commentsById[commentId]);

    renderComments = (
      <Stack spacing={1.5}>
        {comments?.map((comment) => (
          <CommentCard key={comment._id} comment={comment} postId={postId} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }

  const totalPages = Math.ceil(totalComments / COMMENT_PER_PAGE);

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No Comment"}
        </Typography>
        {totalComments > COMMENT_PER_PAGE && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComment({ page, postId }))}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
