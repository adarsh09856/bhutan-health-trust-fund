import { Download, FileText } from "lucide-react";
import { trackReportDownload } from "@/lib/api/public.functions";
import type { Report } from "@/lib/db/schema";

export function ManagedPublications({ reports, categories }: { reports: Array<Report & { fileAvailable?: boolean }>; categories: string[] }) {
  const publications = reports.filter(report => categories.includes(report.category) && report.fileAvailable !== false);
  if (!publications.length) return null;
  return <section className="home-content py-8" data-bhtf-section="managed-publications">
    <span className="premium-eyebrow">Published by the Secretariat</span>
    <h2 className="font-serif text-3xl text-[#0b4f42] mt-3 mb-6">Latest publications</h2>
    <div className="publication-register">
      {publications.map(report => <article className="editorial-card p-5 sm:p-7" key={report.id}>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <FileText className="shrink-0 text-[#0b4f42]" />
          <div className="min-w-0">
            <span className="text-xs text-slate-500">{report.year} · {report.category}</span>
            <h3 className="font-serif text-xl text-[#0b4f42] mt-1">{report.title}</h3>
            <p className="text-sm leading-7 text-slate-600 mt-2">{report.description}</p>
          </div>
          <a className="premium-button premium-button-paper shrink-0" href={report.fileUrl} download
            onClick={() => { void trackReportDownload({ data: { reportId: report.id } }).catch(() => {}); }}>
            <Download size={16} /> <span>Download PDF</span>
          </a>
        </div>
      </article>)}
    </div>
  </section>;
}
