import React, { useState } from "react";
import { UserRound } from "lucide-react";

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
  photo?: string;
  fallbackPhoto?: string;
  theme?: "emerald" | "amber";
}

interface FiduciaryMemberCardProps {
  member: FiduciaryMember;
  isActive: boolean;
  onToggle: () => void;
  isDzongkha: boolean;
  showNumber?: boolean;
}

export function FiduciaryMemberCard({
  member,
  isActive,
  onToggle,
  isDzongkha,
  showNumber = true,
}: FiduciaryMemberCardProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const isAmber = member.theme === "amber";

  const borderColor = isAmber
    ? isActive
      ? "border-amber-600 ring-4 ring-amber-500/20 shadow-2xl"
      : "border-slate-200/90 hover:border-amber-500/60"
    : isActive
      ? "border-emerald-600 ring-4 ring-emerald-500/20 shadow-2xl"
      : "border-slate-200/90 hover:border-emerald-500/60";

  const hoverBorderColor = isAmber ? "border-amber-600/50" : "border-emerald-600/50";
  const roleTextColor = isAmber ? "text-amber-800" : "text-emerald-800";
  const tagBg = isAmber
    ? "bg-amber-50/80 text-amber-950 border-amber-200/60"
    : "bg-emerald-50/80 text-emerald-950 border-emerald-200/60";

  const displayName = isDzongkha && member.nameDz ? member.nameDz : member.name;
  const displayRole = isDzongkha && member.roleDz ? member.roleDz : member.role;
  const displayOrg =
    isDzongkha && member.organizationDz ? member.organizationDz : member.organization;
  const displayDesc = isDzongkha && member.descDz ? member.descDz : member.desc;
  const displayTags = isDzongkha && member.tagsDz ? member.tagsDz : member.tags;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${displayName}: ${isActive ? "hide details" : "show details"}`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`group relative w-full rounded-3xl bg-white border-2 transition-all duration-300 shadow-sm hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 overflow-hidden cursor-pointer flex flex-col ${borderColor}`}
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

          {showNumber && (
            <span className="absolute left-4 top-4 z-20 inline-flex size-8 items-center justify-center rounded-full bg-slate-900/90 font-mono text-xs font-bold text-white shadow-md ring-2 ring-white">
              {member.orderNumber}
            </span>
          )}

          {/* Centered, completely uncropped photo */}
          {member.photo && !photoFailed ? (
            <img
              src={member.photo}
              alt={displayName}
              className="w-full h-full object-contain object-center drop-shadow-md group-hover:scale-105 transition-transform duration-500 relative z-10"
              loading="lazy"
              onError={(event) => {
                const image = event.currentTarget;
                if (member.fallbackPhoto && image.dataset.fallbackApplied !== "true") {
                  image.dataset.fallbackApplied = "true";
                  image.src = member.fallbackPhoto;
                } else {
                  setPhotoFailed(true);
                }
              }}
            />
          ) : (
            <div className="relative z-10 flex h-full w-full items-center justify-center text-slate-300" aria-label={`${displayName} portrait not available`}>
              <UserRound className="h-24 w-24" strokeWidth={1.1} aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Front Footer Info */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
          <div>
            <span
              className={`text-[11px] font-mono uppercase tracking-widest font-bold block mb-1 ${roleTextColor}`}
            >
              {displayOrg}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 group-hover:text-slate-950 transition-colors leading-tight">
              {displayName}
            </h3>
            <p className={`text-xs sm:text-sm font-semibold mt-1 ${roleTextColor}`}>
              {displayRole}
            </p>
          </div>
        </div>
      </div>

      {/* DHI Signature Hover Reveal Overlay */}
      <div
        className={`absolute inset-0 bg-white/98 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 z-20 rounded-3xl border-2 ${hoverBorderColor} shadow-2xl ${
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-visible:opacity-100 group-focus-visible:pointer-events-auto"
        }`}
      >
        {/* Mandate details */}
        <div className="space-y-2">
          {showNumber && (
            <span className="font-mono text-xs font-bold text-slate-400">#{member.orderNumber}</span>
          )}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {displayName}
            </h3>
            <p className={`text-xs sm:text-sm font-bold mt-0.5 ${roleTextColor}`}>{displayRole}</p>
            <p className="text-xs text-slate-500 font-medium">{displayOrg}</p>
          </div>
        </div>

        {/* Middle: Fiduciary Biography & Mandates */}
        <div className="my-3 py-2 border-y border-slate-200/80 overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-1 space-y-3">
          {displayDesc && (
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {displayDesc}
            </p>
          )}

          {/* Focus Tags */}
          {displayTags.length > 0 && <div className="pt-1">
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
          </div>}
        </div>

        <p className="text-[11px] text-slate-500">
          {isDzongkha
            ? "ཞིབ་ཕྲ་བསྡམ་པའི་དོན་ལུ་སླར་ཡང་ཨེབ།"
            : "Select this card again to close details."}
        </p>
      </div>
    </div>
  );
}
