"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

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
    const session = await auth();
    if (!session?.user) {
        return { error: "You are not logged in!" };
    }

    const author_uid = session?.user.uid;
    let author = formData.get("author") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const summary = formData.get("summary") as string;
    const slug =
        title
            .toLowerCase()
            .replace(/[^a-z0-9\-]+/g, "-") // replace all non-alphanumeric-symbols with hyphen
            .replace(/-+/g, "-") // collapse multiple hyphens
            .replace(/^-|-$/g, "") // trim leading/trailing hyphens
            .substring(0, 30) +
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
        author_uid: author_uid,
        summary: summary,
        slug: slug,
    });
    redirect(`/${slug}`);
};

export const updateBlogPost = async (
    formData: FormData,
    id: number,
    slug: string
) => {
    const session = await auth();
    if (!session?.user) {
        return { error: "You are not logged in!" };
    }

    const blog = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);
    if (!blog) {
        return { error: "Blog is not found!" };
    }
    if (blog[0].author_uid !== session.user.uid) {
        return { error: "Forbidden: You are not the owner of this post." };
    }
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const summary = formData.get("summary") as string;

    if (!title || !body) {
        return { error: "Title and body are required." };
    }

    if (!summary) {
        return { error: "Your blog summary is very important!" };
    }

    if (title.length > 100) {
        return { error: "Title must be less than 100 characters." };
    }

    await db
        .update(blogs)
        .set({
            title: title,
            body: body,
            updated_at: new Date(),
        })
        .where(eq(blogs.id, id));
    revalidatePath(`/${slug}`);
};

export const deleteBlogPost = async (id: number) => {
    const session = await auth();
    if (!session?.user) {
        return { error: "You are not logged in!" };
    }

    const blog = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
    if (!blog) {
        return { error: "Blog is not found!" };
    }
    if (blog[0].author_uid !== session.user.uid) {
        return { error: "Forbidden: You are not the owner of this post." };
    }
    await db.delete(blogs).where(eq(blogs.id, id));
    redirect("/");
};
