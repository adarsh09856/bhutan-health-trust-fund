import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useConfirmation } from "@/components/confirmation-provider";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  deleteAdminInquiry,
  createAdminMembershipApplication,
  getAdminMembershipApplications,
  updateAdminMembershipApplication,
  updateInquiryStatus,
} from "@/lib/api/admin.functions";
import type { Inquiry } from "@/lib/db/schema";
import {
  CalendarDays,
  Eye,
  LoaderCircle,
  Mail,
  Plus,
  Save,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/memberships")({
  head: () => ({ meta: [{ title: "Membership Applications | BHTF Admin" }] }),
  component: MembershipApplicationsPage,
});

const statusOrder = ["UNREAD", "IN_PROGRESS", "REPLIED", "ARCHIVED"] as const;
type ApplicationStatus = (typeof statusOrder)[number];
type MembershipDraft = {
  type: "INDIVIDUAL" | "INSTITUTIONAL";
  applicantName: string;
  organizationName: string;
  designation: string;
  email: string;
  phone: string;
  dzongkhag: string;
  notes: string;
};
const emptyDraft: MembershipDraft = {
  type: "INDIVIDUAL",
  applicantName: "",
  organizationName: "",
  designation: "",
  email: "",
  phone: "",
  dzongkhag: "Thimphu",
  notes: "",
};

function messageField(message: string, label: string) {
  return message.match(new RegExp(`^${label}:\\s*(.*)$`, "mi"))?.[1]?.trim() || "";
}

function MembershipApplicationsPage() {
  const confirm = useConfirmation();
  const [applications, setApplications] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [draft, setDraft] = useState<MembershipDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    try {
      setApplications(await getAdminMembershipApplications());
    } catch {
      toast.error("Could not load membership applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const filtered = useMemo(
    () =>
      applications.filter((application) => {
        const matchesSearch =
          `${application.name} ${application.email} ${application.subject} ${application.message}`
            .toLowerCase()
            .includes(search.trim().toLowerCase());
        return matchesSearch && (statusFilter === "ALL" || application.status === statusFilter);
      }),
    [applications, search, statusFilter],
  );

  const openApplication = (application: Inquiry) => {
    setSelected(application);
    setNotes(application.replyNotes || "");
    const type =
      application.channel === "MEMBERSHIP_INSTITUTIONAL" ? "INSTITUTIONAL" : "INDIVIDUAL";
    setDraft({
      type,
      applicantName: messageField(application.message, "Applicant / contact") || application.name,
      organizationName: messageField(application.message, "Organization"),
      designation: messageField(application.message, "Contact role"),
      email: application.email,
      phone: messageField(application.message, "Phone"),
      dzongkhag: messageField(application.message, "Dzongkhag") || "Thimphu",
      notes: messageField(application.message, "Additional information"),
    });
  };

  const startNewApplication = () => {
    setDraft(emptyDraft);
    setNotes("");
    setSelected({
      id: -1,
      name: "New membership application",
      email: "",
      subject: "New membership application",
      message: "",
      status: "UNREAD",
      replyNotes: null,
      channel: "MEMBERSHIP_INDIVIDUAL",
      loggedBy: "BHTF Secretariat Admin",
      createdAt: new Date(),
    });
  };

  const saveApplication = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      if (selected.id < 0) {
        await createAdminMembershipApplication({ data: draft });
        toast.success("Membership application created.");
      } else {
        await updateAdminMembershipApplication({ data: { id: selected.id, ...draft } });
        await updateInquiryStatus({
          data: {
            id: selected.id,
            status: selected.status as ApplicationStatus,
            replyNotes: notes,
          },
        });
        toast.success("Membership application updated.");
      }
      setSelected(null);
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this application.");
    } finally {
      setSaving(false);
    }
  };

  const saveStatus = async (status: ApplicationStatus) => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateInquiryStatus({ data: { id: selected.id, status, replyNotes: notes } });
      toast.success("Application record updated.");
      setSelected(null);
      await refresh();
    } catch {
      toast.error("Could not update this application.");
    } finally {
      setSaving(false);
    }
  };

  const removeApplication = async (application: Inquiry) => {
    if (!(await confirm(`Delete the application from ${application.name}?`))) return;
    try {
      await deleteAdminInquiry({ data: { id: application.id } });
      if (selected?.id === application.id) setSelected(null);
      toast.success("Application removed.");
      await refresh();
    } catch {
      toast.error("Could not delete this application.");
    }
  };

  const getType = (application: Inquiry) =>
    application.channel === "MEMBERSHIP_INSTITUTIONAL" ? "Institutional" : "Individual";
  const getReference = (application: Inquiry) =>
    application.message.match(/BHTF-MEM-[A-Z]+-[A-Z0-9-]+/)?.[0] ||
    `Application #${application.id}`;

  return (
    <AdminShell>
      <div className="space-y-6 pb-12">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Secretariat review
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
              Membership applications
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Review submissions, record follow-up notes, and track each application.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-slate-700">{applications.length} total</p>
            <button
              type="button"
              onClick={startNewApplication}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-950"
            >
              <Plus className="size-4" /> New application
            </button>
          </div>
        </header>

        <section
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Application counts"
        >
          {[
            ["New", applications.filter((a) => a.status === "UNREAD").length],
            ["Under review", applications.filter((a) => a.status === "IN_PROGRESS").length],
            ["Contacted", applications.filter((a) => a.status === "REPLIED").length],
            ["Closed", applications.filter((a) => a.status === "ARCHIVED").length],
          ].map(([label, count]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">{label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-slate-950">{count}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
          <label className="flex min-h-11 flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3">
            <Search className="size-4 shrink-0 text-slate-500" aria-hidden="true" />
            <span className="sr-only">Search applications</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, reference"
              className="w-full bg-transparent text-base outline-none"
            />
          </label>
          <label className="min-h-11 sm:w-56">
            <span className="sr-only">Filter by application status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-full min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-800"
            >
              <option value="ALL">All statuses</option>
              <option value="UNREAD">New</option>
              <option value="IN_PROGRESS">Under review</option>
              <option value="REPLIED">Contacted</option>
              <option value="ARCHIVED">Closed</option>
            </select>
          </label>
        </section>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center gap-2 text-slate-600">
            <LoaderCircle className="size-5 animate-spin" /> Loading applications…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            {applications.length === 0
              ? "No membership applications have been received."
              : "No applications match these filters."}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Applicant</th>
                    <th className="px-4 py-3">Type / reference</th>
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((application) => (
                    <tr key={application.id} className="align-top hover:bg-slate-50/70">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-950">{application.name}</p>
                        <a
                          href={`mailto:${application.email}`}
                          className="text-sm text-emerald-800 underline underline-offset-2"
                        >
                          {application.email}
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-800">{getType(application)}</p>
                        <p className="mt-1 break-all font-mono text-xs text-slate-500">
                          {getReference(application)}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => openApplication(application)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 font-semibold text-white hover:bg-slate-800"
                        >
                          <Eye className="size-4" /> Review
                        </button>
                        <button
                          type="button"
                          onClick={() => void removeApplication(application)}
                          aria-label={`Delete application from ${application.name}`}
                          className="ml-2 inline-grid size-10 place-items-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-700"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-review-title"
            className="my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {selected.id < 0
                    ? "New membership application"
                    : `${getType(selected)} membership · ${getReference(selected)}`}
                </p>
                <h2 id="membership-review-title" className="mt-1 text-xl font-bold text-slate-950">
                  {selected.id < 0 ? "Create application record" : selected.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close application"
                className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Application type">
                <select
                  value={draft.type}
                  onChange={(e) =>
                    setDraft({ ...draft, type: e.target.value as MembershipDraft["type"] })
                  }
                  className={fieldClass}
                >
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="INSTITUTIONAL">Institutional</option>
                </select>
              </Field>
              {draft.type === "INSTITUTIONAL" && (
                <Field label="Organization name">
                  <input
                    required
                    value={draft.organizationName}
                    onChange={(e) => setDraft({ ...draft, organizationName: e.target.value })}
                    className={fieldClass}
                  />
                </Field>
              )}
              <Field label={draft.type === "INSTITUTIONAL" ? "Contact person" : "Full name"}>
                <input
                  required
                  value={draft.applicantName}
                  onChange={(e) => setDraft({ ...draft, applicantName: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              {draft.type === "INSTITUTIONAL" && (
                <Field label="Role or designation">
                  <input
                    value={draft.designation}
                    onChange={(e) => setDraft({ ...draft, designation: e.target.value })}
                    className={fieldClass}
                  />
                </Field>
              )}
              <Field label="Email">
                <input
                  type="email"
                  required
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  value={draft.phone}
                  onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              <Field label="Dzongkhag">
                <input
                  required
                  value={draft.dzongkhag}
                  onChange={(e) => setDraft({ ...draft, dzongkhag: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              <Field label="Additional information">
                <textarea
                  rows={3}
                  value={draft.notes}
                  onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              <Field label="Internal notes and follow-up record">
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={fieldClass}
                />
              </Field>
              {selected.id >= 0 && (
                <div className="flex items-end text-sm text-slate-500">
                  <CalendarDays className="mr-2 size-4" /> Received{" "}
                  {new Date(selected.createdAt).toLocaleString()}
                </div>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => void saveApplication()}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2 font-semibold text-white hover:bg-emerald-950 disabled:opacity-50"
              >
                <Save className="size-4" />{" "}
                {selected.id < 0 ? "Create application" : "Save changes"}
              </button>
            </div>
            {selected.id >= 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                {statusOrder.map((status) => {
                  const isEarlier =
                    statusOrder.indexOf(status) <
                    statusOrder.indexOf(selected.status as ApplicationStatus);
                  return (
                    <button
                      key={status}
                      type="button"
                      disabled={saving || isEarlier}
                      onClick={() => void saveStatus(status)}
                      className="min-h-10 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {statusLabel(status)}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </AdminShell>
  );
}

function statusLabel(status: ApplicationStatus) {
  return {
    UNREAD: "Mark new",
    IN_PROGRESS: "Mark under review",
    REPLIED: "Mark contacted",
    ARCHIVED: "Close application",
  }[status];
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-900">
      {status === "UNREAD"
        ? "NEW"
        : status === "IN_PROGRESS"
          ? "UNDER REVIEW"
          : status === "REPLIED"
            ? "CONTACTED"
            : "CLOSED"}
    </span>
  );
}

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 bg-white p-3 text-base font-normal text-slate-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      {children}
    </div>
  );
}
