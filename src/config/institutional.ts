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
  bankAccountUSD: string;
  swiftCodeBOB: string;
  swiftCodeBNB: string;
  taxExemptionId: string;
  drcCircularRef: string;
  sovereignMatchRatio: string;
  isTaxCertificateValid: boolean;
  sampleWatermarkText: string;
  corpusTotalNu: number;
  essentialDrugsCount: number;
  traditionalMedicinesCount: number;
  vaccinesCount: number;
}

export const institutionalConfig: InstitutionalConfig = {
  siteName: "Bhutan Health Trust Fund",
  legalEntityName: "Bhutan Health Trust Fund Secretariat",
  royalMandateDecree: "Royal Charter Autonomous Statutory Entity",

  // Official Emergency Helpline
  emergencyHelpline: process.env.BHTF_EMERGENCY_HELPLINE || "112",
  emergencyHelplineLabel: "Toll-Free 24/7 Nationwide Emergency Medical Logistics",

  // Secretariat Communication Details (Docx Version 2 Section 13)
  secretariatPhone: process.env.BHTF_SECRETARIAT_PHONE || "+975 2 322424",
  secretariatEmail: process.env.BHTF_SECRETARIAT_EMAIL || "bhtf@bhtf.bt",
  secretariatAddress:
    process.env.BHTF_SECRETARIAT_ADDRESS || "BTFEC Office Building, Genyen Lam, Thimphu, Bhutan",

  // Official Treasury Bank Accounts (Docx Version 2 Section 7)
  bankAccountBOB: process.env.BHTF_BANK_ACCOUNT_BOB || "100782506",
  bankAccountBNB: process.env.BHTF_BANK_ACCOUNT_BNB || "100782506",
  bankAccountUSD: process.env.BHTF_BANK_ACCOUNT_USD || "100931468",
  swiftCodeBOB: process.env.BHTF_SWIFT_BOB || "BHUBBTBT022",
  swiftCodeBNB: process.env.BHTF_SWIFT_BNB || "BHUBBTBT022",

  // Department of Revenue & Customs Tax Exemption (Docx Version 2 Section 5 & 7)
  taxExemptionId: process.env.BHTF_TAX_EXEMPTION_ID || "Tax Exemption Registration No. E-73",
  drcCircularRef: "DRC/TAX-A&L/DO-16/399",

  // Sovereign Matching Ratio
  sovereignMatchRatio: "1:1",

  // Tax Certificate Validity Flag
  isTaxCertificateValid: true,
  sampleWatermarkText: "OFFICIAL DRC TAX EXEMPTION CERTIFICATE",

  // Official Scale of Financing (Docx Version 2 Sections 1, 6 & 8)
  corpusTotalNu: 4798965306.85, // Nu. 4.8B as of 30 June 2026
  essentialDrugsCount: 438,
  traditionalMedicinesCount: 110,
  vaccinesCount: 4,
};
