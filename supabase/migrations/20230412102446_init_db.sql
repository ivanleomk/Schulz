CREATE TYPE "customer_type" AS ENUM (
  'customer',
  'prospect'
);

CREATE TYPE "prospect_status" AS ENUM (
  'Awareness',
  'Consideration',
  'Preference',
  'Purchase',
  'Loyalty'
);

CREATE TABLE "customer_permission" (
  "user_id" uuid NOT NULL,
  "customer_id" uuid NOT NULL,
  "company_id" uuid NOT NULL,
  PRIMARY KEY ("user_id", "customer_id", "company_id")
);

CREATE TABLE "company_note" (
  "note_id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "note_title" text NOT NULL DEFAULT '',
  "note_content" text NOT NULL DEFAULT '',
  "company_id" uuid NOT NULL,
  "customer_id" uuid DEFAULT null
);

CREATE TABLE "user_note" (
  "note_id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "note_title" text NOT NULL DEFAULT '',
  "note_content" text NOT NULL DEFAULT '',
  "user_id" uuid NOT NULL
);

CREATE TABLE "user" (
  "user_id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "username" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "is_system_admin" bool NOT NULL DEFAULT false,
  "is_company_admin" bool NOT NULL DEFAULT false,
  "company_id" uuid DEFAULT null
);



CREATE TABLE "company" (
  "company_id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "company_name" text DEFAULT null
);

CREATE TABLE "customer_interaction" (
  "meeting_id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "customer_id" uuid NOT NULL,
  "meeting_notes" text DEFAULT null,
  "date" timestamp NOT NULL DEFAULT (now()),
  "transcript" text
);

CREATE TABLE "customer_email" (
  "email_id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "customer_id" uuid NOT NULL,
  "email_text" text NOT NULL DEFAULT '',
  "email_header" text NOT NULL DEFAULT '',
  "date" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "customer" (
  "company_id" uuid NOT NULL,
  "customer_id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "status" prospect_status NOT NULL DEFAULT 'Awareness',
  "type" customer_type NOT NULL DEFAULT 'prospect',
  "phone_number" integer,
  "customer_email" text
);



COMMENT ON TABLE "customer_permission" IS 'This is used to keep track of which customers an employee can see';

COMMENT ON TABLE "company_note" IS 'We segregate company notes from personal notes because company notes might have sensitive information. As a result, it"s best to segregate the data entirely.';

COMMENT ON COLUMN "user"."email" IS 'Users - company mapping should be 1-1. If they"re also looking at adding a second company then just create a new account';

COMMENT ON COLUMN "user"."company_id" IS 'Users can have an optional company attached to them ( if they are admin, they will have no company anyway)';

ALTER TABLE "customer_interaction" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");

ALTER TABLE "customer" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");

ALTER TABLE "user" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");



ALTER TABLE "customer_email" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");

ALTER TABLE "customer_permission" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");

ALTER TABLE "customer_permission" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");

ALTER TABLE "customer_permission" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_note" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "company_note" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");
