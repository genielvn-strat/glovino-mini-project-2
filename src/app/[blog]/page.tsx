import { getBlogPost } from "@/actions/blogAction";
import { getComments } from "@/actions/commentAction";
import BlogPost from "@/components/BlogPost";
import CommentList from "@/components/CommentList";
import { IBlogPost } from "@/types/IBlogPost";
import { IComment } from "@/types/IComment";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostProps {
    params: {
        blog: string;
    };
}

export async function generateMetadata({
    params,
}: BlogPostProps): Promise<Metadata> {
    const blog = (await params).blog;

    const blogPost: IBlogPost = await getBlogPost(blog);

    console.log(blogPost);

    return {
        title: blogPost.title,
        description: blogPost.summary,
    };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { blog } = await params;

    const blogPost: IBlogPost = await getBlogPost(blog);
    const comments: IComment[] = await getComments(blog);

    if (!blogPost) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto p-5">
            <BlogPost blog={blogPost} commentsNumber={comments.length} />
            <CommentList comments={comments} slug={blog} />
        </div>
    );
}
