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
        gateway_transaction_id TEXT,
        gateway_session_id TEXT,
        gateway_status TEXT,
        payment_metadata TEXT,
        completed_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      ALTER TABLE donations ADD COLUMN IF NOT EXISTS gateway_transaction_id TEXT;
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS gateway_session_id TEXT;
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS gateway_status TEXT;
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_metadata TEXT;
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;

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

      CREATE TABLE IF NOT EXISTS media_gallery (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'Field Operations',
        image_url TEXT NOT NULL,
        caption TEXT,
        dzongkhag TEXT NOT NULL DEFAULT 'All 20 Dzongkhags',
        order_index INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS media_videos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'Documentary',
        video_url TEXT NOT NULL,
        duration TEXT NOT NULL DEFAULT '05:00',
        thumbnail_url TEXT,
        description TEXT,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS procurement_tenders (
        id SERIAL PRIMARY KEY,
        tender_no TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'Essential Drugs',
        status TEXT NOT NULL DEFAULT 'OPEN',
        closing_date TIMESTAMP NOT NULL,
        document_url TEXT NOT NULL,
        document_size TEXT NOT NULL DEFAULT '1.8 MB',
        download_count INTEGER NOT NULL DEFAULT 0,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS payment_gateways (
        gateway_key TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        is_enabled BOOLEAN NOT NULL DEFAULT false,
        is_live_mode BOOLEAN NOT NULL DEFAULT false,
        key_id TEXT,
        key_secret TEXT,
        webhook_secret TEXT,
        merchant_id TEXT,
        terminal_id TEXT,
        gateway_url TEXT,
        currency TEXT NOT NULL DEFAULT 'BTN',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_by TEXT
      );

      INSERT INTO payment_gateways (gateway_key, name, is_enabled, is_live_mode, key_id, key_secret, merchant_id, terminal_id, gateway_url, currency)
      VALUES
        ('RMA_BFS', 'RMA Payment Gateway / Bhutan Financial Switch', true, false, NULL, 'BHTF_BFS_SECRET_TEST_KEY', 'BHTF_RMA_MERCHANT', 'BHTF_TERM_01', 'https://bfstest.rma.org.bt/bfsgateway', 'BTN'),
        ('RAZORPAY', 'Razorpay Regional & International Gateway', false, false, 'rzp_test_placeholder', 'SAMPLE_SECRET_PLACEHOLDER', NULL, NULL, NULL, 'BTN')
      ON CONFLICT (gateway_key) DO NOTHING;
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

    // Seed default media gallery if empty
    const galCheck = await client.query("SELECT COUNT(*) FROM media_gallery");
    if (parseInt(galCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO media_gallery (title, category, image_url, caption, dzongkhag, order_index, is_published)
        VALUES
          ('Cold-Chain Porterage to Lunana Basic Health Unit', 'Highlands Outreach', '/src/assets/news-community.jpg', 'Health workers carrying solar-powered vaccine carrier boxes across 4,500m Himalayan passes to ensure zero children miss immunizations.', 'Gasa', 1, true),
          ('Nationwide Influenza Vaccine Arrival at Paro International', 'Cold Chain', '/src/assets/news-vaccine.jpg', 'Over 200,000 doses of quadrivalent seasonal influenza vaccines arriving under strict digital temperature logging.', 'Paro', 2, true),
          ('Outreach Clinic Primary Care in Trashigang', 'Clinics', '/src/assets/news-report.jpg', 'Primary health technicians administering life-saving essential medicines to elderly villagers at an outreach clinic.', 'Trashigang', 3, true);
      `);
    }

    // Seed default media videos if empty
    const vidCheck = await client.query("SELECT COUNT(*) FROM media_videos");
    if (parseInt(vidCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO media_videos (title, category, video_url, duration, thumbnail_url, description, order_index, is_published)
        VALUES
          ('25 Years of Free Healthcare: The Royal Sovereign Mandate', 'Documentary', 'https://www.youtube.com/@bhtf_bhutan', '14:20', '/src/assets/news-report.jpg', 'Comprehensive retrospective on the visionary founding of BHTF in 1998 by His Majesty the Fourth Druk Gyalpo.', 1, true),
          ('Behind the Cold Chain: Delivering Vaccines to Laya & Lunana', 'Field Report', 'https://www.youtube.com/@bhtf_bhutan', '08:15', '/src/assets/news-vaccine.jpg', 'Follow Bhutanese frontline healthcare workers traversing snowbound glacial passes to protect remote mountain communities.', 2, true);
      `);
    }

    // Seed default procurement tenders if empty
    const tendCheck = await client.query("SELECT COUNT(*) FROM procurement_tenders");
    if (parseInt(tendCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO procurement_tenders (tender_no, title, category, status, closing_date, document_url, document_size, description)
        VALUES
          ('BHTF/TEND-2025/001', 'Supply of 124 National Essential Drugs List (NEDL) Commodities for Fiscal Year 2025-2026', 'Essential Drugs', 'OPEN', '2026-11-30 17:00:00', '/documents/sample-report.pdf', '2.4 MB', 'International competitive bidding for GMP-certified manufacturers supplying antibiotics, cardiovascular, and maternal health commodities.'),
          ('BHTF/TEND-2025/002', 'Procurement of WHO-Prequalified Pentavalent and Measles-Rubella Vaccines', 'Vaccines', 'EVALUATING', '2026-10-15 17:00:00', '/documents/sample-report.pdf', '3.1 MB', 'Annual sovereign procurement of routine childhood immunization antigens with cold-chain transit temperature validation.');
      `);
    }

    // Ensure all critical site settings are populated across all 6 categories
    await client.query(`
      INSERT INTO site_settings (setting_key, setting_value, category, description)
      VALUES
        ('site_title', 'Bhutan Health Trust Fund | འབྲུག་གི་གསོ་བའི་བཅོལ་དངུལ།', 'general', 'Official institutional website title in English and Dzongkha'),
        ('site_tagline', 'Universal Primary Healthcare in Perpetuity for All Citizens of Bhutan', 'general', 'Institutional motto and sovereign health mandate tagline'),
        ('founding_year', '1998', 'general', 'Royal Charter establishment year by His Majesty the Fourth Druk Gyalpo'),
        ('emergency_hotline', '112', 'general', 'National emergency health helpline number'),
        ('emergency_hotline_label', 'Toll-Free, 24/7 Nationwide Emergency Medical Helpline', 'general', 'Helpline availability and service coverage text'),
        ('announcement_banner_enabled', 'true', 'announcement', 'Toggle site-wide emergency/statutory announcement broadcast'),
        ('announcement_banner', 'Universal Primary Health Coverage Guaranteed: 100% of Essential Drugs & Vaccines Ring-Fenced in Perpetuity.', 'announcement', 'Top site-wide announcement broadcast text'),
        ('announcement_badge', 'SOVEREIGN HEALTH MANDATE', 'announcement', 'Uppercase label badge accompanying the announcement ribbon'),
        ('announcement_link', '/our-work', 'announcement', 'Destination URL when visitors click the announcement ribbon'),
        ('secretariat_phone', '+975 2 [PHONE_PLACEHOLDER]', 'contact', 'Secretariat official telephone contact'),
        ('secretariat_email', 'info@bhtf.bt', 'contact', 'Secretariat primary contact email'),
        ('secretariat_address', 'Kawajangsa, Thimphu, Kingdom of Bhutan', 'contact', 'Secretariat physical headquarters address in Thimphu'),
        ('office_hours', 'Monday – Friday: 9:00 AM – 5:00 PM (BST)', 'contact', 'Public working hours for administrative visits and ombudsman queries'),
        ('ombudsman_email', 'grievance@bhtf.bt', 'contact', 'Official public grievance and ombudsman contact desk'),
        ('matching_enabled', 'true', 'fiduciary', 'Enable sovereign 1:1 government matching grant display'),
        ('matching_ratio', '1:1 Sovereign Multiplier', 'fiduciary', 'Sovereign government matching multiplier on qualified donations'),
        ('capital_endowment_target_nu', 'Nu. 5.0 Billion', 'fiduciary', 'Statutory target endowment corpus for perpetual health security'),
        ('current_endowment_corpus_nu', 'Nu. 4.2 Billion', 'fiduciary', 'Current audited capital endowment corpus managed under Royal Charter'),
        ('annual_disbursement_nu', 'Nu. 180 Million', 'fiduciary', 'Annual fund disbursement for essential medicines and vaccines'),
        ('mission_statement', 'To secure sustainable financial resources in perpetuity to guarantee uninterrupted supply of essential drugs and vaccines for all Bhutanese citizens.', 'pillars', 'Official statutory mission statement'),
        ('vision_statement', 'A resilient, self-reliant, and healthy Bhutan where no citizen is deprived of basic primary healthcare due to financial constraints.', 'pillars', 'Official statutory vision statement'),
        ('pillar_1_title', '100% Essential Medicines', 'pillars', 'Pillar 1: Financing all 124+ life-saving primary medicines'),
        ('pillar_2_title', 'Universal Immunization', 'pillars', 'Pillar 2: Guaranteeing 11 national routine childhood and seasonal antigens'),
        ('pillar_3_title', 'Cold-Chain Integrity', 'pillars', 'Pillar 3: Highland porterage and temperature-controlled air logistics'),
        ('pillar_4_title', 'Sovereign Self-Reliance', 'pillars', 'Pillar 4: Perpetual endowment buffer insulating national health security'),
        ('social_facebook', 'https://facebook.com/bhtf.bhutan', 'social', 'Official Facebook page URL'),
        ('social_twitter', 'https://twitter.com/bhtf_bhutan', 'social', 'Official X / Twitter account URL'),
        ('social_youtube', 'https://youtube.com/@bhtf_bhutan', 'social', 'Official YouTube documentary and briefing channel'),
        ('social_linkedin', 'https://linkedin.com/company/bhutan-health-trust-fund', 'social', 'Official LinkedIn institutional presence')
      ON CONFLICT (setting_key) DO UPDATE SET 
        category = EXCLUDED.category,
        description = EXCLUDED.description;
    `);

    // 8. Auto-cleanse legacy mock/test records from active database tables
    await client.query(`
      DELETE FROM donations 
      WHERE donor_email LIKE '%example.com' 
         OR donor_email LIKE '%sample.com%' 
         OR reference_no LIKE 'BHTF-DON-2025-%';

      DELETE FROM inquiries 
      WHERE email LIKE '%example.com' 
         OR email LIKE '%sample.com%' 
         OR name IN ('Sonam Tobgay', 'Kinley Pem', 'Dr. Karma Yonten');

      DELETE FROM subscribers 
      WHERE email LIKE '%example.com' 
         OR email IN ('dorji.t@gov.bt', 'pema.w@health.gov.bt', 'karma.z@who.int', 'tshering.d@unicef.org', 'dechen.c@moh.gov.bt');

      DELETE FROM media_videos 
      WHERE video_url LIKE '%dQw4w9WgXcQ%';
    `);
  } catch (err: any) {
    console.error("[PostgreSQL ensureDatabaseSchema Error]:", err?.message || err);
  } finally {
    client.release();
  }
}
