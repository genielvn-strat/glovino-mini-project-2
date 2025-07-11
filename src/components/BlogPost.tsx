"use client";
import { IBlogPost } from "@/types/IBlogPost";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Window from "./Window";
import { deleteBlogPost } from "@/actions/blogAction";
import BlogPostEdit from "./BlogPostEdit";
import { Session } from "next-auth";

interface BlogPostProps {
    blog: IBlogPost;
    commentsNumber?: number;
    slug: string;
    session: Session | null;
}

const BlogPost: React.FC<BlogPostProps> = ({
    blog,
    commentsNumber,
    slug,
    session,
}) => {
    const [mode, setMode] = useState<string>("read");

    return (
        <div className="flex flex-col gap-2 py-1">
            <h1 className="text-5xl font-bold">{blog.title}</h1>
            <p className="text-gray-600 text-2xl">{blog.summary}</p>
            <p className="text-gray-600 italic">
                Written by {blog.author} ||{" "}
                {blog.created_at?.toLocaleDateString()}
            </p>
            <div className="flex py-2 border-2 border-gray-300 border-x-0 text-sm text-gray-800 gap-4 select-none">
                <p>
                    {commentsNumber}{" "}
                    {commentsNumber === 1 ? "comment" : "comments"}
                </p>
                {blog.author_uid === session?.user?.uid && (
                    <>
                        <p
                            className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                            onClick={() => {
                                setMode("edit");
                            }}
                        >
                            <i className="bi bi-pencil " /> {"Edit"}
                        </p>
                        <p
                            className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                            onClick={() => {
                                setMode("delete");
                            }}
                        >
                            <i className="bi bi-trash " /> {"Delete"}
                        </p>
                    </>
                )}
            </div>
            {mode === "edit" ? (
                <>
                    <BlogPostEdit blog={blog} show={setMode} slug={slug} />
                </>
            ) : (
                <div className="blog-markdown py-3">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {blog.body}
                    </ReactMarkdown>
                </div>
            )}
            {mode === "delete" && (
                <Window
                    confirm={async () => {
                        await deleteBlogPost(blog.id);
                        setMode("read");
                    }}
                    cancel={() => setMode("read")}
                    message="Are you sure you want to delete this post?"
                    title="Delete Post"
                    mode={setMode}
                    danger
                />
            )}
        </div>
    );
};

export default BlogPost;
