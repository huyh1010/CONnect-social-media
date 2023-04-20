import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "./postSlice";
import PostCard from "./PostCard";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { currentPagePosts, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts?.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId) dispatch(getPost({ userId, page }));
  }, [dispatch, userId, page]);

  return (
    <>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            onClick={() => setPage((page) => page + 1)}
            loading={isLoading}
            disabled={Boolean(totalPosts) && posts?.length >= totalPosts}
          >
            Load More
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default PostList;
