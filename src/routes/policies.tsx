import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/policies")({
  head: () => ({ meta: [{ title: "Policies | BHTF" }, { name: "description", content: "Governance, procurement, anti-corruption and transparency policies of BHTF." }] }),
  component: Policies,
});

const policies = [
  { title: "Governance Charter", text: "Foundational document outlining BHTF's mandate, structure and accountability." },
  { title: "Procurement Policy", text: "Open, competitive procurement guidelines for medicines and supplies." },
  { title: "Anti-Corruption & Whistleblower Policy", text: "Zero tolerance for corruption with safe channels for reporting concerns." },
  { title: "Conflict of Interest Policy", text: "How BHTF identifies and manages potential conflicts at every level." },
  { title: "Investment Policy Statement", text: "Prudent management of trust fund assets for long-term sustainability." },
  { title: "Data Protection & Privacy", text: "Safeguarding personal and partner data we receive." },
];

function Policies() {
  return (
    <>
      <PageHero title="Policies & Guidelines" subtitle="Operating with the highest standards of integrity, transparency and accountability." />
      <section className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-2 gap-5">
        {policies.map((p) => (
          <div key={p.title} className="bg-white border rounded-xl p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><ShieldCheck className="h-5 w-5" /></div>
              <h3 className="font-semibold text-primary">{p.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}