import { Link, useLocation } from "@tanstack/react-router";
import { Landmark, ShieldCheck, Scale, Users, BookOpen, Target } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface SubTab {
  to: string;
  labelKey: string;
  label: string;
  shortLabelKey: string;
  shortLabel: string;
  icon: React.ElementType;
}

const ABOUT_SUB_TABS: SubTab[] = [
  {
    to: "/about",
    labelKey: "capsule_about",
    label: "About Us",
    shortLabelKey: "capsule_about",
    shortLabel: "About",
    icon: Landmark,
  },
  {
    to: "/about/organization",
    labelKey: "capsule_org",
    label: "Organization & Organogram",
    shortLabelKey: "capsule_org",
    shortLabel: "Organization",
    icon: Target,
  },
  {
    to: "/about/trustees",
    labelKey: "capsule_trustees",
    label: "Board of Trustees",
    shortLabelKey: "capsule_trustees",
    shortLabel: "Trustees",
    icon: ShieldCheck,
  },
  {
    to: "/about/committees",
    labelKey: "capsule_amc",
    label: "Asset Management Committee",
    shortLabelKey: "capsule_amc",
    shortLabel: "AMC",
    icon: Scale,
  },
  {
    to: "/about/secretariat",
    labelKey: "capsule_secretariat",
    label: "Secretariat",
    shortLabelKey: "capsule_secretariat",
    shortLabel: "Secretariat",
    icon: Users,
  },
  {
    to: "/our-story",
    labelKey: "capsule_story",
    label: "Our Story",
    shortLabelKey: "capsule_story",
    shortLabel: "Our Story",
    icon: BookOpen,
  },
];

export function AboutBottomCapsule() {
  return null;
}

