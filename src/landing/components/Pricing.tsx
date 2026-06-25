import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS, PRICING } from "../constants";
import { VoltageButton, GhostButton } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

type Billing = "monthly" | "annual";

/** Annual price per month = monthly * (12 - monthsFree) / 12. */
function annualPerMonth(monthly: number) {
  return Math.round((monthly * (12 - PRICING.annualMonthsFree)) / 12);
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-[10px] border border-mist/80 p-1 dark:border-bark"
    >
      {(["monthly", "annual"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={billing === option}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-[6px] px-4 py-2 font-twk-lausanne text-[13px] font-[400] capitalize transition-colors",
            billing === option
              ? "bg-voltage text-obsidian-ink"
              : "text-obsidian-ink/70 hover:text-obsidian-ink dark:text-linen/70 dark:hover:text-linen"
          )}
        >
          {option}
          {option === "annual" && (
            <span className="ml-1.5 font-times text-[11px] italic opacity-80">2 mo free</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="page-shell py-[80px] md:py-[120px]">
      <Reveal as="div" className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[22ch]">
          <p className="eyebrow">Pricing</p>
          <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
            Simple plans,
            <br />
            no surprises.
          </h2>
        </div>
        <BillingToggle billing={billing} onChange={setBilling} />
      </Reveal>

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
        {PRICING.tiers.map((tier, i) => {
          const isFree = tier.monthly === 0;
          const displayPrice =
            billing === "annual" && !isFree ? annualPerMonth(tier.monthly) : tier.monthly;

          return (
            <Reveal
              as="article"
              key={tier.id}
              delay={i * 90}
              className={cn(
                "flex flex-col rounded-[14px] p-[28px] transition-transform duration-300 hover:-translate-y-1",
                tier.highlighted
                  ? "bg-obsidian-ink text-linen ring-1 ring-voltage dark:bg-bark"
                  : "bg-pollen/25 dark:bg-bark/60"
              )}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={cn(
                    "font-twk-lausanne text-[20px] font-[500]",
                    tier.highlighted ? "text-linen" : "text-obsidian-ink dark:text-linen"
                  )}
                >
                  {tier.name}
                </h3>
                {"badge" in tier && tier.badge && (
                  <span className="rounded-[5px] bg-voltage px-2.5 py-1 font-twk-lausanne text-[11px] font-medium uppercase tracking-wide text-obsidian-ink">
                    {tier.badge}
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "mt-2 min-h-[44px] font-twk-lausanne text-[14px] font-[350]",
                  tier.highlighted ? "text-linen/75" : "text-obsidian-ink/70 dark:text-linen/70"
                )}
              >
                {tier.blurb}
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "font-editorial-new text-[56px] leading-none",
                    tier.highlighted ? "text-linen" : "text-obsidian-ink dark:text-linen"
                  )}
                >
                  ${displayPrice}
                </span>
                <span
                  className={cn(
                    "font-twk-lausanne text-[14px]",
                    tier.highlighted ? "text-linen/70" : "text-sage dark:text-moss-glow"
                  )}
                >
                  /mo
                </span>
              </div>
              <p
                className={cn(
                  "mt-1 h-[18px] font-times text-[13px] italic",
                  tier.highlighted ? "text-linen/60" : "text-sage dark:text-moss-glow"
                )}
              >
                {billing === "annual" && !isFree ? "billed annually" : " "}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check
                      size={17}
                      strokeWidth={2.25}
                      className="mt-0.5 shrink-0 text-voltage"
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "font-twk-lausanne text-[14px] font-[350]",
                        tier.highlighted ? "text-linen/85" : "text-obsidian-ink/80 dark:text-linen/80"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {tier.highlighted ? (
                  <VoltageButton href={LINKS.signup} className="w-full justify-center">
                    {tier.cta}
                  </VoltageButton>
                ) : (
                  <GhostButton
                    href={LINKS.signup}
                    withArrow
                    className="justify-center rounded-[10px] border border-obsidian-ink/15 px-6 py-3.5 hover:no-underline dark:border-linen/20"
                  >
                    {tier.cta}
                  </GhostButton>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal as="p" className="mt-8 text-center font-times text-[14px] italic text-sage dark:text-moss-glow">
        Bring your own OpenAI key for live AI, or use built-in mock mode free.
      </Reveal>
    </section>
  );
}
