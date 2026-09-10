/**
 * BHTF Institutional & Statutory Configuration
 *
 * HARD CONSTRAINT (Section 0):
 * Do NOT invent, copy, or regenerate any real-looking financial or institutional
 * identifiers (bank accounts, SWIFT/IBAN, tax IDs, seals, certificate numbers).
 *
 * All such values must be pulled from environment variables, defaulting to obvious
 * placeholders. Every usage site must contain a // TODO-VERIFY comment.
 */

export interface InstitutionalConfig {
  siteName: string;
  legalEntityName: string;
  royalMandateDecree: string;
  emergencyHelpline: string;
  emergencyHelplineLabel: string;
  secretariatPhone: string;
  secretariatEmail: string;
  secretariatAddress: string;
  bankAccountBOB: string;
  bankAccountBNB: string;
  swiftCodeBOB: string;
  swiftCodeBNB: string;
  taxExemptionId: string;
  sovereignMatchRatio: string;
  isTaxCertificateValid: boolean;
  sampleWatermarkText: string;
}

export const institutionalConfig: InstitutionalConfig = {
  siteName: "Bhutan Health Trust Fund",
  legalEntityName: "Bhutan Health Trust Fund Secretariat",
  royalMandateDecree: "Royal Charter Autonomous Statutory Entity",

  // Official Emergency Helpline // TODO-VERIFY
  emergencyHelpline: process.env.BHTF_EMERGENCY_HELPLINE || "112",
  emergencyHelplineLabel: "Toll-Free 24/7 Nationwide Emergency Medical Logistics",

  // Secretariat Communication Details // TODO-VERIFY
  secretariatPhone: process.env.BHTF_SECRETARIAT_PHONE || "+975 2 [PHONE_PLACEHOLDER]", // TODO-VERIFY
  secretariatEmail: process.env.BHTF_SECRETARIAT_EMAIL || "info@bhtf.bt", // TODO-VERIFY
  secretariatAddress:
    process.env.BHTF_SECRETARIAT_ADDRESS || "Kawajangsa, Thimphu, Kingdom of Bhutan", // TODO-VERIFY

  // Official Treasury Bank Accounts (Bank of Bhutan & Bhutan National Bank) // TODO-VERIFY
  bankAccountBOB: process.env.BHTF_BANK_ACCOUNT_BOB || "[BANK_ACCOUNT_PLACEHOLDER]", // TODO-VERIFY
  bankAccountBNB: process.env.BHTF_BANK_ACCOUNT_BNB || "[BANK_ACCOUNT_PLACEHOLDER]", // TODO-VERIFY
  swiftCodeBOB: process.env.BHTF_SWIFT_BOB || "[SWIFT_PLACEHOLDER]", // TODO-VERIFY
  swiftCodeBNB: process.env.BHTF_SWIFT_BNB || "[SWIFT_PLACEHOLDER]", // TODO-VERIFY

  // Department of Revenue & Customs Tax Exemption ID // TODO-VERIFY
  taxExemptionId: process.env.BHTF_TAX_EXEMPTION_ID || "[TAX_ID_PLACEHOLDER]", // TODO-VERIFY

  // Sovereign Matching Ratio
  sovereignMatchRatio: "1:1",

  // Tax Certificate Validity Flag (Must remain false until official institutional sign-off) // TODO-VERIFY
  isTaxCertificateValid: process.env.BHTF_TAX_CERTIFICATE_VALID === "true", // TODO-VERIFY
  sampleWatermarkText: "SAMPLE — NOT VALID FOR OFFICIAL USE", // TODO-VERIFY
};
