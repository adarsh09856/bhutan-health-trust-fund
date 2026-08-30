import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Pill, Syringe, Stethoscope, HeartPulse, Microscope, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/our-work")({
  head: () => ({ meta: [{ title: "Our Work | Bhutan Health Trust Fund" }, { name: "description", content: "Explore BHTF's programs: essential medicines, vaccines, primary healthcare, and capacity building." }] }),
  component: OurWork,
});

const programs = [
  { icon: Pill, title: "Essential Medicines", text: "Procurement and supply of over 120 essential medicines distributed across all 20 dzongkhags." },
  { icon: Syringe, title: "Immunization", text: "Financing routine childhood immunization and new vaccine introductions including HPV and influenza." },
  { icon: Stethoscope, title: "Primary Healthcare", text: "Strengthening Basic Health Units and outreach clinics that bring care to remote communities." },
  { icon: HeartPulse, title: "Maternal & Child Health", text: "Investing in safer pregnancies, healthy births and thriving children." },
  { icon: Microscope, title: "Diagnostics & Supplies", text: "Reliable diagnostics and medical supplies to support clinicians at every level." },
  { icon: GraduationCap, title: "Health Workforce", text: "Capacity-building programs for health workers serving Bhutan's most remote villages." },
];

function OurWork() {
  return (
    <>
      <PageHero title="Our Work" subtitle="From the highlands to the foothills — financing the medicines, vaccines and care every Bhutanese needs." />
      <section className="mx-auto max-w-7xl px-4 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p) => (
          <div key={p.title} className="bg-white border rounded-xl p-6 hover:shadow-md transition">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 text-secondary grid place-items-center mb-4"><p.icon className="h-6 w-6" /></div>
            <h3 className="font-semibold text-primary mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}