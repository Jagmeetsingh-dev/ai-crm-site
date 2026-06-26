import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/utils";
import { DEMO_CREDENTIALS, LINKS } from "../landing/constants";
import { TextField } from "../landing/components/ui/Field";
import { VoltageButton } from "../landing/components/ui/Button";
import { isWebezioConfigured, submitToWebezio } from "@/lib/webezio";

/* -------------------------------------------------------------------------- */
/* Header                                                                      */
/* -------------------------------------------------------------------------- */

function LoginHeader() {
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
/* "We're invite-only" panel — the mocked sign-in result                       */
/* -------------------------------------------------------------------------- */

function InviteOnlyPanel({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-voltage text-obsidian-ink">
        <Sparkles size={24} strokeWidth={2.25} aria-hidden="true" />
      </span>
      <h1 className="heading-sm mt-6 text-obsidian-ink dark:text-linen">
        AI CRM is invite-only right now.
      </h1>
      <p className="mt-4 max-w-[48ch] font-twk-lausanne text-[16px] font-[350] leading-relaxed text-obsidian-ink/80 dark:text-linen/80">
        We're onboarding teams by hand while we're in private beta, so there's no self-serve login
        yet. Tell us a little about your team{email ? <> (we noted <span className="text-obsidian-ink dark:text-linen">{email}</span>)</> : null} and
        we'll get you set up with a guided walkthrough.
      </p>

      <ul className="mt-7 flex flex-col gap-3">
        {[
          "Get a workspace tailored to how your team sells.",
          "A real person walks you through setup — no slides.",
          "We'll reach out by email to get you started.",
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
        <VoltageButton href={LINKS.signup}>Get started with us</VoltageButton>
        <a href={`mailto:${LINKS.salesEmail}`} className="btn-ghost">
          <CalendarClock size={16} aria-hidden="true" /> Talk to sales
        </a>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-7 inline-flex items-center gap-2 font-twk-lausanne text-[14px] font-[350] text-sage underline-offset-4 hover:underline dark:text-moss-glow"
      >
        <ArrowLeft size={15} aria-hidden="true" /> Back to sign in
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function LoginPage() {
  const [params] = useSearchParams();
  const isDemo = params.get("demo") === "1";

  // When arriving from the "Try the demo" CTA, prefill the demo credentials so
  // the form looks ready to go — it still won't actually log anyone in.
  const [email, setEmail] = useState(isDemo ? DEMO_CREDENTIALS.email : "");
  const [password, setPassword] = useState(isDemo ? DEMO_CREDENTIALS.password : "");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError(null);
    // Mock only — no authentication happens. Since the product is invite-only,
    // capture the email as a lead (best-effort) before routing to talk-to-sales.
    if (isWebezioConfigured) {
      void submitToWebezio("contact", { email, intent: "login" }).catch(() => {
        /* non-blocking: never hold up the user on a lead-capture failure */
      });
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-linen text-obsidian-ink dark:bg-obsidian-ink dark:text-linen">
      <LoginHeader />

      <main className="page-shell grid gap-12 py-[50px] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-16 md:py-[70px]">
        {/* LEFT: sign-in form / invite-only result */}
        <section>
          {done ? (
            <InviteOnlyPanel email={email} onBack={() => setDone(false)} />
          ) : (
            <>
              <p className="eyebrow">Welcome back</p>
              <h1 className="heading-sm mt-3 text-obsidian-ink dark:text-linen">Sign in to AI CRM.</h1>
              <p className="mt-4 max-w-[44ch] font-twk-lausanne text-[16px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
                Enter your details to pick up where you left off.
              </p>

              <form onSubmit={submit} className="mt-8 flex flex-col gap-5" noValidate>
                <TextField
                  label="Work email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="jordan@yourbusiness.com"
                  autoComplete="email"
                />
                <div>
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                  <div className="mt-2 text-right">
                    <a
                      href={`mailto:${LINKS.salesEmail}`}
                      className="font-twk-lausanne text-[13px] font-[350] text-sage underline-offset-4 hover:underline dark:text-moss-glow"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-5 w-5 shrink-0 accent-voltage" />
                  <span className="font-twk-lausanne text-[14px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
                    Keep me signed in
                  </span>
                </label>

                <button type="submit" className="btn-voltage mt-1 justify-center">
                  Sign in <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                </button>

                {error && (
                  <p role="alert" className="font-twk-lausanne text-[13px] font-[500] text-obsidian-ink dark:text-linen">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-voltage align-middle" aria-hidden="true" />
                    {error}
                  </p>
                )}
              </form>

              <p className="mt-6 font-twk-lausanne text-[14px] font-[350] text-sage dark:text-moss-glow">
                New to AI CRM?{" "}
                <Link to={LINKS.signup} className="text-obsidian-ink underline underline-offset-4 dark:text-linen">
                  Get started
                </Link>
              </p>
            </>
          )}
        </section>

        {/* RIGHT: marketing / reassurance panel */}
        <aside className="md:pt-[52px]">
          <div className="rounded-[14px] bg-pollen/25 p-7 dark:bg-bark/50">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-voltage text-obsidian-ink">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-twk-lausanne text-[18px] font-[500] text-obsidian-ink dark:text-linen">
              Not set up yet?
            </h2>
            <p className="mt-3 font-twk-lausanne text-[15px] font-[350] leading-relaxed text-obsidian-ink/80 dark:text-linen/80">
              We're onboarding new teams personally while we're in private beta. Get started and
              we'll reach out to walk you through everything.
            </p>

            <ul className="mt-5 flex flex-col gap-3.5">
              {[
                "A guided, hands-on setup",
                "AI assistant that does the busywork",
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
              <Link
                to={LINKS.signup}
                className={cn("btn-voltage justify-center", "w-full")}
              >
                Get started with us <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <a href={`mailto:${LINKS.salesEmail}`} className="btn-ghost mt-3 justify-center">
                <CalendarClock size={16} aria-hidden="true" /> Talk to sales
              </a>
            </div>
          </div>

          <p className="mt-5 font-times text-[14px] italic text-sage dark:text-moss-glow">
            "Private beta · Onboarded by a real human · No credit card."
          </p>
        </aside>
      </main>
    </div>
  );
}
