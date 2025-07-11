export interface IBlogPost {
    id: number;
    author: string | null;
    author_uid: string;
    title: string;
    summary: string;
    body: string;
    created_at: Date | null;
    updated_at: Date | null;
    slug: string;
}
