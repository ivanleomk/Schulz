CREATE TABLE "customer_deal" (
  "deal_id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "customer_id" uuid,
  "deal_value" text
);

ALTER TABLE "customer_deal" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");