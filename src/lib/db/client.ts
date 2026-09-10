import dotenv from "dotenv";
import path from "path";

dotenv.config();
try {
  dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });
} catch {}

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL || "postgresql://newdb:newdb@127.0.0.1:5432/newdb";

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 8000,
});

pool.on("error", (err) => {
  console.error("[PostgreSQL Pool Error]:", err.message);
});

export const drizzleDb = drizzle(pool, { schema });
