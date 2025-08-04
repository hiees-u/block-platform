// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    theme: themeReducer
  },
});

// Type hỗ trợ cho TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
