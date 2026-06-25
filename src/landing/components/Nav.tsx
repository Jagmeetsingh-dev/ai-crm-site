import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/utils";
import { LINKS } from "../constants";
import { VoltageButton, GhostButton } from "./ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "AI", href: "#ai" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** Wordmark: "AI" in ink, "CRM" in Voltage — the green split is the logo. */
function Wordmark() {
  return (
    <a
      href="#top"
      className="font-twk-lausanne text-[15px] font-semibold tracking-tight"
      aria-label="AI CRM — home"
    >
      <span className="text-obsidian-ink dark:text-linen">AI</span>
      <span className="text-voltage">CRM</span>
    </a>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] text-obsidian-ink transition-colors hover:bg-pollen/40 dark:text-linen dark:hover:bg-bark"
    >
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-mist/70 bg-linen/85 backdrop-blur-md dark:border-bark dark:bg-obsidian-ink/85">
      <nav className="page-shell flex h-[68px] items-center justify-between" aria-label="Primary">
        <Wordmark />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-twk-lausanne text-[14px] font-[350] text-obsidian-ink/80 underline-offset-4 transition-colors hover:text-obsidian-ink hover:underline dark:text-linen/80 dark:hover:text-linen"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <GhostButton href={LINKS.login} className="hidden md:inline-flex">
            Log in
          </GhostButton>
          <VoltageButton
            href={LINKS.signup}
            withArrow={false}
            className="hidden px-6 py-3 md:inline-flex"
          >
            Start free
          </VoltageButton>

          {/* Mobile trigger: 'Menu' label + Voltage mark */}
          <button
            type="button"
            className="inline-flex items-center gap-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-twk-lausanne text-[14px] font-[350] text-obsidian-ink dark:text-linen">
              {open ? "Close" : "Menu"}
            </span>
            {open ? (
              <X size={18} className="text-voltage" aria-hidden="true" />
            ) : (
              <Menu size={18} className="text-voltage" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          open ? "block" : "hidden",
          "border-t border-mist/70 bg-linen dark:border-bark dark:bg-obsidian-ink"
        )}
      >
        <ul className="page-shell flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-[5px] px-2 py-3 font-twk-lausanne text-[18px] text-obsidian-ink hover:bg-pollen/40 dark:text-linen dark:hover:bg-bark"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-3 flex flex-col gap-3 px-2">
            <GhostButton href={LINKS.login} onClick={() => setOpen(false)}>
              Log in
            </GhostButton>
            <VoltageButton href={LINKS.signup} withArrow={false} onClick={() => setOpen(false)}>
              Start free
            </VoltageButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
