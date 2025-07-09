ALTER TABLE "blogs" ADD COLUMN "summary" varchar(500);
UPDATE "blogs" SET "summary" = 'Placeholder summary' WHERE "summary" IS NULL;
ALTER TABLE "blogs" ALTER COLUMN "summary" SET NOT NULL;