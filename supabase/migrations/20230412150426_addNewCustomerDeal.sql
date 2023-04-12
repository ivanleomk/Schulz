alter table "public"."customer_deal" drop constraint "customer_deal_customer_id_fkey";

alter table "public"."customer_deal" drop constraint "customer_deal_pkey";

drop index if exists "public"."customer_deal_pkey";

drop table "public"."customer_deal";


