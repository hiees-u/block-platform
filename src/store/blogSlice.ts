// src/store/blogSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
}

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
    },
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload);
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
    },
    updateBlog: (state, action: PayloadAction<Blog>) => {
      const index = state.blogs.findIndex(b => b.id === action.payload.id);
      if (index !== -1) state.blogs[index] = action.payload;
    },
  },
});

export const { setBlogs, addBlog, deleteBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
