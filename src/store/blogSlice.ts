// src/store/blogSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
}

const sampleBlogs = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "React is a powerful JavaScript library for building user interfaces...",
    author: "John Doe",
  },
  {
    id: "2",
    title: "Understanding Redux Toolkit",
    content: "Redux Toolkit simplifies Redux development by reducing boilerplate...",
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "Tailwind CSS: Utility-First Styling",
    content: "Tailwind CSS allows for rapid UI development with utility classes...",
    author: "Alice Johnson",
  },
];

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: sampleBlogs,
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
