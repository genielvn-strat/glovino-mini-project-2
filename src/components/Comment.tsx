"use client";

import { useState } from "react";
import { IComment } from "@/types/IComment";
import React from "react";
import CommentEdit from "./CommentEdit";
import Window from "./Window";
import { deleteComment } from "@/actions/commentAction";

interface CommentProps {
    comment: IComment;
    slug: string;
}

const Comment: React.FC<CommentProps> = ({ comment, slug }) => {
    const [mode, setMode] = useState<string>("read"); // read, edit, delete

    return (
        <li key={comment.id} className="py-4 border-b-2 border-gray-200">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {comment.author || "Anonymous"} -{" "}
                    {comment.created_at?.toLocaleDateString()}
                </p>
                {mode === "read" && (
                    <div className="flex gap-2">
                        <i
                            className="bi bi-pencil text-gray-500 hover:text-gray-900 transition-colors duration-300"
                            onClick={() => setMode("edit")}
                        />
                        <i
                            className="bi bi-trash text-gray-500 hover:text-red-600 transition-colors duration-300"
                            onClick={() => setMode("delete")}
                        />
                    </div>
                )}
            </div>
            {mode === "edit" ? (
                <CommentEdit comment={comment} show={setMode} slug={slug} />
            ) : (
                <p className="text-gray-700">{comment.body}</p>
            )}
            {mode === "delete" && (
                <Window
                    confirm={async () => {
                        await deleteComment(comment.id, slug);
                        setMode("read");
                    }}
                    cancel={() => setMode("read")}
                    message="Are you sure you want to delete this comment?"
                    title="Delete Comment"
                    mode={setMode}
                    danger
                />
            )}
        </li>
    );
};

export default Comment;
