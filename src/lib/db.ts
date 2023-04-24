import { DB } from "@/types/database";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

console.log(process.env.DATABASE_URL);

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  }),
});
