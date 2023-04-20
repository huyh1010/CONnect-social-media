import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};

const slice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog(state) {
      state.isOpen = true;
    },
    closeDialog(state) {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = slice.actions;

export default slice.reducer;
