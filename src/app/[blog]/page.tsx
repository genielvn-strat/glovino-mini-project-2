import { getBlogPost } from "@/actions/blogAction";
import { getComments } from "@/actions/commentAction";
import BlogPost from "@/components/BlogPost";
import CommentList from "@/components/CommentList";
import { IBlogPost } from "@/types/IBlogPost";
import { IComment } from "@/types/IComment";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Metadata } from "next";

interface BlogPostProps {
    params: Promise<{
        blog: string;
    }>;
}

export async function generateMetadata({
    params,
}: BlogPostProps): Promise<Metadata> {
    const blog = await params;

    const slug = blog.blog;

    const blogPost: IBlogPost = await getBlogPost(slug);

    return {
        title: blogPost.title,
        description: blogPost.summary,
    };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { blog } = await params;
    const session = await auth();

    const blogPost: IBlogPost = await getBlogPost(blog);
    const comments: IComment[] = await getComments(blog);

    if (!blogPost) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto py-5 pt-5 pb-32">
            <BlogPost
                blog={blogPost}
                commentsNumber={comments.length}
                slug={blog}
                session={session}
            />
            <CommentList comments={comments} slug={blog} session={session} />
        </div>
    );
}
