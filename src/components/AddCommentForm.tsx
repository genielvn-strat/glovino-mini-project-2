import { createComment } from "@/actions/commentAction";
import React, { Dispatch, useState } from "react";

interface AddCommentFormProps {
    show: Dispatch<React.SetStateAction<boolean>>;
    slug: string;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ show, slug }) => {
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const response = await createComment(formData, slug);

            if (response?.error) {
                setError(response.error);
                return;
            }
            show(false);
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
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Author</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="(optional)"
                    name="author"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Comment</label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="Write your comment here."
                    name="body"
                ></textarea>
            </div>
            {error && (
                <div className="mb-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}
            <div className="flex mb-4 gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        console.log("Cancel clicked");
                        show(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddCommentForm;
