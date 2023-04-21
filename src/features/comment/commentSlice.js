import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENT_PER_PAGE } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  commentsByPost: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { comments, count, page, postId } = action.payload;

      comments.forEach((comment) => {
        state.commentsById[comment._id] = comment;
      });
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.currentPageByPost[postId] = page;
      state.totalCommentsByPost[postId] = count;
    },
    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { id, postId } = action.payload;
      delete state.commentsById[id];
      state.totalCommentsByPost[postId]--;

      state.commentsByPost[postId] = state.commentsByPost[postId].filter(
        (commentId) => commentId !== id
      );
    },
  },
});

export const createComment =
  ({ content, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const res = await apiService.post("/comments", { content, postId });
      dispatch(slice.actions.createCommentSuccess(res.data));
      dispatch(getComment({ postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getComment =
  ({ postId, page = 1, limit = COMMENT_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const params = { page, limit };
      const res = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      dispatch(slice.actions.getCommentSuccess({ ...res.data, postId, page }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deleteComment =
  ({ id, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const res = await apiService.delete(`/comments/${id}`);
      dispatch(slice.actions.deleteCommentSuccess({ ...res.data, id, postId }));
      toast.success("Delete comment success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const res = await apiService.post(`/reactions`, {
        targetId: commentId,
        emoji,
        targetType: "Comment",
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          reactions: res.data,
          commentId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
