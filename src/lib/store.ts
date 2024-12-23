import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/filename/fileSlice";
import ActualFileReducer from "./features/file/Slice";
import dataReducer from "./features/data/dataSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      filename: fileReducer,
      actualFile: ActualFileReducer,
      data: dataReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
