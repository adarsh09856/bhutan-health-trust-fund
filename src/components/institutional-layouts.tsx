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
  const isAqua = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-20 border-y ${
        isAqua
          ? "bg-[#EAF6F5] text-slate-900 border-[#00A896]/20"
          : "bg-[#FAF8F3] text-slate-900 border-slate-200/90"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Illuminated Framed Royal Proclamation Chassis */}
        <div className="relative rounded-3xl p-7 sm:p-12 md:p-14 text-center space-y-6 bg-white border border-amber-400/40 shadow-[0_16px_45px_rgba(212,162,55,0.08)]">
          {/* Centered Royal Medallion */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="h-full w-full rounded-full flex items-center justify-center bg-white text-amber-600 font-serif font-black text-xl">
                ༄༅
              </div>
            </div>

            {legalBasis && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase font-mono shadow-xs">
                <span>{legalBasis}</span>
              </div>
            )}
          </div>

          {/* Proclamation Quote with Generous, Non-Squished Typography */}
          <blockquote
            className="font-serif text-lg sm:text-2xl md:text-[1.75rem] font-medium tracking-normal text-[#0B4F42] max-w-3xl mx-auto break-words italic"
            style={{ lineHeight: 1.68 }}
          >
            "{proclamation}"
          </blockquote>

          {/* Attribution Footline */}
          <div className="pt-4 border-t border-amber-500/20 max-w-md mx-auto space-y-0.5">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-700 font-sans">
              {citation}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Sovereign Health Trust Mandate • Universal Healthcare Guarantee
            </div>
          </div>
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
  const isAqua = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-18 border-b ${
        isAqua
          ? "bg-[#EAF6F5] text-slate-900 border-[#00A896]/20"
          : "bg-white text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0B4F42]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm font-sans font-light text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Ruled Table */}
        <div
          className={`border-t ${
            isAqua ? "border-[#00A896]/20" : "border-slate-300"
          }`}
        >
          {rows.map((row, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row sm:items-baseline justify-between py-4 border-b gap-2 ${
                isAqua ? "border-[#00A896]/15" : "border-slate-200"
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base sm:text-lg font-bold text-slate-900">
                    {row.label}
                  </span>
                  {row.code && (
                    <span
                      className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded ${
                        isAqua
                          ? "bg-white text-[#0B4F42] border border-[#00A896]/30"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {row.code}
                    </span>
                  )}
                </div>
                {row.subtext && (
                  <p className="text-xs font-sans text-slate-500">
                    {row.subtext}
                  </p>
                )}
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold font-mono tracking-tight shrink-0 text-[#0B4F42]">
                {row.figure}
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Date & Source Line */}
        <div className="text-[11px] font-mono tracking-wide text-slate-500">
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
  const isAqua = theme === "forest";

  return (
    <section
      className={`py-16 sm:py-20 border-b ${
        isAqua
          ? "bg-[#EAF6F5] text-slate-900 border-[#00A896]/20"
          : "bg-[#FAF8F3] text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="md:col-span-4 space-y-2">
          {referenceCode && (
            <span
              className={`text-[11px] font-mono font-bold tracking-widest uppercase block ${
                isAqua ? "text-[#00A896]" : "text-amber-800"
              }`}
            >
              {referenceCode}
            </span>
          )}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[#0B4F42]">
            {sectionTitle}
          </h2>
        </div>

        <div className="md:col-span-8 space-y-4">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-sm sm:text-base font-sans font-light leading-relaxed text-slate-700"
            >
              {p}
            </p>
          ))}

          {actionLink && (
            <div className="pt-2">
              <Link
                to={actionLink.to}
                className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider transition ${
                  isAqua
                    ? "text-[#00A896] hover:text-[#0B4F42] hover:underline"
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
  const isAqua = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-18 border-b ${
        isAqua
          ? "bg-[#EAF6F5] text-slate-900 border-[#00A896]/20"
          : "bg-white text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0B4F42]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm font-sans font-light text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`border-t ${
            isAqua ? "border-[#00A896]/20" : "border-slate-300"
          }`}
        >
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isAqua ? "border-[#00A896]/15" : "border-slate-200"
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-base font-bold text-slate-900">
                    {doc.title}
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#0B4F42] border border-[#00A896]/30"
                  >
                    {doc.category}
                  </span>
                </div>
                <div className="text-xs font-mono flex items-center gap-3 text-slate-500">
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
                    isAqua
                      ? "border-[#00A896]/40 text-[#0B4F42] bg-white hover:bg-[#0B4F42] hover:text-white"
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
  const isAqua = theme === "forest";

  return (
    <section
      className={`py-16 sm:py-20 border-b ${
        isAqua
          ? "bg-[#EAF6F5] text-slate-900 border-[#00A896]/20"
          : "bg-[#FAF8F3] text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0B4F42]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm font-sans font-light text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Gazette Chronology List with Clean Vertical Hairline */}
        <div
          className={`border-l-2 pl-6 sm:pl-8 space-y-8 ${
            isAqua ? "border-[#00A896]/40" : "border-amber-800/40"
          }`}
        >
          {entries.map((entry, idx) => (
            <div key={idx} className="space-y-1 relative">
              <span
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-2.5 w-2.5 rounded-full border-2 bg-white ${
                  idx % 3 === 1
                    ? "border-[#EE6C8A] ring-2 ring-[#F7CAD0]/50"
                    : isAqua
                    ? "border-[#00A896]"
                    : "border-[#D4A237]"
                }`}
              />
              <div
                className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isAqua ? "text-[#00A896]" : "text-amber-800"
                }`}
              >
                {entry.date}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                {entry.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-slate-700">
                {entry.summary}
              </p>
              {entry.statutoryBasis && (
                <div className="text-[11px] font-mono text-slate-500">
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
  const isAqua = theme === "forest";

  return (
    <section
      className={`py-14 sm:py-18 border-b ${
        isAqua
          ? "bg-[#EAF6F5] text-slate-900 border-[#00A896]/20"
          : "bg-white text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Unadorned Framed Plate */}
        <div className="border border-slate-300 overflow-hidden bg-slate-100">
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
            <span className="font-serif text-sm font-bold block text-[#0B4F42]">
              {captionTitle}
            </span>
            <p className="text-xs font-sans font-light leading-relaxed text-slate-600">
              {captionText}
            </p>
          </div>
          <div className="text-[11px] font-mono tracking-wider shrink-0 text-slate-500">
            Credit: {credit}
          </div>
        </div>
      </div>
    </section>
  );
}
