CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"description" text DEFAULT 'this is a place holder description',
	"created_at" timestamp DEFAULT now()
);
