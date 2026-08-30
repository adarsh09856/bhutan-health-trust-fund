import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Target, Eye, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us | Bhutan Health Trust Fund" }, { name: "description", content: "Learn about BHTF's mission, vision, governance, and our work financing essential medicines and vaccines for Bhutan." }] }),
  component: About,
});

function About() {
  const values = [
    { icon: Target, title: "Our Mission", text: "Sustainably finance essential medicines and vaccines to ensure equitable access to quality primary healthcare for every Bhutanese citizen." },
    { icon: Eye, title: "Our Vision", text: "A self-reliant, resilient health system where no Bhutanese is left behind." },
    { icon: Heart, title: "Core Values", text: "Equity, integrity, transparency, accountability, and compassion guide every decision we make." },
    { icon: Award, title: "Our Mandate", text: "Established by Royal Charter to safeguard the long-term financing of essential health commodities." },
  ];
  return (
    <>
      <PageHero title="About BHTF" subtitle="An autonomous trust fund established to safeguard the health and well-being of every Bhutanese, today and in the future." />
      <section className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Who We Are</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">The Bhutan Health Trust Fund (BHTF) is an autonomous body established under a Royal Charter to sustainably finance essential medicines, vaccines and primary healthcare services across the Kingdom of Bhutan.</p>
          <p className="text-foreground/80 leading-relaxed">Guided by His Majesty's vision of Gross National Happiness, BHTF works in partnership with the Ministry of Health and global development partners to ensure that every Bhutanese — from the highlands of Lunana to the southern foothills — has access to the medicines and vaccines they need.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-white border rounded-xl p-5">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center mb-3"><v.icon className="h-5 w-5" /></div>
              <h3 className="font-semibold text-primary mb-1">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-muted py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-primary mb-6">Governance</h2>
          <p className="text-foreground/80 max-w-3xl leading-relaxed">BHTF is governed by a Board of Trustees representing the Royal Government, civil society, and the private sector. The Board ensures the fund's resources are managed prudently and deployed for maximum public health impact.</p>
        </div>
      </section>
    </>
  );
}