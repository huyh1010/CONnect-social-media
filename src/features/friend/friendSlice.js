import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  userById: {},
  currentPageUsers: [],
  totalPages: 1,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    getFriendsListSucess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    getFriendsIncomingRequestSucess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },

    getFriendsOutgoingRequestSucess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    sendRequestSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    declineRequestSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    acceptRequestSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    removeFriendSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { targetUserId } = action.payload;
      state.userById[targetUserId].friendship = null;
    },
    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { targetUserId } = action.payload;
      state.userById[targetUserId].friendship = null;
    },
  },
});

export const getUserList =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const res = await apiService.get(`/users`, { params });
      dispatch(slice.actions.getUserListSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.essage);
    }
  };

export const getFriendsList =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const res = await apiService.get(`/friends`, { params });
      dispatch(slice.actions.getFriendsListSucess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.essage);
    }
  };

export const getFriendsIncomingRequest =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const res = await apiService.get(`/friends/requests/incoming`, {
        params,
      });
      dispatch(slice.actions.getFriendsIncomingRequestSucess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.essage);
    }
  };

export const getFriendsOutgoingRequest =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const res = await apiService.get(`/friends/requests/outgoing`, {
        params,
      });
      dispatch(slice.actions.getFriendsOutgoingRequestSucess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.essage);
    }
  };

export const sendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const res = await apiService.post(`/friends/requests`, {
      to: targetUserId,
    });
    dispatch(slice.actions.sendRequestSuccess({ ...res.data, targetUserId }));
    toast.success("Request sent");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.essage);
  }
};

export const declineRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const res = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    dispatch(
      slice.actions.declineRequestSuccess({ ...res.data, targetUserId })
    );
    toast.success("Request declined");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.essage);
  }
};
export const acceptRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const res = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    dispatch(slice.actions.acceptRequestSuccess({ ...res.data, targetUserId }));
    toast.success("Request accepted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.essage);
  }
};

export const removeFriend = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const res = await apiService.delete(`/friends/${targetUserId}`);
    dispatch(slice.actions.removeFriendSuccess({ ...res.data, targetUserId }));
    toast.success("Friend removed");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.essage);
  }
};

export const cancelRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const res = await apiService.delete(`/friends/requests/${targetUserId}`);
    dispatch(slice.actions.cancelRequestSuccess({ ...res.data, targetUserId }));
    toast.success("Request canceled");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.essage);
  }
};

export default slice.reducer;
