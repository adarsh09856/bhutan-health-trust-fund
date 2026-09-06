import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/bhtf_production";

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 8000,
});

pool.on("error", (err) => {
  console.error("[PostgreSQL Pool Error]:", err.message);
});

export const drizzleDb = drizzle(pool, { schema });

