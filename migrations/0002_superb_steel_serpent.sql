ALTER TABLE "comments" ALTER COLUMN "author" SET DEFAULT 'Anonymous';--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "author" varchar(50) DEFAULT 'Anonymous';