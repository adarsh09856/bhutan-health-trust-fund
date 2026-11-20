import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { submitMembershipApplication } from "@/lib/api/public.functions";
import { useLanguage } from "@/lib/i18n/language-context";

type MembershipType = "INSTITUTIONAL" | "INDIVIDUAL";

const dzongkhags = [
  "Bumthang",
  "Chhukha",
  "Dagana",
  "Gasa",
  "Haa",
  "Lhuentse",
  "Mongar",
  "Paro",
  "Pema Gatshel",
  "Punakha",
  "Samdrup Jongkhar",
  "Samtse",
  "Sarpang",
  "Thimphu",
  "Trashigang",
  "Trashiyangtse",
  "Trongsa",
  "Tsirang",
  "Wangdue Phodrang",
  "Zhemgang",
];

export function MembershipApplicationForm({ type }: { type: MembershipType }) {
  const { isDzongkha } = useLanguage();
  const [applicantName, setApplicantName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dzongkhag, setDzongkhag] = useState("Thimphu");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const isInstitutional = type === "INSTITUTIONAL";
  const title = isInstitutional
    ? isDzongkha
      ? "ལས་ཚོགས་འཐུས་མི།"
      : "Institutional Membership"
    : isDzongkha
      ? "སྒེར་གྱི་འཐུས་མི།"
      : "Individual Membership";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!confirmed) {
      setError(
        isDzongkha
          ? "གནས་ཚུལ་ངེས་གཏན་བཟོ་གནང་།"
          : "Please confirm the information is accurate before submitting.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitMembershipApplication({
        data: {
          type,
          applicantName,
          organizationName: isInstitutional ? organizationName : undefined,
          designation: isInstitutional ? designation : undefined,
          email,
          phone,
          dzongkhag,
          notes,
          website,
        },
      });
      setReferenceNo(result.referenceNo);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : isDzongkha
            ? "ཞུ་ཡིག་ཕུལ་མ་ཚུགས། སླར་ཚར་གཅིག་འབད་གནང་།"
            : "We could not submit your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#FAF8F3] pb-16 sm:pb-20">
      <PageHero title={title} breadcrumb={[{ label: title }]} />
      <main className="container-page py-8 sm:py-12">
        {referenceNo ? (
          <section
            className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-white p-6 sm:p-9 shadow-sm"
            aria-live="polite"
          >
            <CheckCircle2 className="size-10 text-emerald-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {isDzongkha ? "ཞུ་ཡིག་འབྱོར་ཡོད།" : "Application received"}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-700">
              {isDzongkha
                ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱིས་ཁྱེད་ཀྱི་ཞུ་ཡིག་ཐོ་བཀོད་འབད་ཡོད།"
                : "The Secretariat has received your membership application."}
            </p>
            <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
              {isDzongkha ? "ཞུ་ཡིག་ཨང་། " : "Application reference: "}
              <span className="font-semibold text-slate-950">{referenceNo}</span>
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-emerald-900 px-5 py-2.5 font-semibold text-white hover:bg-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              {isDzongkha ? "ཁྱིམ་ཤོག་ལུ་ལོག" : "Return home"}
            </Link>
          </section>
        ) : (
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-700">
              {isDzongkha
                ? "འོག་གི་གནས་ཚུལ་བཀང་སྟེ་ཞུ་ཡིག་ཕུལ་གནང་། དྲུང་ཆེན་ཡིག་ཚང་གིས་བསྐྱར་ཞིབ་འབད་འོང་།"
                : "Complete this form to submit your application for review by the Bhutan Health Trust Fund Secretariat."}
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm"
            >
              {isInstitutional && (
                <Field label={isDzongkha ? "ལས་ཚོགས་ཀྱི་མིང་།" : "Organization name"} required>
                  <input
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                    maxLength={160}
                    autoComplete="organization"
                    className={inputClass}
                  />
                </Field>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={
                    isInstitutional
                      ? isDzongkha
                        ? "འབྲེལ་གཏུག་པའི་མིང་།"
                        : "Contact person"
                      : isDzongkha
                        ? "མིང་ཆ་ཚང་།"
                        : "Full name"
                  }
                  required
                >
                  <input
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    maxLength={120}
                    autoComplete="name"
                    className={inputClass}
                  />
                </Field>
                {isInstitutional && (
                  <Field label={isDzongkha ? "ལས་འགན་ (གདམ་ཁ།)" : "Role or designation (optional)"}>
                    <input
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      maxLength={120}
                      autoComplete="organization-title"
                      className={inputClass}
                    />
                  </Field>
                )}
                <Field label={isDzongkha ? "གློག་འཕྲིན།" : "Email address"} required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={254}
                    autoComplete="email"
                    className={inputClass}
                  />
                </Field>
                <Field label={isDzongkha ? "ཁ་པར་ཨང་།" : "Phone number"} required>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    minLength={6}
                    maxLength={32}
                    autoComplete="tel"
                    className={inputClass}
                  />
                </Field>
                <Field label={isDzongkha ? "རྫོང་ཁག" : "Dzongkhag"} required>
                  <select
                    value={dzongkhag}
                    onChange={(e) => setDzongkhag(e.target.value)}
                    className={inputClass}
                  >
                    {dzongkhags.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label={
                  isDzongkha ? "གནས་ཚུལ་ཁ་སྐོང་ (གདམ་ཁ།)" : "Additional information (optional)"
                }
              >
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={1200}
                  rows={4}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed text-slate-700">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 size-4 shrink-0 accent-emerald-800"
                />
                <span>
                  {isDzongkha
                    ? "ང་གིས་བཀང་བའི་གནས་ཚུལ་འདི་བདེན་པ་ཨིནམ་ངེས་གཏན་བཟོཝ་ཨིན།"
                    : "I confirm that the information provided is accurate and may be used to follow up on this application."}
                </span>
              </label>

              <div
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor={`website-${type}`}>Leave this field empty</label>
                <input
                  id={`website-${type}`}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-950 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {isDzongkha ? "ཞུ་ཡིག་ཕུལ།" : submitting ? "Submitting…" : "Submit application"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      {label}
      {required && (
        <span aria-hidden="true" className="ml-1 text-rose-700">
          *
        </span>
      )}
      {children}
    </label>
  );
}
