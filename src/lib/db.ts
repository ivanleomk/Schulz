import { Pool } from "pg";

import { Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";

export const db = new Kysely<DB>({
  // PostgresDialect requires the Cursor dependency
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL!,
    }),
  }),
  // MysqlDialect doesn't require any special configuration
});
