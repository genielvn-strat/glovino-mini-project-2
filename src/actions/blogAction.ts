"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getBlogs = async () => {
    const data = await db.select().from(blogs);
    return data;
};

export const getBlogPost = async (slug: string) => {
    const data = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);
    return data[0] ?? null;
};

export const createBlogPost = async (formData: FormData) => {
    let author = formData.get("author") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const summary = formData.get("summary") as string;
    const slug =
        title.toLowerCase().replace(/\s+/g, "-").substring(0, 30) +
        "-" +
        Date.now();

    if (!title || !body) {
        return { error: "Title and body are required." };
    }

    if (!summary) {
        return { error: "Your blog summary is very important!" };
    }

    if (title.length > 100) {
        return { error: "Title must be less than 100 characters." };
    }

    if (!author || author.trim() === "") {
        author = "Anonymous";
    }

    await db.insert(blogs).values({
        title: title,
        body: body,
        author: author,
        summary: summary,
        slug: slug,
    });
    redirect(`/${slug}`);
};

export const updateBlogPost = async (
    id: number,
    title: string,
    body: string,
    slug: string
) => {
    await db
        .update(blogs)
        .set({
            title: title,
            body: body,
            slug: slug,
            updated_at: new Date(),
        })
        .where(eq(blogs.id, id));
    revalidatePath(`/${slug}`);
};

export const deleteBlogPost = async (id: number) => {
    await db.delete(blogs).where(eq(blogs.id, id));
    revalidatePath("/");
};
