import "dotenv/config";
import { drizzleDb, pool } from "./client";
import * as schema from "./schema";
import {
  initialAdminUsers,
  initialNewsArticles,
  initialReports,
  initialPolicies,
  initialPrograms,
  initialDonations,
  initialInquiries,
  initialSubscribers,
} from "./seed-data";

export async function seedDatabase() {
  console.log("Starting database seeding check...");

  try {
    const existingUsers = await drizzleDb.select().from(schema.users);
    if (existingUsers.length > 0) {
      console.log("Database already contains records. Skipping seed to protect production data.");
      return;
    }

    console.log("Empty database detected. Seeding foundational BHTF records...");

    // Seed Users
    if (initialAdminUsers.length > 0) {
      await drizzleDb.insert(schema.users).values(initialAdminUsers);
      console.log(`Seeded ${initialAdminUsers.length} admin users.`);
    }

    // Seed Programs
    if (initialPrograms.length > 0) {
      await drizzleDb.insert(schema.programs).values(initialPrograms);
      console.log(`Seeded ${initialPrograms.length} commodity programs.`);
    }

    // Seed News
    if (initialNewsArticles.length > 0) {
      await drizzleDb.insert(schema.newsArticles).values(initialNewsArticles);
      console.log(`Seeded ${initialNewsArticles.length} news articles.`);
    }

    // Seed Reports
    if (initialReports.length > 0) {
      await drizzleDb.insert(schema.reports).values(initialReports);
      console.log(`Seeded ${initialReports.length} statutory reports.`);
    }

    // Seed Policies
    if (initialPolicies.length > 0) {
      await drizzleDb.insert(schema.policies).values(initialPolicies);
      console.log(`Seeded ${initialPolicies.length} governance policies.`);
    }

    // Seed Donations
    if (initialDonations.length > 0) {
      await drizzleDb.insert(schema.donations).values(initialDonations);
      console.log(`Seeded ${initialDonations.length} initial donations.`);
    }

    // Seed Inquiries
    if (initialInquiries.length > 0) {
      await drizzleDb.insert(schema.inquiries).values(
        initialInquiries.map((iq) => ({
          ...iq,
          channel: iq.channel || "WEB",
          loggedBy: iq.loggedBy || null,
        }))
      );
      console.log(`Seeded ${initialInquiries.length} initial inquiries.`);
    }

    // Seed Subscribers
    if (initialSubscribers.length > 0) {
      await drizzleDb.insert(schema.subscribers).values(initialSubscribers);
      console.log(`Seeded ${initialSubscribers.length} subscribers.`);
    }

    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error during database seeding:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Allow direct execution
if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
