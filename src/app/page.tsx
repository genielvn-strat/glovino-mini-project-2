import { getBlogs } from "@/actions/blogAction";
import { auth } from "@/auth";
import AddBlogPost from "@/components/AddBlogPost";
import BlogPostCardList from "@/components/BlogPostCardList";

export default async function Home() {
    const blogs = await getBlogs();
    const session = await auth();

    return (
        <div className="flex flex-col gap-4 pt-4 pb-32">
            <AddBlogPost session={session} />
            <BlogPostCardList blogPosts={blogs} />
        </div>
    );
}
