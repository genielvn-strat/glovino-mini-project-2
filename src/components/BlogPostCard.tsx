import { IBlogPost } from "@/types/IBlogPost";
import Link from "next/link";
import React from "react";

interface BlogPostCardProps {
    post: IBlogPost;
}

const BlogCard: React.FC<BlogPostCardProps> = ({ post }) => {
    const imageMatch = post.body.match(/!\[.*?\]\((.*?)\)/);
    const imageUrl = imageMatch?.[1];

    return (
        <div className="rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Post image"
                    className="w-full h-64 object-cover rounded-t-2xl"
                />
            )}
        <div className="p-4">

            <h1 className="font-bold text-4xl">{post.title}</h1>
            <p className="italic text-sm">Written by {post.author}</p>
            <div className="blog-markdown py-2">
                <p>{post.summary}</p>
                <p className="text-right">
                    <Link
                        href={`/${post.slug}`}
                        className="text-blue-500 hover:underline"
                    >
                        Read more
                    </Link>
                </p>
            </div>
            </div>
        </div>
    );
};

export default BlogCard;
