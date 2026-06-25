import { Gauge, FileText, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./ui/Reveal";

type Action = {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  output: React.ReactNode;
};

const ACTIONS: Action[] = [
  {
    icon: Gauge,
    tag: "Qualify",
    title: "Score a lead 0–100",
    body: "AI weighs the lead's profile and activity into a single, sortable score.",
    output: (
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-editorial-new text-[44px] leading-none text-obsidian-ink dark:text-linen">
            82
          </span>
          <span className="font-twk-lausanne text-[12px] text-sage dark:text-moss-glow">/ 100</span>
        </div>
        <p className="mt-2 font-times text-[14px] text-sage dark:text-moss-glow">
          Strong budget signal · responded twice · matches ideal segment.
        </p>
      </div>
    ),
  },
  {
    icon: FileText,
    tag: "Summarize",
    title: "Digest the whole history",
    body: "Turns a noisy thread of notes, calls, and tasks into a tight briefing.",
    output: (
      <p className="font-times text-[14px] leading-relaxed text-obsidian-ink/85 dark:text-linen/85">
        "Homeowner in Austin, 6.2kW system. Two calls; wants financing options.
        Decision expected this month — send proposal with $0-down plan."
      </p>
    ),
  },
  {
    icon: Send,
    tag: "Follow-up",
    title: "Draft the next message",
    body: "Generates a ready-to-send follow-up in the lead's context and your voice.",
    output: (
      <p className="font-times text-[14px] leading-relaxed text-obsidian-ink/85 dark:text-linen/85">
        "Hi Marisol — great speaking earlier. I've attached the $0-down proposal
        we discussed. Would Thursday at 2pm work for a quick walkthrough?"
      </p>
    ),
  },
];

export function AiSpotlight() {
  return (
    <section id="ai" className="page-shell py-[80px] md:py-[120px]">
      <Reveal as="div" className="max-w-[28ch]">
        <p className="eyebrow">AI built in</p>
        <h2 className="display-mond mt-4 text-obsidian-ink dark:text-linen">
          Let AI do
          <br />
          the busywork.
        </h2>
        <p className="mt-6 max-w-[46ch] font-twk-lausanne text-[18px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
          Three one-click actions on every lead. Runs free in deterministic mock
          mode out of the box — bring your own OpenAI key for live results.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-px md:mt-16 md:grid-cols-3">
        {ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <Reveal
              as="article"
              key={action.tag}
              delay={i * 90}
              className="flex flex-col gap-5 border-t border-mist/70 py-8 md:px-7 dark:border-bark"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-voltage text-obsidian-ink">
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="font-twk-lausanne text-[11px] font-medium uppercase tracking-[0.14em] text-sage dark:text-moss-glow">
                  {action.tag}
                </span>
              </div>

              <div>
                <h3 className="font-twk-lausanne text-[20px] font-[400] text-obsidian-ink dark:text-linen">
                  {action.title}
                </h3>
                <p className="mt-2 font-twk-lausanne text-[15px] font-[350] leading-relaxed text-obsidian-ink/70 dark:text-linen/70">
                  {action.body}
                </p>
              </div>

              {/* Example-output card */}
              <div className="mt-auto rounded-[14px] bg-pollen/30 p-5 dark:bg-bark">
                <span className="eyebrow">Example output</span>
                <div className="mt-3">{action.output}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
