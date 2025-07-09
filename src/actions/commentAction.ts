"use server";

import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { blogs, comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getComments = async (slug: string) => {
    const blog = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);

    if (!blog[0]) return [];

    const data = await db
        .select()
        .from(comments)
        .where(eq(comments.blog, blog[0].id));
    return data;
};

export const createComment = async (formData: FormData, slug: string) => {
    const blog = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);

    if (!blog[0]) return { error: "Blog not found" };
    let author = formData.get("author") as string;
    const body = formData.get("body") as string;

    if (!body) {
        return { error: "Your comment is required." };
    }

    if (!author || author.trim() === "") {
        author = "Anonymous";
    }

    await db.insert(comments).values({
        body: body,
        author: author || "Guest",
        blog: blog[0].id,
    });

    revalidatePath(`/${slug}`);
};

export const updateComment = async (
    formData: FormData,
    id: number,
    slug: string
) => {
    const body = formData.get("body") as string;

    if (!body) {
        return { error: "Your comment is required." };
    }

    await db
        .update(comments)
        .set({
            body: body,
            updated_at: new Date(),
        })
        .where(eq(comments.id, id));
    revalidatePath(`/${slug}`);
};

export const deleteComment = async (id: number, slug: string) => {
    await db.delete(comments).where(eq(comments.id, id));
    revalidatePath(`/blogs/${slug}`);
};
