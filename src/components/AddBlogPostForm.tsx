"use client";

import { createBlogPost } from "@/actions/blogAction";
import React, { Dispatch, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {
    headerOneCommand,
    headerThreeCommand,
    headerTwoCommand,
    imageCommand,
} from "@/lib/reactmde";

interface AddBlogPostFormProps {
    show: Dispatch<React.SetStateAction<boolean>>;
}

const AddBlogPostForm: React.FC<AddBlogPostFormProps> = ({ show }) => {
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [preview, setPreview] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const response = await createBlogPost(formData);
            if (response.error) {
                setError(response.error);
                return;
            }
        } catch (err) {
            console.error("Error submitting blog post:", err);
            setError(
                "An error occurred while submitting your blog post. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!preview ? (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Title
                        </label>
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
                        <label className="block text-gray-700 mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="(optional)"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Summary
                        </label>
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
                        <label className="block text-gray-700 mb-2">
                            Content
                        </label>
                        <input type="hidden" name="body" value={content} />
                        <ReactMde
                            value={content}
                            onChange={setContent}
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
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-2 py-1">
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <p className="text-gray-600 text-2xl">{summary}</p>
                        <p className="text-gray-600 italic">
                            Written by {author || "Anonymous"} \\{" "}
                            {new Date().toLocaleDateString()}
                        </p>
                        <div className="py-2 border-2 border-gray-300 border-x-0 text-sm text-gray-800">
                            0 comments
                        </div>
                        <div className="blog-markdown py-3">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </>
            )}

            <div className="flex mb-4 justify-between items-center">
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submitting}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-50 text-black rounded-lg hover:bg-gray-100 transition-colors duration-300 border-1 border-gray-800"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            show(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
                <div
                    onClick={() => {
                        setPreview(!preview);
                    }}
                    className="cursor-pointer"
                >
                    {!preview ? (
                        <i className="bi bi-eye-fill text-3xl" />
                    ) : (
                        <i className="bi bi-eye-slash-fill text-3xl" />
                    )}
                </div>
            </div>
        </form>
    );
};

export default AddBlogPostForm;
