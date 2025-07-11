import { getOwnedBlogs } from "@/actions/blogAction";
import { auth, signIn, signOut } from "@/auth";
import BlogPostOwned from "@/components/BlogPostOwned";

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto py-5 pt-5 ">
                <h1 className="text-4xl font-bold">Sign In</h1>
                <p>
                    {
                        'You need to sign in with your Google account. You can still set your author name as "Anonymous" or anything else you prefer.'
                    }
                </p>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-50 text-black rounded-lg hover:bg-gray-100 transition-colors duration-300 border-1 border-gray-800"
                    >
                        <i className="bi bi-google" /> Sign In with Google
                    </button>
                </form>
            </div>
        );
    }

    const blog = await getOwnedBlogs();

    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto py-5 pt-5 pb-32">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Blog Management</h1>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className="px-4 py-2 bg-gray-50 text-black rounded-lg hover:bg-gray-100 transition-colors duration-300 border-1 border-gray-800">
                        Sign Out
                    </button>
                </form>
            </div>
            <BlogPostOwned blogs={blog} />
        </div>
    );
}
