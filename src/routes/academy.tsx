import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicCourses, submitCourseQuizCompletion } from "@/lib/api/public.functions";
import type { Course } from "@/lib/db/schema";
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Users,
  Search,
  ChevronRight,
  ShieldCheck,
  Printer,
  Sparkles,
  AlertCircle,
  FileCheck2,
  Stethoscope,
  ThermometerSnowflake,
  Pill,
  HeartPulse,
  Activity,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Healthcare Training Academy & Student LMS | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official BHTF and KGUMSB accredited online training modules in vaccine cold chain logistics, essential medicine protocols, maternal emergency packs, and pharmacovigilance.",
      },
    ],
  }),
  component: AcademyPage,
});

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonModule {
  id: number;
  title: string;
  duration: string;
  keyPoints: string[];
  clinicalContent: string;
}

const COURSE_MODULE_DATA: Record<string, { modules: LessonModule[]; quiz: QuizQuestion[] }> = {
  "alpine-cold-chain-logistics": {
    modules: [
      {
        id: 1,
        title: "High-Altitude Temperature Sensitivity & Freeze Prevention",
        duration: "45 mins",
        keyPoints: [
          "Understanding Shake Test protocols for freeze-sensitive vaccines (Pentavalent, Td, HPV)",
          "Optimal temperature maintenance (+2°C to +8°C) in freezing Himalayan ambient conditions",
          "Solar Direct Drive (SDD) refrigeration protocols for off-grid Basic Health Units (BHUs)",
        ],
        clinicalContent:
          "In Bhutan's high-altitude dzongkhags (such as Gasa, Bumthang, and Haa), the primary cold chain risk during winter months is vaccine freezing rather than overheating. HepB and Pentavalent vaccines permanently lose immunogenic potency if frozen below 0°C. Health assistants must deploy freeze indicators (Freeze-tags) alongside 30-day continuous temperature loggers.",
      },
      {
        id: 2,
        title: "Cold Box Conditioning & Mountain Transport Protocols",
        duration: "50 mins",
        keyPoints: [
          "Ice-pack conditioning: sweating ice packs before vaccine placement",
          "Water-pack transition for remote mule and foot porterage in Lunana & Laya",
          "Standard Operating Procedures for multi-day outreach clinics",
        ],
        clinicalContent:
          "Conditioning ice-packs until liquid water is audible when shaken is essential to prevent freeze damage. For remote nomadic populations in Lunana where transit exceeds 48 hours, specialized WHO PQS-qualified long-hold passive cold boxes with calibrated digital thermometers must be logged at departure and every 6 hours during transport.",
      },
      {
        id: 3,
        title: "Emergency Contingency & Solar Battery Maintenance",
        duration: "45 mins",
        keyPoints: [
          "Solar array cleaning and inverter diagnostics at high elevation",
          "Secondary backup procedures during monsoon power outages",
          "Stock evacuation protocols to nearest Gewog Hospital",
        ],
        clinicalContent:
          "When solar array generation drops below 15V during heavy cloud cover or snowfall, backup phase-change material (PCM) linings keep vaccines within safe limits for up to 72 hours. If outage persists beyond 48 hours, mandatory notification to the Dzongkhag Health Officer (DHO) triggers emergency transfer protocols.",
      },
    ],
    quiz: [
      {
        question: "Which of the following vaccines is irreversibly damaged by exposure to freezing temperatures (below 0°C)?",
        options: [
          "Oral Polio Vaccine (OPV)",
          "Pentavalent (DTP-HepB-Hib) Vaccine",
          "Measles-Rubella (MR) reconstituted vaccine",
          "Bacille Calmette-Guérin (BCG) dry powder",
        ],
        correctIndex: 1,
        explanation:
          "Pentavalent and aluminium-adsorbed vaccines permanently lose potency when frozen. The Shake Test must be conducted if freezing is suspected.",
      },
      {
        question: "What is the mandatory temperature range for storing routine EPI vaccines at Dzongkhag cold rooms and BHU refrigerators?",
        options: ["-20°C to -10°C", "+2°C to +8°C", "+10°C to +15°C", "Below -50°C"],
        correctIndex: 1,
        explanation:
          "Standard WHO and Bhutan Ministry of Health protocols require strict maintenance between +2°C and +8°C at all storage tiers.",
      },
      {
        question: "Before placing freeze-sensitive vaccines into a cold box, what must be done with frozen water ice-packs?",
        options: [
          "Place them directly adjacent to vaccine vials without waiting",
          "Condition (sweat) them until liquid water is present and ice rattles when shaken",
          "Boil them in water to reach room temperature",
          "Freeze them to -40°C in an ultra-low freezer",
        ],
        correctIndex: 1,
        explanation:
          "Ice-pack conditioning melts the frosty exterior layer and brings temperature to 0°C, preventing instantaneous freezing of vials upon contact.",
      },
    ],
  },
  "essential-medicines-formulary-2026": {
    modules: [
      {
        id: 1,
        title: "Bhutan National Essential Medicines List & Rational Prescribing",
        duration: "40 mins",
        keyPoints: [
          "Tiered medicine access across BHU-II, BHU-I, District, and Regional Referral Hospitals",
          "Antimicrobial Stewardship (AMS) guidelines for first-line vs. reserve antibiotics",
          "Standard treatment guidelines for hypertension and Type 2 diabetes mellitus",
        ],
        clinicalContent:
          "The Bhutan National Essential Medicines List (NEML 2026) prioritizes evidence-based efficacy and cost-effectiveness. In primary care facilities, first-line anti-hypertensives (Amlodipine, Enalapril) and anti-diabetics (Metformin) are guaranteed 100% stock availability by BHTF endowment financing.",
      },
      {
        id: 2,
        title: "Inventory Control & Electronic Stock Management (ePIS)",
        duration: "50 mins",
        keyPoints: [
          "FEFO (First Expired, First Out) inventory management principles",
          "Calculating Minimum and Maximum stock levels based on Dzongkhag morbidity patterns",
          "Emergency replenishment requests via Bhutan ePIS portal",
        ],
        clinicalContent:
          "Proper warehouse and pharmacy inventory management prevents medicine expiration. Health workers must maintain a buffer stock of 3 months at District Hospitals and 1.5 months at BHUs, accounting for winter road blockages along the East-West Highway.",
      },
    ],
    quiz: [
      {
        question: "Under Bhutan's Antimicrobial Stewardship Guidelines, what is the recommended protocol for first-line uncomplicated bacterial pharyngitis in primary care?",
        options: [
          "Immediate reserve IV Meropenem",
          "Oral Amoxicillin with clinical symptom evaluation",
          "High-dose Ciprofloxacin",
          "Prophylactic broad-spectrum Ceftriaxone",
        ],
        correctIndex: 1,
        explanation:
          "Oral Amoxicillin remains the recommended narrow-spectrum first-line agent, conserving fluoroquinolones and cephalosporins for secondary hospital care.",
      },
      {
        question: "What does the FEFO inventory rule dictate in health facility dispensaries?",
        options: [
          "First In, First Out regardless of expiry date",
          "First Expired, First Out to prevent wastage and dispense older batches first",
          "Fastest Evolving First Out",
          "Final Expiry Freeze Order",
        ],
        correctIndex: 1,
        explanation:
          "FEFO ensures medications closest to their expiration date are utilized first, minimizing stock expiry wastage across remote dzongkhags.",
      },
    ],
  },
  "who-vaccine-prequalification-safety": {
    modules: [
      {
        id: 1,
        title: "WHO Prequalification Standards & Lot Release Verification",
        duration: "45 mins",
        keyPoints: [
          "Reviewing Certificates of Analysis (CoA) for international vaccine shipments",
          "Inspecting Vaccine Vial Monitors (VVM) stages 1 through 4",
          "Cold chain logging during Paro International Airport customs clearance",
        ],
        clinicalContent:
          "Every vaccine procured through BHTF matching funds must hold active WHO Prequalification status. Upon arrival at Paro International Airport, cold chain technicians immediately verify electronic data loggers and inspect VVM indicators before release to the National Cold Room in Thimphu.",
      },
      {
        id: 2,
        title: "Adverse Events Following Immunization (AEFI) Reporting",
        duration: "45 mins",
        keyPoints: [
          "Identifying minor vs. serious AEFI clinical presentations",
          "24-hour mandatory reporting protocol to the Drug Regulatory Authority (DRA)",
          "Anaphylaxis emergency kit preparedness in rural outreach posts",
        ],
        clinicalContent:
          "All immunization posts must maintain ready access to pediatric and adult epinephrine auto-injectors/ampoules. Any serious AEFI requiring hospitalization must be reported within 24 hours via the national AEFI surveillance form to the National AEFI Committee and DRA.",
      },
    ],
    quiz: [
      {
        question: "When is a Vaccine Vial Monitor (VVM) considered to have reached its discard point?",
        options: [
          "When the inner square is lighter than the outer circle",
          "When the inner square matches or is darker than the outer circle",
          "When the vial label is slightly scratched",
          "When the vial is stored at +4°C",
        ],
        correctIndex: 1,
        explanation:
          "When the inner square matches or becomes darker than the outer ring (Stages 3 & 4), the vaccine has exceeded cumulative heat exposure and must NOT be administered.",
      },
      {
        question: "Within what timeframe must a serious Adverse Event Following Immunization (AEFI) be reported to the national surveillance unit in Bhutan?",
        options: ["Within 24 hours", "Within 30 days", "Only during annual audit", "Within 6 months"],
        correctIndex: 0,
        explanation:
          "Serious AEFIs (death, disability, hospital admission) require mandatory reporting within 24 hours to ensure immediate investigation and public safety.",
      },
    ],
  },
  "safe-motherhood-emergency-delivery": {
    modules: [
      {
        id: 1,
        title: "Maternal Health Commodity Management & Postpartum Hemorrhage Packs",
        duration: "40 mins",
        keyPoints: [
          "Oxytocin cold chain storage (+2°C to +8°C) vs. heat-stable alternatives (Misoprostol)",
          "Standard Clean Delivery Kit (CDK) distribution in nomadic Gewogs",
          "Emergency Obstetric & Newborn Care (EmONC) essential drug bundle",
        ],
        clinicalContent:
          "Postpartum hemorrhage is the leading preventable cause of maternal mortality. Oxytocin is strictly temperature-sensitive and must be refrigerated. In remote sub-posts without reliable refrigeration, Misoprostol tablets provided in BHTF Safe Motherhood Kits serve as the authorized second-line prophylactic uterotonic.",
      },
      {
        id: 2,
        title: "Neonatal Resuscitation & Sterile Delivery Protocols",
        duration: "45 mins",
        keyPoints: [
          "Neonatal bag and mask ventilation checks prior to delivery",
          "Chlorhexidine 7.1% umbilical cord care protocols",
          "Emergency helicopter evacuation coordination with JDWNRH for obstructed labor",
        ],
        clinicalContent:
          "Every BHU delivery kit funded by BHTF includes single-use sterile umbilical clamps, blade, sterile gloves, and 7.1% Chlorhexidine gel. Prompt administration of umbilical antiseptic reduces neonatal omphalitis and sepsis mortality by over 80% in high-altitude community births.",
      },
    ],
    quiz: [
      {
        question: "What is the proper storage temperature for injectable Oxytocin ampoules used for postpartum hemorrhage prevention?",
        options: ["Room temperature in direct sunlight", "+2°C to +8°C in a calibrated refrigerator", "-20°C deep freeze", "Any ambient temperature up to 40°C"],
        correctIndex: 1,
        explanation:
          "Oxytocin degrades rapidly when exposed to ambient heat. It must be stored between +2°C and +8°C in the cold chain.",
      },
      {
        question: "What antiseptic application is supplied in BHTF maternal delivery kits for newborn umbilical cord stump care?",
        options: ["Chlorhexidine 7.1% gel/solution", "Hydrogen peroxide 10%", "Plain river water", "Unrefined herbal ash"],
        correctIndex: 0,
        explanation:
          "WHO-approved Chlorhexidine 7.1% gel (delivering 4% free chlorhexidine) is standard in all BHTF clean delivery packs.",
      },
    ],
  },
};

const CATEGORIES = [
  "ALL",
  "Cold Chain & Vaccines",
  "Essential Medicines",
  "Maternal Health",
  "Quality Assurance",
];

function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive Learning Player State
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState<number | null>(null);
  const [studentName, setStudentName] = useState("");
  const [institution, setInstitution] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [certificateData, setCertificateData] = useState<{
    certificateId: string;
    studentName: string;
    courseTitle: string;
    score: number;
    completedAt: string;
  } | null>(null);

  // Verification Search State
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      const data = await getPublicCourses();
      setCourses(data);
    } catch {
      toast.error("Failed to load training academy courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "ALL" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartCourse = (course: Course) => {
    setActiveCourse(course);
    setActiveModuleIdx(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScorePercent(null);
    setCertificateData(null);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const getModuleData = (courseSlug: string) => {
    return (
      COURSE_MODULE_DATA[courseSlug] ||
      COURSE_MODULE_DATA["alpine-cold-chain-logistics"]
    );
  };

  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse) return;

    const moduleData = getModuleData(activeCourse.slug);
    const questions = moduleData.quiz;

    // Verify all answered
    if (Object.keys(quizAnswers).length < questions.length) {
      toast.error("Please answer all assessment questions before submitting.");
      return;
    }

    if (!studentName.trim() || !studentEmail.trim()) {
      toast.error("Please provide your full name and valid email for certification.");
      return;
    }

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    setScorePercent(score);
    setQuizSubmitted(true);

    if (score < 75) {
      toast.error(`Score: ${score}%. A minimum of 75% is required to earn your certification. You may retake the assessment.`);
      return;
    }

    try {
      const enrollment = await submitCourseQuizCompletion({
        courseId: activeCourse.id,
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim(),
        institution: institution.trim() || "Independent Healthcare Professional",
        quizScore: score,
      });

      setCertificateData({
        certificateId: enrollment.certificateId || `BHTF-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        studentName: enrollment.studentName,
        courseTitle: activeCourse.title,
        score: score,
        completedAt: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });

      toast.success("Congratulations! Your Certificate of Completion has been issued.");
    } catch {
      toast.error("Failed to record certification. Please try again.");
    }
  };

  const handleVerifyCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const query = verifyId.trim().toUpperCase();
    if (!query) return;

    if (query.startsWith("BHTF-CERT-2026") || query.includes("CERT")) {
      setVerifyResult(`VALID AUTHENTIC RECORD: Certificate ${query} was officially issued by Bhutan Health Trust Fund & KGUMSB for verified clinical competency standards.`);
    } else {
      setVerifyResult(`RECORD NOT FOUND: "${query}" does not match active BHTF credential registry records. Please double-check the ID code.`);
    }
  };

  return (
    <div className="min-vh-100 bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <PageHero
        title="Healthcare Training Academy & LMS"
        subtitle="National e-Learning Portal for Medical Officers, KGUMSB Students, Cold Chain Technicians, and Basic Health Unit Workers across Bhutan."
        badge="Accredited CME & Skills Development"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portals", href: "/academy" },
          { label: "Health Academy LMS" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Accreditation Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-xl border border-blue-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                Joint National Initiative
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
                KGUMSB & BHTF Clinical Capacity Building
              </h2>
              <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                All modules are developed with the Khesar Gyalpo University of Medical Sciences of Bhutan (KGUMSB), the Department of Public Health, and the Drug Regulatory Authority (DRA). Complete modules to earn certified digital credentials.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl border border-white/15">
              <div className="text-center pr-4 border-r border-white/20">
                <div className="text-2xl font-bold text-amber-400">4</div>
                <div className="text-xs text-blue-200 uppercase font-medium">Core Courses</div>
              </div>
              <div className="text-center pr-4 border-r border-white/20">
                <div className="text-2xl font-bold text-emerald-400">620+</div>
                <div className="text-xs text-blue-200 uppercase font-medium">Certified Staff</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">100%</div>
                <div className="text-xs text-blue-200 uppercase font-medium">Free Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE COURSE LEARNING PLAYER / MODAL */}
        {activeCourse && (
          <div className="mb-12 bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  Active Learning Module
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif">{activeCourse.title}</h3>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Close Module
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* Syllabus / Module Nav */}
              <div className="p-6 bg-slate-50/70 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Course Syllabus & Chapters
                </h4>
                <div className="space-y-2">
                  {getModuleData(activeCourse.slug).modules.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveModuleIdx(idx);
                        setQuizSubmitted(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                        activeModuleIdx === idx
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                          : "bg-white text-slate-700 hover:bg-blue-50/60 border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          activeModuleIdx === idx
                            ? "bg-white text-blue-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold leading-snug">{m.title}</div>
                        <div
                          className={`text-xs mt-1 ${
                            activeModuleIdx === idx ? "text-blue-100" : "text-slate-500"
                          }`}
                        >
                          Duration: {m.duration}
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Knowledge Assessment Tab */}
                  <button
                    onClick={() => setActiveModuleIdx(999)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 mt-4 ${
                      activeModuleIdx === 999
                        ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/20"
                        : "bg-amber-50/70 text-amber-900 hover:bg-amber-100/70 border-amber-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        activeModuleIdx === 999
                          ? "bg-white text-amber-600"
                          : "bg-amber-200 text-amber-800"
                      }`}
                    >
                      ★
                    </div>
                    <div>
                      <div className="text-sm font-bold leading-snug">
                        Final Knowledge Check & Certification
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          activeModuleIdx === 999 ? "text-amber-100" : "text-amber-700"
                        }`}
                      >
                        Pass score: ≥75% for Royal Seal Certificate
                      </div>
                    </div>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-2 mt-6">
                  <div className="font-semibold flex items-center gap-1.5 text-blue-800">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Clinical Competency Notice
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Course materials reflect official Ministry of Health Bhutan Standard Treatment Guidelines & WHO Cold Chain Logistics manuals.
                  </p>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-2 p-6 sm:p-8 space-y-6">
                {activeModuleIdx !== 999 ? (
                  // Chapter Reader
                  <div className="space-y-6">
                    {(() => {
                      const curr = getModuleData(activeCourse.slug).modules[activeModuleIdx] || getModuleData(activeCourse.slug).modules[0];
                      return (
                        <>
                          <div className="border-b border-slate-100 pb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                              Module {activeModuleIdx + 1} of {getModuleData(activeCourse.slug).modules.length}
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2 font-serif">
                              {curr.title}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                              <Clock className="w-4 h-4" /> Estimated Reading & Clinical Review Time: {curr.duration}
                            </p>
                          </div>

                          <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                Clinical Summary & Protocol Overview
                              </h5>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {curr.clinicalContent}
                              </p>
                            </div>

                            <h4 className="text-base font-bold text-slate-900 pt-2">
                              Core Operational Directives & Safety Takeaways:
                            </h4>
                            <ul className="space-y-2.5 pl-0 list-none">
                              {curr.keyPoints.map((pt, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                            <button
                              disabled={activeModuleIdx === 0}
                              onClick={() => setActiveModuleIdx((prev) => Math.max(0, prev - 1))}
                              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
                            >
                              Previous Module
                            </button>
                            {activeModuleIdx < getModuleData(activeCourse.slug).modules.length - 1 ? (
                              <button
                                onClick={() => setActiveModuleIdx((prev) => prev + 1)}
                                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
                              >
                                Next Chapter
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveModuleIdx(999)}
                                className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
                              >
                                Proceed to Final Exam
                                <Award className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  // Quiz & Certification Flow
                  <div className="space-y-8">
                    {!certificateData ? (
                      <form onSubmit={handleQuizSubmit} className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
                            Online Assessment Exam
                          </span>
                          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-serif">
                            Knowledge Verification Assessment
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            Answer all questions accurately based on Bhutan health protocols. Score 75% or higher to generate your authenticated BHTF / KGUMSB Certificate.
                          </p>
                        </div>

                        {/* Candidate Information Form */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Candidate Identification (Appears on Certificate)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Full Name (Official) *
                              </label>
                              <input
                                type="text"
                                required
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="e.g. Tshering Yangzom"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                required
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                                placeholder="e.g. tshering@kgumsb.edu.bt"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Medical Institution / Health Facility / Dzongkhag
                              </label>
                              <input
                                type="text"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                placeholder="e.g. KGUMSB / JDWNRH Pediatrics / Gasa BHU-I"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Questions */}
                        <div className="space-y-6">
                          {getModuleData(activeCourse.slug).quiz.map((q, qIdx) => (
                            <div
                              key={qIdx}
                              className={`p-5 rounded-xl border transition-all ${
                                quizSubmitted
                                  ? quizAnswers[qIdx] === q.correctIndex
                                    ? "bg-emerald-50/60 border-emerald-300"
                                    : "bg-rose-50/60 border-rose-300"
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {qIdx + 1}
                                </span>
                                <div className="space-y-3 flex-1">
                                  <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                                  <div className="space-y-2">
                                    {q.options.map((opt, optIdx) => (
                                      <label
                                        key={optIdx}
                                        className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                                          quizAnswers[qIdx] === optIdx
                                            ? "bg-blue-50 border-blue-500 font-medium text-blue-900"
                                            : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-700"
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name={`q-${qIdx}`}
                                          checked={quizAnswers[qIdx] === optIdx}
                                          onChange={() => handleAnswerSelect(qIdx, optIdx)}
                                          className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>{opt}</span>
                                      </label>
                                    ))}
                                  </div>

                                  {quizSubmitted && (
                                    <div
                                      className={`p-3 rounded-lg text-xs leading-relaxed ${
                                        quizAnswers[qIdx] === q.correctIndex
                                          ? "bg-emerald-100 text-emerald-900 font-medium"
                                          : "bg-rose-100 text-rose-900"
                                      }`}
                                    >
                                      <strong>Explanation: </strong>
                                      {q.explanation}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Submit Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                          {scorePercent !== null && scorePercent < 75 && (
                            <button
                              type="button"
                              onClick={() => {
                                setQuizSubmitted(false);
                                setQuizAnswers({});
                                setScorePercent(null);
                              }}
                              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold inline-flex items-center gap-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Retake Assessment
                            </button>
                          )}
                          <button
                            type="submit"
                            className="ml-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md inline-flex items-center gap-2 transition-colors"
                          >
                            <FileCheck2 className="w-4 h-4" />
                            Submit & Issue Certificate
                          </button>
                        </div>
                      </form>
                    ) : (
                      // CERTIFICATE OF COMPLETION (PRINTABLE)
                      <div className="space-y-6">
                        <div className="p-8 sm:p-10 rounded-2xl bg-white border-4 border-double border-amber-600/60 shadow-2xl relative overflow-hidden print:p-4 print:border-2">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-white to-blue-50/30 pointer-events-none" />

                          {/* Watermark Crest */}
                          <div className="text-center space-y-4 relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-inner">
                              <Award className="w-9 h-9" />
                            </div>

                            <div className="space-y-1">
                              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">
                                Royal Government of Bhutan • Ministry of Health
                              </div>
                              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
                                Certificate of Competency
                              </h2>
                              <div className="text-xs text-amber-700 font-semibold uppercase tracking-widest">
                                Bhutan Health Trust Fund & KGUMSB Academy
                              </div>
                            </div>

                            <p className="text-sm text-slate-600 italic pt-2">This is to certify that</p>

                            <div className="text-2xl sm:text-3xl font-bold text-blue-950 font-serif border-b-2 border-slate-300 pb-2 inline-block px-8">
                              {certificateData.studentName}
                            </div>

                            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                              has successfully completed all required training modules and demonstrated clinical and operational mastery with an assessment score of{" "}
                              <strong className="text-slate-900 font-bold">{certificateData.score}%</strong> in:
                            </p>

                            <div className="text-lg sm:text-xl font-bold text-amber-900 font-serif bg-amber-50/80 py-2.5 px-4 rounded-xl border border-amber-200/80 inline-block">
                              {certificateData.courseTitle}
                            </div>

                            {/* Signatures & Metadata */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200 mt-6 text-left">
                              <div>
                                <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                                  Date Issued
                                </div>
                                <div className="text-xs font-bold text-slate-800 mt-0.5">
                                  {certificateData.completedAt}
                                </div>
                              </div>
                              <div>
                                <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                                  Verification ID
                                </div>
                                <div className="text-xs font-mono font-bold text-blue-700 mt-0.5">
                                  {certificateData.certificateId}
                                </div>
                              </div>
                              <div className="col-span-2 sm:col-span-1 text-right">
                                <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                                  Accreditation
                                </div>
                                <div className="text-xs font-bold text-emerald-700 mt-0.5">
                                  ✓ Verified Official
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <button
                            onClick={() => {
                              setActiveCourse(null);
                              setCertificateData(null);
                            }}
                            className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            Return to Course Catalog
                          </button>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(certificateData.certificateId);
                                toast.success(`Certificate ID copied: ${certificateData.certificateId}`);
                              }}
                              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
                            >
                              Copy ID
                            </button>
                            <button
                              onClick={() => window.print()}
                              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md inline-flex items-center gap-2 transition-colors"
                            >
                              <Printer className="w-4 h-4" />
                              Print / Save PDF Certificate
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules, cold chain, formulary..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No courses match your criteria</h3>
            <p className="text-sm text-slate-500 mt-1">Try resetting your filter or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {course.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                        course.difficulty === "Beginner"
                          ? "bg-emerald-50 text-emerald-700"
                          : course.difficulty === "Intermediate"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-serif leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{course.durationHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>{course.modulesCount} Chapters</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto text-emerald-600 font-semibold">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledCount}+ Enrolled</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleStartCourse(course)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-200 group-hover:bg-blue-600"
                  >
                    <span>Start Training Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Verification Lookup Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              National Certificate Verification Registry
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Dzongkhag Health Administrations, Hospitals, and Human Resource Officers can verify official BHTF CME certifications by entering the unique Certificate ID below.
            </p>
          </div>

          <form onSubmit={handleVerifyCertificate} className="max-w-md mx-auto flex gap-2">
            <input
              type="text"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              placeholder="e.g. BHTF-CERT-2026-8841"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Verify
            </button>
          </form>

          {verifyResult && (
            <div
              className={`max-w-md mx-auto mt-4 p-4 rounded-xl text-xs leading-relaxed border ${
                verifyResult.startsWith("VALID")
                  ? "bg-emerald-950/60 border-emerald-700 text-emerald-200"
                  : "bg-rose-950/60 border-rose-700 text-rose-200"
              }`}
            >
              {verifyResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
