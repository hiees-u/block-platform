import { type Blog } from "@/store/blogSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function BlogItem({ blog }: { blog: Blog }) {
  return (
    <Card className="mb-4 dark:bg-white dark:text-black">
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>by {blog.author}</CardDescription>
      </CardHeader>
      <CardContent>{blog.content}</CardContent>
    </Card>
  )
};

export default BlogItem;