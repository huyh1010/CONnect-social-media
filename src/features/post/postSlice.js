import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { CloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPosts = action.payload;

      if (state.currentPagePosts.length % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPosts._id] = newPosts;
      state.currentPagePosts.unshift(newPosts._id);
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { posts, count } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id)) {
          state.currentPagePosts.push(post._id);
        }
      });
      state.totalPosts = count;
    },
    createReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
    resetPosts(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },
    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { id } = action.payload;
      delete state.postsById[id];
      state.currentPagePosts = state.currentPagePosts.filter(
        (postId) => postId !== id
      );
    },
    editPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatePost = action.payload;
      state.postsById[updatePost._id] = updatePost;
    },
  },
});

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const imageUrl = await CloudinaryUpload(image);
      const res = await apiService.post("/posts", { content, image: imageUrl });
      dispatch(slice.actions.createPostSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deletePost = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const res = await apiService.delete(`posts/${id}`);
    dispatch(slice.actions.deletePostSuccess({ ...res.data, id }));

    toast.success("Remove post success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editPost =
  ({ id, content, image, user }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const imageUrl = await CloudinaryUpload(image);
      const res = await apiService.put(`/posts/${id}`, {
        content,
        image: imageUrl,
        user,
      });
      dispatch(slice.actions.editPostSuccess(res.data));

      toast.success("Update post success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getPost =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);

    try {
      const params = { page, limit };
      const res = await apiService.get(`/posts/user/${userId}`, { params });
      if (page === 1) dispatch(slice.actions.resetPosts());
      dispatch(slice.actions.getPostSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const createReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);

    try {
      const res = await apiService.post(`/reactions`, {
        targetId: postId,
        emoji,
        targetType: "Post",
      });
      dispatch(
        slice.actions.createReactionSuccess({ reactions: res.data, postId })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
