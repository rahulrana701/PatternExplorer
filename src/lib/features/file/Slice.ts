import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  actualfile: "",
};

const actualFileSlice = createSlice({
  name: "actualFile",
  initialState,
  reducers: {
    updateActualFile: (state, action) => {
      state.actualfile = action.payload;
    },
  },
});

export const { updateActualFile } = actualFileSlice.actions;
export default actualFileSlice.reducer;
