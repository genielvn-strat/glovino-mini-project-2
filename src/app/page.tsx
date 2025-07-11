import { getBlogs } from "@/actions/blogAction";
import { auth } from "@/auth";
import AddBlogPost from "@/components/AddBlogPost";
import BlogPostCardList from "@/components/BlogPostCardList";

export default async function Home() {
    const blogs = (await getBlogs()).reverse();
    const session = await auth();
    
    return (
        <div className="pb-32">
            <AddBlogPost session={session}/>
            <BlogPostCardList blogPosts={blogs} />
        </div>
    );
}
