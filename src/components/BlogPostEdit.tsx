import { updateBlogPost } from "@/actions/blogAction";
import {
    headerOneCommand,
    headerThreeCommand,
    headerTwoCommand,
    imageCommand,
} from "@/lib/reactmde";
import { IBlogPost } from "@/types/IBlogPost";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

interface BlogPostEditProps {
    blog: IBlogPost;
    show: Dispatch<SetStateAction<string>>;
    slug: string;
}

const BlogPostEdit: React.FC<BlogPostEditProps> = ({ blog, show, slug }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [body, setBody] = useState<string>(blog.body);
    const [title, setTitle] = useState<string>(blog.title);
    const [summary, setSummary] = useState<string>(blog.summary);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const response = await updateBlogPost(formData, blog.id, slug);

            if (response?.error) {
                setError(response.error);
                return;
            }
            show("read");
        } catch (err) {
            console.error("Error submitting comment:", err);
            setError(
                "An error occurred while submitting your comment. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter blog post title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Summary</label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Write your blog summary here."
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <input type="hidden" name="body" value={body} />
                <ReactMde
                    value={body}
                    onChange={setBody}
                    disablePreview
                    toolbarCommands={[
                        ["H1", "H2", "H3"],
                        ["bold", "italic", "strikethrough"],
                        ["link", "img", "quote", "code"],
                        ["unordered-list", "ordered-list"],
                    ]}
                    childProps={{
                        writeButton: {
                            tabIndex: -1,
                        },
                    }}
                    commands={{
                        H1: headerOneCommand,
                        H2: headerTwoCommand,
                        H3: headerThreeCommand,
                        img: imageCommand,
                    }}
                />
            </div>
            {error && (
                <div className="mb-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                >
                    Update
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-50 text-black rounded-lg hover:bg-gray-100 transition-colors duration-300 border-1 border-gray-800"
                    onClick={() => show("read")}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default BlogPostEdit;
