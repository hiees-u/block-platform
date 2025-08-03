// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

// Type hỗ trợ cho TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
