import { IBlogPost } from "@/types/IBlogPost";
import React from "react";
import BlogCard from "./BlogPostCard";

interface BlogPostCardListProps {
    blogPosts: IBlogPost[];
}

const BlogPostCardList: React.FC<BlogPostCardListProps> = ({ blogPosts }) => {
    return (
        <div>
            {blogPosts.map((post, idx) => (
                <BlogCard post={post} key={idx} />
            ))}
        </div>
    );
};

export default BlogPostCardList;
