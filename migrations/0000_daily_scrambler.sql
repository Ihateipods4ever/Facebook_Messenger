CREATE TABLE "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"message" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
