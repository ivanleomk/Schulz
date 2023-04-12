create table "public"."customer_deal" (
    "deal_id" uuid not null default uuid_generate_v4(),
    "customer_id" uuid,
    "deal_value" text
);


CREATE UNIQUE INDEX customer_deal_pkey ON public.customer_deal USING btree (deal_id);

alter table "public"."customer_deal" add constraint "customer_deal_pkey" PRIMARY KEY using index "customer_deal_pkey";

alter table "public"."customer_deal" add constraint "customer_deal_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customer(customer_id) not valid;

alter table "public"."customer_deal" validate constraint "customer_deal_customer_id_fkey";


