import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filename: "",
};

const fileSlice = createSlice({
  name: "filenameSlice",
  initialState,
  reducers: {
    updateFilename: (state, action) => {
      const newName = action.payload;
      state.filename = newName;
    },
  },
});

export const { updateFilename } = fileSlice.actions;
export default fileSlice.reducer;
