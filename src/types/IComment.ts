export interface IComment {
    id: number;
    author: string | null;
    author_uid: string;
    body: string;
    created_at: Date | null;
    updated_at: Date | null;
    blog: number;
}
