import { DB } from "@/types/database";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export const db = new Kysely<DB>({
  // PostgresDialect requires the Cursor dependency
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL!,
    }),
  }),
});
