export interface IComment {
    id: number;
    author: string | null;
    body: string;
    created_at: Date | null;
    updated_at: Date | null;
    blog: number;
}
