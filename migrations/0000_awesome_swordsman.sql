CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"slug" varchar NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar(50) DEFAULT 'Guest',
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"blog" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_blogs_id_fk" FOREIGN KEY ("blog") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;