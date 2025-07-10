import { getBlogs } from "@/actions/blogAction";
import AddBlogPost from "@/components/AddBlogPost";
import BlogPostCardList from "@/components/BlogPostCardList";

export default async function Home() {
    const blogs = (await getBlogs()).reverse();

    return (
        <div className="pb-32">
            <AddBlogPost />
            <BlogPostCardList blogPosts={blogs} />
        </div>
    );
}
