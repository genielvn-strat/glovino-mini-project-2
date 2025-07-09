"use client";

import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";

interface AddCommentProps {
    slug: string;
}

const AddComment: React.FC<AddCommentProps> = ({ slug }) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    return (
        <div
            className="p-4 rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setShowForm(true)}
        >
            {showForm ? (
                <AddCommentForm key="form" show={setShowForm} slug={slug} />
            ) : (
                <div className="text-xl cursor-pointer select-none">
                    <i className="bi bi-plus-circle-fill" />
                    <span className="ml-2">Add a comment...</span>
                </div>
            )}
        </div>
    );
};

export default AddComment;
