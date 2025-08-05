import { useSelector } from "react-redux";

import BlogItem from "@/components/BlogItem";
import type { RootState } from "@/store/store";

function HomePage() {
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  return (
    <>
      {blogs.map(blog => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </>
  );
}

export default HomePage;
