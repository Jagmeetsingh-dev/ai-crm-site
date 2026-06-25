import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarClock,
  Moon,
  Sun,
  UserRound,
  Building2,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/utils";
import {
  CURRENT_TOOLS,
  INDUSTRIES,
  LEAD_VOLUMES,
  LINKS,
  PRICING,
  TEAM_SIZES,
} from "../landing/constants";
import { ChoiceChips, SelectField, TextField } from "../landing/components/ui/Field";
import { VoltageButton } from "../landing/components/ui/Button";
import { BookDemo } from "./BookDemo";

/* -------------------------------------------------------------------------- */
/* Form state + validation                                                    */
/* -------------------------------------------------------------------------- */

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  teamSize: string;
  website: string;
  currentTool: string;
  plan: string;
  leadVolume: string;
  password: string;
  agree: boolean;
};

const EMPTY: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  teamSize: "",
  website: "",
  currentTool: "",
  plan: "Pro",
  leadVolume: "",
  password: "",
  agree: false,
};

type Errors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  { key: "you", label: "You", icon: UserRound },
  { key: "business", label: "Business", icon: Building2 },
  { key: "finish", label: "Finish", icon: Sparkles },
] as const;

function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!data.fullName.trim()) e.fullName = "Your name helps us set up your account.";
    if (!data.email.trim()) e.email = "We'll send your login here.";
    else if (!EMAIL_RE.test(data.email)) e.email = "That email doesn't look quite right.";
  }
  if (step === 1) {
    if (!data.company.trim()) e.company = "What's the name of your business?";
    if (!data.industry) e.industry = "Pick the closest match.";
    if (!data.teamSize) e.teamSize = "Roughly how many people will use it?";
  }
  if (step === 2) {
    if (!data.password) e.password = "Create a password to secure your account.";
    else if (data.password.length < 8) e.password = "Use at least 8 characters.";
    if (!data.agree) e.agree = "Please accept the terms to continue.";
  }
  return e;
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

function SignupHeader() {
  const { theme, toggle } = useTheme();
  return (
    <header className="border-b border-mist/70 dark:border-bark">
      <div className="page-shell flex h-[68px] items-center justify-between">
        <Link to="/" className="font-twk-lausanne text-[15px] font-semibold" aria-label="AI CRM — home">
          <span className="text-obsidian-ink dark:text-linen">AI</span>
          <span className="text-voltage">CRM</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-twk-lausanne text-[14px] font-[350] text-obsidian-ink/80 underline-offset-4 hover:underline dark:text-linen/80"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Back to site
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] text-obsidian-ink hover:bg-pollen/40 dark:text-linen dark:hover:bg-bark"
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Stepper                                                                     */
/* -------------------------------------------------------------------------- */

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key} className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full border font-twk-lausanne text-[13px]",
                done && "border-voltage bg-voltage text-obsidian-ink",
                active && "border-obsidian-ink text-obsidian-ink dark:border-linen dark:text-linen",
                !done && !active && "border-mist text-sage dark:border-bark dark:text-moss-glow"
              )}
            >
              {done ? <Check size={15} aria-hidden="true" /> : i + 1}
            </span>
            <span
              className={cn(
                "font-twk-lausanne text-[13px]",
                active ? "text-obsidian-ink dark:text-linen" : "text-sage dark:text-moss-glow"
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px w-6 bg-mist dark:bg-bark" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* Success                                                                     */
/* -------------------------------------------------------------------------- */

function SuccessPanel({ data, onBookCall }: { data: FormData; onBookCall: () => void }) {
  return (
    <div>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-voltage text-obsidian-ink">
        <Check size={24} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h2 className="heading-sm mt-6 text-obsidian-ink dark:text-linen">
        You're in, {data.fullName.split(" ")[0] || "there"}.
      </h2>
      <p className="mt-4 max-w-[48ch] font-twk-lausanne text-[16px] font-[350] leading-relaxed text-obsidian-ink/80 dark:text-linen/80">
        Your <span className="text-obsidian-ink dark:text-linen">{data.plan}</span> workspace for{" "}
        <span className="text-obsidian-ink dark:text-linen">{data.company || "your business"}</span>{" "}
        is ready to set up. We've noted your details — next, confirm your email and import your first
        leads.
      </p>

      <ul className="mt-7 flex flex-col gap-3">
        {[
          "Check your inbox to confirm your email.",
          "Add or import your first leads.",
          "Run the AI assistant on a lead in one click.",
        ].map((line) => (
          <li key={line} className="flex gap-2.5">
            <Check size={17} strokeWidth={2.25} className="mt-0.5 shrink-0 text-voltage" aria-hidden="true" />
            <span className="font-twk-lausanne text-[15px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
              {line}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <VoltageButton href={LINKS.login}>Go to your workspace</VoltageButton>
        <button type="button" onClick={onBookCall} className="btn-ghost">
          <CalendarClock size={16} aria-hidden="true" /> Book an onboarding call
        </button>
      </div>

      <p className="mt-6 font-times text-[13px] italic text-sage dark:text-moss-glow">
        Demo build — no account is actually created. Wire this form's submit to your signup API to go
        live.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

type Mode = "signup" | "book";

export default function SignUpPage() {
  const { theme } = useTheme();
  const [params] = useSearchParams();

  const initialPlan = useMemo(() => {
    const p = params.get("plan");
    const match = PRICING.tiers.find((t) => t.id === p?.toLowerCase());
    return match?.name ?? "Pro";
  }, [params]);

  const [mode, setMode] = useState<Mode>(params.get("book") ? "book" : "signup");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({ ...EMPTY, plan: initialPlan });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const goNext = () => {
    const e = validateStep(step, data);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validateStep(step, data);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    // No backend in this static build — surface a success state.
    setSubmitted(true);
  };

  const planNames = PRICING.tiers.map((t) => t.name);

  return (
    <div className="min-h-screen bg-linen text-obsidian-ink dark:bg-obsidian-ink dark:text-linen">
      <SignupHeader />

      <main className="page-shell grid gap-12 py-[50px] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16 md:py-[70px]">
        {/* LEFT: form / booking */}
        <section>
          {/* Mode toggle */}
          <div
            role="tablist"
            aria-label="Get started"
            className="inline-flex items-center gap-1 rounded-[10px] border border-mist/80 p-1 dark:border-bark"
          >
            {([
              { id: "signup", label: "Create account" },
              { id: "book", label: "Book a demo" },
            ] as const).map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={mode === t.id}
                onClick={() => setMode(t.id)}
                className={cn(
                  "rounded-[6px] px-4 py-2 font-twk-lausanne text-[13px] transition-colors",
                  mode === t.id
                    ? "bg-voltage text-obsidian-ink"
                    : "text-obsidian-ink/70 hover:text-obsidian-ink dark:text-linen/70 dark:hover:text-linen"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {mode === "book" ? (
            <div className="mt-8">
              <p className="eyebrow">Talk to us first</p>
              <h1 className="heading-sm mt-3 text-obsidian-ink dark:text-linen">
                Book a 20-minute demo.
              </h1>
              <p className="mt-4 max-w-[46ch] font-twk-lausanne text-[16px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
                Pick a time that works and we'll walk your team through the pipeline, the AI
                assistant, and setup — no slides, just the product.
              </p>
              <div className="mt-7">
                <BookDemo theme={theme} />
              </div>
            </div>
          ) : submitted ? (
            <div className="mt-8">
              <SuccessPanel data={data} onBookCall={() => setMode("book")} />
            </div>
          ) : (
            <div className="mt-8">
              <p className="eyebrow">Start free — no credit card</p>
              <h1 className="heading-sm mt-3 text-obsidian-ink dark:text-linen">
                Create your workspace.
              </h1>

              <div className="mt-7">
                <Stepper current={step} />
              </div>

              <form onSubmit={submit} className="mt-8" noValidate>
                {/* STEP 1 — You */}
                {step === 0 && (
                  <div className="flex flex-col gap-5">
                    <TextField
                      label="Full name"
                      value={data.fullName}
                      onChange={(v) => set("fullName", v)}
                      placeholder="Jordan Rivera"
                      autoComplete="name"
                      error={errors.fullName}
                    />
                    <TextField
                      label="Work email"
                      type="email"
                      value={data.email}
                      onChange={(v) => set("email", v)}
                      placeholder="jordan@yourbusiness.com"
                      autoComplete="email"
                      error={errors.email}
                    />
                    <TextField
                      label="Phone"
                      type="tel"
                      value={data.phone}
                      onChange={(v) => set("phone", v)}
                      placeholder="(555) 012-3456"
                      autoComplete="tel"
                      optional
                      hint="For onboarding only"
                    />
                  </div>
                )}

                {/* STEP 2 — Business */}
                {step === 1 && (
                  <div className="flex flex-col gap-5">
                    <TextField
                      label="Business name"
                      value={data.company}
                      onChange={(v) => set("company", v)}
                      placeholder="Rivera Realty Group"
                      autoComplete="organization"
                      error={errors.company}
                    />
                    <SelectField
                      label="Industry"
                      value={data.industry}
                      onChange={(v) => set("industry", v)}
                      options={INDUSTRIES}
                      error={errors.industry}
                    />
                    <ChoiceChips
                      label="Team size"
                      value={data.teamSize}
                      onChange={(v) => set("teamSize", v)}
                      options={TEAM_SIZES}
                    />
                    {errors.teamSize && (
                      <p role="alert" className="-mt-2 font-twk-lausanne text-[13px] font-[500] text-obsidian-ink dark:text-linen">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-voltage align-middle" aria-hidden="true" />
                        {errors.teamSize}
                      </p>
                    )}
                    <TextField
                      label="Website"
                      type="url"
                      value={data.website}
                      onChange={(v) => set("website", v)}
                      placeholder="https://yourbusiness.com"
                      autoComplete="url"
                      optional
                    />
                    <SelectField
                      label="What are you using today?"
                      value={data.currentTool}
                      onChange={(v) => set("currentTool", v)}
                      options={CURRENT_TOOLS}
                      optional
                    />
                  </div>
                )}

                {/* STEP 3 — Finish */}
                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <ChoiceChips
                      label="Choose your plan"
                      value={data.plan}
                      onChange={(v) => set("plan", v)}
                      options={planNames}
                    />
                    <SelectField
                      label="Roughly how many leads a month?"
                      value={data.leadVolume}
                      onChange={(v) => set("leadVolume", v)}
                      options={LEAD_VOLUMES}
                      optional
                    />
                    <TextField
                      label="Create a password"
                      type="password"
                      value={data.password}
                      onChange={(v) => set("password", v)}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      hint="8+ characters"
                      error={errors.password}
                    />
                    <div>
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={data.agree}
                          onChange={(e) => set("agree", e.target.checked)}
                          aria-invalid={!!errors.agree}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-voltage"
                        />
                        <span className="font-twk-lausanne text-[14px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
                          I agree to the Terms of Service and Privacy Policy, and to receive product
                          updates.
                        </span>
                      </label>
                      {errors.agree && (
                        <p role="alert" className="mt-1.5 font-twk-lausanne text-[13px] font-[500] text-obsidian-ink dark:text-linen">
                          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-voltage align-middle" aria-hidden="true" />
                          {errors.agree}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="mt-9 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="btn-ghost"
                    >
                      <ArrowLeft size={15} aria-hidden="true" /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={goNext} className="btn-voltage">
                      Continue <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" className="btn-voltage">
                      Create account <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>

              <p className="mt-6 font-twk-lausanne text-[14px] font-[350] text-sage dark:text-moss-glow">
                Already have an account?{" "}
                <Link to={LINKS.login} className="text-obsidian-ink underline underline-offset-4 dark:text-linen">
                  Log in
                </Link>
              </p>
            </div>
          )}
        </section>

        {/* RIGHT: reassurance panel */}
        <aside className="md:pt-[52px]">
          <div className="rounded-[14px] bg-pollen/25 p-7 dark:bg-bark/50">
            <span className="tick" aria-hidden="true" />
            <h2 className="mt-5 font-twk-lausanne text-[18px] font-[500] text-obsidian-ink dark:text-linen">
              What you get, free
            </h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {[
                "Drag-and-drop pipeline with 7 stages",
                "A dashboard that tells the truth",
                "AI assistant in free mock mode",
                "Demo data included — explore in minutes",
                "Light & dark mode",
              ].map((line) => (
                <li key={line} className="flex gap-2.5">
                  <Check size={17} strokeWidth={2.25} className="mt-0.5 shrink-0 text-voltage" aria-hidden="true" />
                  <span className="font-twk-lausanne text-[15px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-mist/70 pt-6 dark:border-bark">
              <p className="font-twk-lausanne text-[14px] font-[350] text-obsidian-ink/75 dark:text-linen/75">
                Prefer a guided walkthrough?
              </p>
              <button
                type="button"
                onClick={() => setMode("book")}
                className="btn-ghost mt-2"
              >
                <CalendarClock size={16} aria-hidden="true" /> Book a 20-min demo instead
              </button>
            </div>
          </div>

          <p className="mt-5 font-times text-[14px] italic text-sage dark:text-moss-glow">
            "No credit card · Demo data included · Cancel anytime."
          </p>
        </aside>
      </main>
    </div>
  );
}
