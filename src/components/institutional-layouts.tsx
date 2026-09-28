import React from "react";
import { Link } from "@tanstack/react-router";
import { Download, ArrowRight, ExternalLink } from "lucide-react";

/**
 * BHTF Institutional Design System — Six Approved Layouts
 * 
 * Palette:
 * - Parchment: #FAF8F3 (bg-stone-50 / cream)
 * - Forest Green: #061713 / #071914
 * - Royal Gold: #D4A237
 * - Hairline Dividers: 1px border-slate-200 / border-white/10
 * - Fonts: Fraunces (serif), Plus Jakarta Sans (body), JetBrains Mono (codes/figures)
 */

/* =========================================================================
   LAYOUT 1: Statement of Royal Mandate (Typographic Authority)
   ========================================================================= */
interface StatementLayoutProps {
  proclamation: string;
  citation: string;
  legalBasis?: string;
  theme?: "parchment" | "forest";
}

export function StatementLayout({
  proclamation,
  citation,
  legalBasis,
  theme = "parchment",
}: StatementLayoutProps) {
  const isDark = theme === "forest";

  return (
    <section
      className={`py-16 sm:py-20 border-y ${
        isDark
          ? "bg-[#061713] text-white border-amber-400/20"
          : "bg-[#FAF8F3] text-slate-900 border-slate-200/90"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
        {legalBasis && (
          <div
            className={`text-[11px] font-mono tracking-widest uppercase font-bold ${
              isDark ? "text-amber-400/90" : "text-amber-800"
            }`}
          >
            {legalBasis}
          </div>
        )}
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug tracking-tight">
          "{proclamation}"
        </blockquote>
        <div
          className={`text-xs font-mono tracking-wider pt-2 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          — {citation}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LAYOUT 2: Ruled Fiduciary Ledger / Data Table
   ========================================================================= */
export interface LedgerRow {
  label: string;
  figure: string;
  subtext?: string;
  code?: string;
}

interface RuledLedgerLayoutProps {
  title: string;
  subtitle?: string;
  sourceLine: string;
  rows: LedgerRow[];
  theme?: "parchment" | "forest";
}

export function RuledLedgerLayout({
  title,
  subtitle,
  sourceLine,
  rows,
  theme = "parchment",
}: RuledLedgerLayoutProps) {
  const isDark = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-18 border-b ${
        isDark
          ? "bg-[#061713] text-white border-white/10"
          : "bg-white text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-xs sm:text-sm font-sans font-light ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Ruled Table */}
        <div
          className={`border-t ${
            isDark ? "border-white/15" : "border-slate-300"
          }`}
        >
          {rows.map((row, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row sm:items-baseline justify-between py-4 border-b gap-2 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base sm:text-lg font-bold">
                    {row.label}
                  </span>
                  {row.code && (
                    <span
                      className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded ${
                        isDark
                          ? "bg-white/10 text-amber-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {row.code}
                    </span>
                  )}
                </div>
                {row.subtext && (
                  <p
                    className={`text-xs font-sans ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {row.subtext}
                  </p>
                )}
              </div>
              <div
                className={`font-serif text-xl sm:text-2xl font-bold font-mono tracking-tight shrink-0 ${
                  isDark ? "text-amber-300" : "text-slate-900"
                }`}
              >
                {row.figure}
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Date & Source Line */}
        <div
          className={`text-[11px] font-mono tracking-wide ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {sourceLine}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LAYOUT 3: Two-Column Institutional Narrative
   ========================================================================= */
interface TwoColumnNarrativeLayoutProps {
  sectionTitle: string;
  referenceCode?: string;
  paragraphs: string[];
  actionLink?: { label: string; to: string };
  theme?: "parchment" | "forest";
}

export function TwoColumnNarrativeLayout({
  sectionTitle,
  referenceCode,
  paragraphs,
  actionLink,
  theme = "parchment",
}: TwoColumnNarrativeLayoutProps) {
  const isDark = theme === "forest";

  return (
    <section
      className={`py-16 sm:py-20 border-b ${
        isDark
          ? "bg-[#061713] text-white border-white/10"
          : "bg-[#FAF8F3] text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="md:col-span-4 space-y-2">
          {referenceCode && (
            <span
              className={`text-[11px] font-mono font-bold tracking-widest uppercase block ${
                isDark ? "text-amber-400" : "text-amber-800"
              }`}
            >
              {referenceCode}
            </span>
          )}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            {sectionTitle}
          </h2>
        </div>

        <div className="md:col-span-8 space-y-4">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`text-sm sm:text-base font-sans font-light leading-relaxed ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {p}
            </p>
          ))}

          {actionLink && (
            <div className="pt-2">
              <Link
                to={actionLink.to}
                className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider transition ${
                  isDark
                    ? "text-amber-300 hover:text-amber-200 hover:underline"
                    : "text-amber-800 hover:text-amber-900 hover:underline"
                }`}
              >
                <span>{actionLink.label}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LAYOUT 4: Archival Document & Publication Register
   ========================================================================= */
export interface DocumentItem {
  id: string | number;
  title: string;
  referenceNo: string;
  date: string;
  category: string;
  formatSize: string;
  downloadUrl?: string;
  onDownload?: () => void;
}

interface DocumentRegisterLayoutProps {
  title: string;
  subtitle?: string;
  documents: DocumentItem[];
  theme?: "parchment" | "forest";
}

export function DocumentRegisterLayout({
  title,
  subtitle,
  documents,
  theme = "parchment",
}: DocumentRegisterLayoutProps) {
  const isDark = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-18 border-b ${
        isDark
          ? "bg-[#061713] text-white border-white/10"
          : "bg-white text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-xs sm:text-sm font-sans font-light ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`border-t ${
            isDark ? "border-white/15" : "border-slate-300"
          }`}
        >
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-base font-bold">
                    {doc.title}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isDark
                        ? "bg-white/10 text-emerald-300"
                        : "bg-emerald-50 text-emerald-900 border border-emerald-200"
                    }`}
                  >
                    {doc.category}
                  </span>
                </div>
                <div
                  className={`text-xs font-mono flex items-center gap-3 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <span>Ref: {doc.referenceNo}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.formatSize}</span>
                </div>
              </div>

              {doc.downloadUrl || doc.onDownload ? (
                <a
                  href={doc.downloadUrl || "#"}
                  onClick={(e) => {
                    if (doc.onDownload) {
                      e.preventDefault();
                      doc.onDownload();
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider px-3.5 py-1.5 rounded border transition shrink-0 ${
                    isDark
                      ? "border-amber-400/40 text-amber-300 hover:bg-amber-400 hover:text-slate-950"
                      : "border-slate-300 text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LAYOUT 5: Archival Chronology / Gazette Timeline
   ========================================================================= */
export interface TimelineEntry {
  date: string;
  title: string;
  summary: string;
  statutoryBasis?: string;
}

interface GazetteTimelineLayoutProps {
  title: string;
  subtitle?: string;
  entries: TimelineEntry[];
  theme?: "parchment" | "forest";
}

export function GazetteTimelineLayout({
  title,
  subtitle,
  entries,
  theme = "parchment",
}: GazetteTimelineLayoutProps) {
  const isDark = theme === "forest";

  return (
    <section
      className={`py-16 sm:py-20 border-b ${
        isDark
          ? "bg-[#061713] text-white border-white/10"
          : "bg-[#FAF8F3] text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-xs sm:text-sm font-sans font-light ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Gazette Chronology List with Clean Vertical Hairline */}
        <div
          className={`border-l-2 pl-6 sm:pl-8 space-y-8 ${
            isDark ? "border-amber-400/30" : "border-amber-800/40"
          }`}
        >
          {entries.map((entry, idx) => (
            <div key={idx} className="space-y-1 relative">
              <div
                className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark ? "text-amber-300" : "text-amber-800"
                }`}
              >
                {entry.date}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold">
                {entry.title}
              </h3>
              <p
                className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {entry.summary}
              </p>
              {entry.statutoryBasis && (
                <div
                  className={`text-[11px] font-mono ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Authority: {entry.statutoryBasis}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LAYOUT 6: Photographic Plate with Archival Caption
   ========================================================================= */
interface PhotographicPlateLayoutProps {
  imageSrc: string;
  imageAlt: string;
  captionTitle: string;
  captionText: string;
  credit: string;
  theme?: "parchment" | "forest";
}

export function PhotographicPlateLayout({
  imageSrc,
  imageAlt,
  captionTitle,
  captionText,
  credit,
  theme = "parchment",
}: PhotographicPlateLayoutProps) {
  const isDark = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-18 border-b ${
        isDark
          ? "bg-[#061713] text-white border-white/10"
          : "bg-white text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Unadorned Framed Plate */}
        <div
          className={`border overflow-hidden bg-slate-100 ${
            isDark ? "border-white/15" : "border-slate-300"
          }`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto max-h-[560px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Scholarly Caption & Credit */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1 border-t border-slate-200/60">
          <div className="space-y-0.5 max-w-2xl">
            <span className="font-serif text-sm font-bold block">
              {captionTitle}
            </span>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {captionText}
            </p>
          </div>
          <div
            className={`text-[11px] font-mono tracking-wider shrink-0 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Credit: {credit}
          </div>
        </div>
      </div>
    </section>
  );
}
