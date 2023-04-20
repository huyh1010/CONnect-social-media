import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comment/commentSlice";
import friendReducer from "../features/friend/friendSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import dialogReducer from "../features/dialog/dialogSlice";

const rootReducer = {
  comment: commentReducer,
  friend: friendReducer,
  post: postReducer,
  user: userReducer,
  dialog: dialogReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
