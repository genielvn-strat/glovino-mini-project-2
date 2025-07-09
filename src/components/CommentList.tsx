import { IComment } from "@/types/IComment";
import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

interface CommentListProps {
    comments: IComment[];
    slug: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, slug }) => {
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Comments</h2>
            <AddComment slug={slug} />

            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
            ) : (
                <ul className="">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            slug={slug}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentList;
