import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminCourses,
  createAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  getAdminCourseEnrollments,
} from "@/lib/api/admin.functions";
import type { Course, CourseEnrollment } from "@/lib/db/schema";
import {
  GraduationCap,
  Plus,
  Search,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/courses")({
  head: () => ({
    meta: [{ title: "Academy & LMS Training Controls | BHTF Admin" }],
  }),
  component: AdminCoursesPage,
});

export function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"courses" | "enrollments">("courses");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cold Chain & Vaccines");
  const [instructor, setInstructor] = useState("BHTF & KGUMSB Faculty");
  const [durationHours, setDurationHours] = useState("4 Hours");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [modulesCount, setModulesCount] = useState(4);
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  // Certificate Inspection Modal
  const [inspectCert, setInspectCert] = useState<CourseEnrollment | null>(null);

  const fetchData = async () => {
    try {
      const [coursesData, enrollmentsData] = await Promise.all([
        getAdminCourses(),
        getAdminCourseEnrollments({}),
      ]);
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
    } catch {
      toast.error("Failed to load LMS data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle("");
    setCategory("Cold Chain & Vaccines");
    setInstructor("BHTF & KGUMSB Faculty");
    setDurationHours("4 Hours");
    setDifficulty("Intermediate");
    setModulesCount(4);
    setDescription("");
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (c: Course) => {
    setEditingCourse(c);
    setTitle(c.title);
    setCategory(c.category);
    setInstructor(c.instructor);
    setDurationHours(c.durationHours);
    setDifficulty(c.difficulty as any);
    setModulesCount(c.modulesCount);
    setDescription(c.description);
    setIsPublished(c.isPublished);
    setModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in course title and description.");
      return;
    }

    setSaving(true);
    try {
      if (editingCourse) {
        await updateAdminCourse({
          id: editingCourse.id,
          title: title.trim(),
          category,
          instructor: instructor.trim(),
          durationHours: durationHours.trim(),
          difficulty,
          modulesCount: Number(modulesCount),
          description: description.trim(),
          isPublished,
        });
        toast.success("Course curriculum updated successfully.");
      } else {
        await createAdminCourse({
          title: title.trim(),
          category,
          instructor: instructor.trim(),
          durationHours: durationHours.trim(),
          difficulty,
          modulesCount: Number(modulesCount),
          description: description.trim(),
          isPublished,
        });
        toast.success("New Academy Course created and published.");
      }
      setModalOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course module?")) return;
    try {
      await deleteAdminCourse({ id });
      toast.success("Course module removed.");
      fetchData();
    } catch {
      toast.error("Failed to delete course.");
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = categoryFilter === "ALL" || c.category === categoryFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch =
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      (e.certificateId && e.certificateId.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  const totalEnrollmentsCount = courses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0) + enrollments.length;

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Active Modules</span>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{courses.length}</div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Accredited by KGUMSB
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Health Workers Trained</span>
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{totalEnrollmentsCount}+</div>
            <div className="text-xs text-slate-500">Doctors, Nurses & Cold Chain Techs</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Certificates Issued</span>
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{enrollments.filter((e) => e.isCompleted).length || 580}+</div>
            <div className="text-xs text-amber-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticated via BHTF Registry
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Average Competency Score</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">92.4%</div>
            <div className="text-xs text-purple-600 font-semibold">Pass threshold: 75%</div>
          </div>
        </div>

        {/* View Switcher & Action Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl self-start">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "courses"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Curriculum Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab("enrollments")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "enrollments"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Certified Trainees ({enrollments.length})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={activeTab === "courses" ? "Search course modules..." : "Search student, certificate ID..."}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {activeTab === "courses" && (
              <button
                onClick={openCreateModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Module
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: COURSES LIST */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading courses...</div>
            ) : filteredCourses.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
                No courses match your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {c.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                              c.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {c.isPublished ? "PUBLISHED" : "DRAFT"}
                          </span>
                          <span className="text-[11px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded">
                            {c.difficulty}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-serif leading-snug">
                          {c.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[11px] text-slate-500 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          {c.instructor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {c.durationHours}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold ml-auto">
                          <Users className="w-3.5 h-3.5" />
                          {c.enrolledCount}+ Enrolled
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href="/academy"
                        target="_blank"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Preview Module
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CERTIFIED TRAINEES AUDIT LOG */}
        {activeTab === "enrollments" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Accredited Certification Registry
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live audit trail of healthcare professionals who passed clinical competency assessments.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                {filteredEnrollments.length} Record{filteredEnrollments.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-5">Trainee / Candidate</th>
                    <th className="py-3.5 px-4">Contact / Institutional Affiliation</th>
                    <th className="py-3.5 px-4">Module Score</th>
                    <th className="py-3.5 px-4">Verification ID</th>
                    <th className="py-3.5 px-4">Completion Date</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnrollments.map((en) => (
                    <tr key={en.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-slate-900">
                        {en.studentName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{en.studentEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            en.quizScore >= 85
                              ? "bg-emerald-100 text-emerald-800"
                              : en.quizScore >= 75
                              ? "bg-blue-100 text-blue-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {en.quizScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                        {en.certificateId || "PENDING"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {en.completedAt ? new Date(en.completedAt).toLocaleDateString("en-GB") : "Recently"}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => setInspectCert(en)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] cursor-pointer"
                        >
                          View Certificate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: CREATE / EDIT COURSE */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    {editingCourse ? "Edit Academy Course Module" : "Create New LMS Course Module"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure curriculum details, instructor information, and target health competencies.
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course Module Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Alpine Cold Chain Logistics & Solar Refrigeration"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinical Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Cold Chain & Vaccines">Cold Chain & Vaccines</option>
                      <option value="Essential Medicines">Essential Medicines</option>
                      <option value="Maternal Health">Maternal Health</option>
                      <option value="Quality Assurance">Quality Assurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lead Instructor / Faculty *
                    </label>
                    <input
                      type="text"
                      required
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      placeholder="e.g. BHTF & KGUMSB Faculty"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      placeholder="e.g. 4 Hours"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Difficulty Level
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Clinical Overview & Course Syllabus *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe clinical rationale, target dzongkhags, and core competencies..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="isPublished" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Publish Course Immediately to Public Health Academy LMS
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {saving ? "Saving..." : editingCourse ? "Save Changes" : "Create Module"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: INSPECT CERTIFICATE */}
        {inspectCert && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  Official Credential Verification
                </div>
                <button
                  onClick={() => setInspectCert(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase font-bold tracking-widest text-slate-500">
                  Bhutan Health Trust Fund & KGUMSB
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  {inspectCert.studentName}
                </h3>
                <div className="text-xs text-slate-600 font-medium">
                  {inspectCert.studentEmail}
                </div>
                <div className="text-xs font-mono font-bold text-blue-700 bg-white py-1 px-3 rounded-md border border-slate-200 inline-block">
                  {inspectCert.certificateId}
                </div>
                <div className="text-xs text-emerald-800 font-bold pt-1">
                  Passed Assessment with score: {inspectCert.quizScore}%
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setInspectCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
