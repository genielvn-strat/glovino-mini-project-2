import { updateComment } from "@/actions/commentAction";
import { IComment } from "@/types/IComment";
import { Dispatch, useState } from "react";

interface CommentEditProps {
    comment: IComment;
    show: Dispatch<React.SetStateAction<string>>;
    slug: string;
}

const CommentEdit: React.FC<CommentEditProps> = ({ comment, show, slug }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const response = await updateComment(formData, comment.id, slug);

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
        <form className="flex mt-2 flex-col gap-2" onSubmit={handleSubmit}>
            <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                defaultValue={comment.body}
                name="body"
            ></textarea>
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

export default CommentEdit;
