import { pool } from "./client";

/**
 * Ensures all v2 database tables, columns, indexes and constraints exist.
 * Runs automatically on startup with zero downtime and idempotent DDL.
 */
export async function ensureDatabaseSchema() {
  const client = await pool.connect();
  try {
    // 1. Ensure users table & columns
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'SUPER_ADMIN',
        is_active BOOLEAN NOT NULL DEFAULT true,
        failed_attempts INTEGER NOT NULL DEFAULT 0,
        locked_until TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS failed_attempts INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP;
    `);

    // 2. Ensure user_sessions table (Database-backed session management)
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT NOT NULL UNIQUE,
        ip_address TEXT,
        user_agent TEXT,
        expires_at TIMESTAMP NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
    `);

    // 3. Ensure audit_logs table (Immutable fiduciary ledger)
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        user_email TEXT NOT NULL,
        action TEXT NOT NULL,
        entity TEXT NOT NULL,
        entity_id TEXT,
        details TEXT,
        old_value TEXT,
        new_value TEXT,
        reason TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS old_value TEXT;
      ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS new_value TEXT;
      ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS reason TEXT;
      CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity);
    `);

    // 3b. Ensure financial_settings table (Tier 2 restricted financial & statutory settings)
    await client.query(`
      CREATE TABLE IF NOT EXISTS financial_settings (
        id SERIAL PRIMARY KEY,
        bank_account_bob TEXT NOT NULL DEFAULT '[BANK_ACCOUNT_PLACEHOLDER]',
        swift_code_bob TEXT NOT NULL DEFAULT '[SWIFT_PLACEHOLDER]',
        bank_name TEXT NOT NULL DEFAULT 'Bank of Bhutan Limited',
        account_title TEXT NOT NULL DEFAULT 'Bhutan Health Trust Fund',
        tax_exemption_id TEXT NOT NULL DEFAULT '[TAX_ID_PLACEHOLDER]',
        tax_certificate_valid BOOLEAN NOT NULL DEFAULT false,
        legal_signoff_by TEXT,
        legal_signoff_at TIMESTAMP,
        legal_signoff_notes TEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_by TEXT
      );
    `);

    // Seed default financial_settings row if empty
    const finCheck = await client.query("SELECT COUNT(*) FROM financial_settings");
    if (parseInt(finCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO financial_settings (
          id, bank_account_bob, swift_code_bob, bank_name, account_title, tax_exemption_id, tax_certificate_valid
        ) VALUES (
          1, '[BANK_ACCOUNT_PLACEHOLDER]', '[SWIFT_PLACEHOLDER]', 'Bank of Bhutan Limited', 'Bhutan Health Trust Fund', '[TAX_ID_PLACEHOLDER]', false
        );
      `);
    }

    // 4. Ensure system_events table
    await client.query(`
      CREATE TABLE IF NOT EXISTS system_events (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        message TEXT NOT NULL,
        metadata TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_system_events_created_at ON system_events(created_at DESC);
    `);

    // 5. Ensure procurement_steps table
    await client.query(`
      CREATE TABLE IF NOT EXISTS procurement_steps (
        id SERIAL PRIMARY KEY,
        step_number TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // 6. Ensure existing core content tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'General',
        author TEXT NOT NULL DEFAULT 'BHTF Media',
        is_published BOOLEAN NOT NULL DEFAULT true,
        published_at TIMESTAMP NOT NULL DEFAULT NOW(),
        views_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        year TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'Annual Report',
        file_url TEXT NOT NULL,
        file_size TEXT NOT NULL DEFAULT '2.4 MB',
        description TEXT NOT NULL,
        download_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS policies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        file_url TEXT,
        category TEXT NOT NULL DEFAULT 'Governance',
        effective_date TEXT NOT NULL DEFAULT '2024',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        reference_no TEXT NOT NULL UNIQUE,
        donor_name TEXT NOT NULL,
        donor_email TEXT NOT NULL,
        donor_phone TEXT,
        amount_nu INTEGER NOT NULL,
        currency TEXT NOT NULL DEFAULT 'BTN',
        payment_method TEXT NOT NULL DEFAULT 'MBOB',
        status TEXT NOT NULL DEFAULT 'PENDING',
        message TEXT,
        is_anonymous BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'UNREAD',
        reply_notes TEXT,
        channel TEXT NOT NULL DEFAULT 'WEB',
        logged_by TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        is_active BOOLEAN NOT NULL DEFAULT true,
        subscribed_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        full_description TEXT NOT NULL,
        icon TEXT NOT NULL DEFAULT 'Pill',
        target_dzongkhags TEXT NOT NULL DEFAULT 'All 20 Dzongkhags',
        beneficiaries_reached TEXT NOT NULL DEFAULT '780,000+ citizens',
        status TEXT NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS trustees (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        organization TEXT NOT NULL,
        badge TEXT NOT NULL DEFAULT 'Trustee',
        bio TEXT NOT NULL,
        photo_url TEXT NOT NULL,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'General',
        order_index INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS impact_metrics (
        id SERIAL PRIMARY KEY,
        metric_key TEXT NOT NULL UNIQUE,
        label TEXT NOT NULL,
        numeric_value NUMERIC NOT NULL,
        prefix TEXT,
        suffix TEXT,
        description TEXT NOT NULL,
        order_index INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS milestones (
        id SERIAL PRIMARY KEY,
        year TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        setting_key TEXT NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        description TEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Seed default procurement steps if empty
    const procCheck = await client.query("SELECT COUNT(*) FROM procurement_steps");
    if (parseInt(procCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO procurement_steps (step_number, title, description, order_index, is_active)
        VALUES 
          ('01', 'National Demand Forecasting', 'Ministry of Health quantifies national requirement based on real-time BHU consumption data.', 1, true),
          ('02', 'International Competitive Bidding', 'Open tenders conducted adhering to strict WHO prequalification and DRA Bhutan standards.', 2, true),
          ('03', 'Quality Batch Testing', 'Every medicine and vaccine batch undergoes rigorous laboratory assay testing upon port arrival.', 3, true),
          ('04', 'Last-Mile Distribution', 'Direct delivery to Central Medical Stores and distribution across all 20 Dzongkhags.', 4, true);
      `);
    }
  } catch (err: any) {
    console.error("[PostgreSQL ensureDatabaseSchema Error]:", err?.message || err);
  } finally {
    client.release();
  }
}
