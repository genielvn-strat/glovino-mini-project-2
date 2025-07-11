ALTER TABLE "blogs" ADD COLUMN "author_uid" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "author_uid" numeric NOT NULL;