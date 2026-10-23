import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

export interface FiduciaryMember {
  id: string;
  orderNumber: number;
  name: string;
  nameDz?: string;
  role: string;
  roleDz?: string;
  organization: string;
  organizationDz?: string;
  badge: string;
  badgeDz?: string;
  desc: string;
  descDz?: string;
  tags: string[];
  tagsDz?: string[];
  photo: string;
  theme?: "emerald" | "amber";
}

interface FiduciaryMemberCardProps {
  member: FiduciaryMember;
  isActive: boolean;
  onToggle: () => void;
  isDzongkha: boolean;
}

export function FiduciaryMemberCard({
  member,
  isActive,
  onToggle,
  isDzongkha,
}: FiduciaryMemberCardProps) {
  const isAmber = member.theme === "amber";

  const borderColor = isAmber
    ? isActive
      ? "border-amber-600 ring-4 ring-amber-500/20 shadow-2xl"
      : "border-slate-200/90 hover:border-amber-500/60"
    : isActive
      ? "border-emerald-600 ring-4 ring-emerald-500/20 shadow-2xl"
      : "border-slate-200/90 hover:border-emerald-500/60";

  const hoverBorderColor = isAmber ? "border-amber-600/50" : "border-emerald-600/50";
  const badgeBg = isAmber ? "bg-amber-50 text-amber-900 border-amber-200/80" : "bg-emerald-50 text-emerald-900 border-emerald-200/80";
  const roleTextColor = isAmber ? "text-amber-800" : "text-emerald-800";
  const dotColor = isAmber ? "bg-amber-600" : "bg-emerald-600";
  const tagBg = isAmber ? "bg-amber-50/80 text-amber-950 border-amber-200/60" : "bg-emerald-50/80 text-emerald-950 border-emerald-200/60";
  const arrowColor = isAmber ? "text-amber-800 group-hover:text-amber-950" : "text-emerald-800 group-hover:text-emerald-950";

  const displayName = isDzongkha && member.nameDz ? member.nameDz : member.name;
  const displayRole = isDzongkha && member.roleDz ? member.roleDz : member.role;
  const displayOrg = isDzongkha && member.organizationDz ? member.organizationDz : member.organization;
  const displayBadge = isDzongkha && member.badgeDz ? member.badgeDz : member.badge;
  const displayDesc = isDzongkha && member.descDz ? member.descDz : member.desc;
  const displayTags = isDzongkha && member.tagsDz ? member.tagsDz : member.tags;

  return (
    <div
      onClick={onToggle}
      className={`group relative w-full rounded-3xl bg-white border-2 transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden cursor-pointer flex flex-col ${borderColor}`}
      style={{ minHeight: "530px" }}
    >
      {/* Front Face: Large centered uncropped photo + clean footer */}
      <div className="flex flex-col h-full w-full">
        {/* Photo Container: Generous height, centered photo, zero cropping */}
        <div className="relative w-full h-[360px] sm:h-[390px] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/40 flex items-center justify-center p-6 overflow-hidden">
          {/* Subtle decorative background pattern */}
          <div
            className={`absolute inset-0 opacity-10 [background-size:16px_16px] ${
              isAmber
                ? "bg-[radial-gradient(#d97706_1px,transparent_1px)]"
                : "bg-[radial-gradient(#059669_1px,transparent_1px)]"
            }`}
          />

          {/* Centered, completely uncropped photo */}
          <img
            src={member.photo}
            alt={displayName}
            className="w-full h-full object-contain object-center drop-shadow-md group-hover:scale-105 transition-transform duration-500 relative z-10"
            loading="lazy"
          />

          {/* Order Number & Role Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/85 backdrop-blur-sm text-white font-mono text-xs font-bold shadow-sm">
              {member.orderNumber}
            </span>
            <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border shadow-2xs ${badgeBg}`}>
              {displayBadge}
            </span>
          </div>

          {/* Interactive Cue Badge */}
          <div className="absolute bottom-3 right-3 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border shadow-2xs ${badgeBg}`}>
              <Sparkles className={`w-3 h-3 ${isAmber ? "text-amber-600" : "text-emerald-600"}`} />
              <span>{isDzongkha ? "ཁ་གསལ་གཟིགས།" : "Hover for Mandate"}</span>
            </span>
          </div>
        </div>

        {/* Front Footer Info */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
          <div>
            <span className={`text-[11px] font-mono uppercase tracking-widest font-bold block mb-1 ${roleTextColor}`}>
              {displayOrg}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 group-hover:text-slate-950 transition-colors leading-tight">
              {displayName}
            </h3>
            <p className={`text-xs sm:text-sm font-semibold mt-1 ${roleTextColor}`}>
              {displayRole}
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">BHTF Governance</span>
            <span className={`font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ${arrowColor}`}>
              <span>{isDzongkha ? "ལོ་རྒྱུས་རྒྱས་པ།" : "View Mandate"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* DHI Signature Hover Reveal Overlay */}
      <div
        className={`absolute inset-0 bg-white/98 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 z-20 rounded-3xl border-2 ${hoverBorderColor} shadow-2xl ${
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        }`}
      >
        {/* Top Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${badgeBg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              {displayBadge}
            </span>
            <span className="font-mono text-xs text-slate-400 font-bold">
              #{member.orderNumber}
            </span>
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {displayName}
            </h3>
            <p className={`text-xs sm:text-sm font-bold mt-0.5 ${roleTextColor}`}>
              {displayRole}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {displayOrg}
            </p>
          </div>
        </div>

        {/* Middle: Fiduciary Biography & Mandates */}
        <div className="my-3 py-2 border-y border-slate-200/80 overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-1 space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {displayDesc}
          </p>

          {/* Focus Tags */}
          <div className="pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
              {isDzongkha ? "གཙོ་བོའི་འགན་ཁུར།" : "Institutional Focus & Mandate"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-sans font-medium px-2.5 py-1 rounded-lg border ${tagBg}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Organization & Tap Close */}
        <div className="space-y-2 pt-1 text-xs text-slate-600">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <ShieldCheck className={`w-3.5 h-3.5 ${roleTextColor} shrink-0`} />
              <span className="text-[11px] font-mono">Fiduciary Governance</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">BHTF Table {member.theme === "amber" ? "1.2" : "1.1"}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
            <span>Bhutan Health Trust Fund</span>
            <span className="text-slate-400 font-mono text-[10px]">
              {isDzongkha ? "(ཨེབ་སྟེ་བསྡམས)" : "(Tap to close)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
