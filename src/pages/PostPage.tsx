import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { addBlog } from "@/store/blogSlice";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState({ text: "", type: "" });

  const handleCreatePost = () => {
    if (!title || !content || !author) {
      setError({ text: "Please fill in all fields.", type: "error" });
      return;
    }
    dispatch(addBlog({ id: Date.now().toString(), title, content, author }));

    setError({ text: "Added successfully!", type: "success" });

    setTimeout(() => {
      navigate("/");
      setError({ text: "", type: "" });
    }, 5000); // 5 giây
  };

  return (
    <>
      <p className="text-4xl font-bold text-center">POST BLOG</p>
      <div className="flex flex-col gap-2 mx-auto max-w-md mt-4">
        <label htmlFor="blog-title">Title a new blog</label>
        <Input
          id="blog-title"
          type="text"
          placeholder="Title"
          value={title}
          className="mb-2 dark:bg-white dark:text-black dark:border-0"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mx-auto max-w-md mt-4">
        <label htmlFor="blog-content">Content a new blog</label>
        <Textarea
          id="blog-content"
          placeholder="Content"
          className="mb-2 dark:bg-white dark:text-black dark:border-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mx-auto max-w-md mt-4">
        <label htmlFor="blog-author">Author a new blog</label>
        <Input
          id="blog-author"
          type="text"
          placeholder="Author"
          className="mb-2 dark:bg-white dark:text-black dark:border-0"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mx-auto max-w-md mt-4">
        <Button onClick={handleCreatePost}>Create Post</Button>
      </div>
      {error.text && <p className={`text-center mt-2 ${error.type === "error" ? "text-red-500" : "text-green-500"}`}>{error.text}</p>}
    </>
  );
}

export default PostPage;
