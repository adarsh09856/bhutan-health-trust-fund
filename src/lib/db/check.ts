import dotenv from "dotenv";
import path from "path";

dotenv.config();
try {
  dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });
} catch {}

import { Pool } from "pg";
import bcrypt from "bcryptjs";

async function check() {
  const connectionString =
    process.env.DATABASE_URL || "postgresql://newdb:newdb@127.0.0.1:5432/newdb";

  console.log("-----------------------------------------");
  console.log("Checking PostgreSQL connection to:", connectionString);
  console.log("-----------------------------------------");

  const pool = new Pool({ connectionString, connectionTimeoutMillis: 5000 });

  try {
    const client = await pool.connect();
    console.log("? Successfully connected to PostgreSQL server!");

    const tablesRes = await client.query(
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    );
    console.log("?? Public tables found:", tablesRes.rows.map((r: any) => r.table_name));

    const usersRes = await client.query(SELECT id, email, name, role, password_hash FROM users;);
    console.log(?? Users in database ():);
    for (const u of usersRes.rows) {
      const isMatch = bcrypt.compareSync("Admin@BHTF2026", u.password_hash);
      console.log(  - []  (Password 'Admin@BHTF2026' matches: ));
    }

    client.release();
    await pool.end();
    console.log("-----------------------------------------");
    console.log("?? Database health check passed completely!");
  } catch (err: any) {
    console.error("? Database check failed with error:", err.message);
    if (err.code) console.error("   Error code:", err.code);
    if (err.detail) console.error("   Detail:", err.detail);
    await pool.end();
    process.exit(1);
  }
}

check();
