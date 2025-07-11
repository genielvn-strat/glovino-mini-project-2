"use client";
import { IComment } from "@/types/IComment";
import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

interface CommentListProps {
    comments: IComment[];
    slug: string;
    session: Session | null;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    slug,
    session,
}) => {
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Comments</h2>
            {session?.user ? (
                <AddComment slug={slug} />
            ) : (
                <div
                    className="p-4 rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={() => {
                        redirect("/account");
                    }}
                >
                    <div className="text-xl cursor-pointer select-none">
                        <i className="bi bi-person-circle" />
                        <span className="ml-2">Sign in to comment!</span>
                    </div>
                </div>
            )}

            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
            ) : (
                <ul className="">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            slug={slug}
                            session={session}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentList;
