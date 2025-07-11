"use client";

import React, { useState } from "react";
import AddBlogPostForm from "./AddBlogPostForm";
import { Session } from "next-auth";

interface AddBlogPostProps {
    session: Session | null;
}

const AddBlogPost: React.FC<AddBlogPostProps> = ({ session }) => {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <div className="p-4 m-4 rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
            {!session?.user ? (
                <div className="text-xl cursor-pointer select-none" >
                    <i className="bi bi-person-circle" />
                    <span className="ml-2">Sign in to get started!</span>
                </div>
            ) : showForm ? (
                <AddBlogPostForm key="form" show={setShowForm} />
            ) : (
                <div
                    className="text-xl cursor-pointer select-none"
                    onClick={() => setShowForm(true)}
                >
                    <i className="bi bi-plus-circle-fill" />
                    <span className="ml-2">Add a blog post...</span>
                </div>
            )}
        </div>
    );
};

export default AddBlogPost;
