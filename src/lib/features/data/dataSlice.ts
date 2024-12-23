import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    Categorization: [
      {
        timestamp: "",
        content: "",
        message: "",
        category: "",
      },
    ],
    Themes: {},
    Insights: {
      Patterns: "",
      Active_Themes: "",
      Relationships: "",
      Recurring_Themes: "",
    },
    Frequency_Analysis: {
      Content_Types: {
        Link: "",
        Reflection: "",
        Quote: "",
      },
      content_types: {
        Link: "",
        Reflection: "",
        Quote: "",
      },
      Repeated_Topics: [],
      Topics: {},
      Repeated_Themes: [],
      Themes: {},
    },
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action) => {
      const dataObject = action.payload;
      state.data = dataObject;
    },
  },
});
export const { updateData } = dataSlice.actions;
export default dataSlice.reducer;
