import { IBlogPost } from "@/types/IBlogPost";
import Link from "next/link";
import React from "react";

interface BlogPostOwnedProps {
    blogs: IBlogPost[];
}

const BlogPostOwned: React.FC<BlogPostOwnedProps> = ({ blogs }) => {
    return (
        <div className="flex flex-col gap-4 pt-4 pb-32">
            {blogs.length == 0 ? (
                <div>
                    <p>{"You don't have any blogs posted."}</p>
                </div>
            ) : (
                blogs.map((blog) => (
                    <div key={blog.id} className="p-4 border rounded-lg">
                        <Link href={`/${blog.slug}`}>
                            <h2 className="text-xl font-bold hover:underline">
                                {blog.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-500">
                            Last updated:{" "}
                            {blog.updated_at
                                ? new Date(blog.updated_at).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default BlogPostOwned;
