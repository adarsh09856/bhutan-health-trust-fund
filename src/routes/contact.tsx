import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { submitContactInquiry } from "@/lib/api/public.functions";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Bhutan Health Trust Fund" },
      { name: "description", content: "Get in touch with the Bhutan Health Trust Fund Secretariat in Kawajangsa, Thimphu." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitContactInquiry({
        data: { name, email, subject, message },
      });

      if (res.success) {
        setSubmitted(true);
        toast.success("Your message has been securely submitted to the Secretariat.");
      }
    } catch {
      toast.error("Failed to submit inquiry. Please try again or contact us via email.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We welcome inquiries, feedback, and collaboration proposals from citizens, medical institutions, and global partners."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {[
            {
              icon: MapPin,
              label: "Secretariat Headquarters",
              text: "Kawajangsa, Thimphu, Kingdom of Bhutan",
              sub: "Adjacent to Ministry of Health",
            },
            {
              icon: Phone,
              label: "Telephone Desk",
              text: "+975 2 328999 / +975 2 334567",
              sub: "Toll-Free within Bhutan available",
            },
            {
              icon: Mail,
              label: "Official Inquiries",
              text: "info@bhtf.bt",
              sub: "Replies typically within 2 working days",
            },
            {
              icon: Clock,
              label: "Working Hours",
              text: "Mon–Fri · 9:00 AM – 5:00 PM (BTT)",
              sub: "Closed on National Holidays",
            },
          ].map((c) => (
            <div key={c.label} className="bg-white border rounded-xl p-5 flex items-start gap-4 shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-primary text-sm">{c.label}</div>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{c.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Box */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-primary mb-1">Send a Message to the Secretariat</h2>
          <p className="text-xs text-muted-foreground mb-6">
            All inquiries are directly logged into our administrative inquiry management system.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">Inquiry Received Successfully!</h3>
                <p className="text-sm text-emerald-700 mt-1 max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{name}</span>. Your inquiry regarding "{subject}" has been registered. Our secretariat staff will get back to you at <span className="font-semibold">{email}</span> within two business days.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tshering Dorji"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tshering@example.com"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Inquiry Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Inquiry regarding rural clinic vaccine supply"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please write your detailed message or question here..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}