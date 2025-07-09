"use client";

import React, { useState } from "react";
import AddBlogPostForm from "./AddBlogPostForm";

const AddBlogPost: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    return (
        <div
            className="p-4 m-4 rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setShowForm(true)}
        >
            {showForm ? (
                <AddBlogPostForm key="form" show={setShowForm} />
            ) : (
                <div className="text-xl cursor-pointer select-none">
                    <i className="bi bi-plus-circle-fill" />
                    <span className="ml-2">Add a blog post...</span>
                </div>
            )}
        </div>
    );
};

export default AddBlogPost;
