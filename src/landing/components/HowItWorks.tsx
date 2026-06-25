import { Reveal } from "./ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Add or import leads",
    body: "Create leads in seconds or bring in a list. Each one gets its own workspace.",
  },
  {
    n: "02",
    title: "Work them through the pipeline",
    body: "Drag leads across the 7 stages, log notes, tasks, and appointments as you go.",
  },
  {
    n: "03",
    title: "Let AI score & follow up",
    body: "One click to qualify, summarize, and draft the next message — then send and close.",
  },
];

export function HowItWorks() {
  return (
    <section className="page-shell py-[80px] md:py-[120px]">
      <Reveal as="div" className="max-w-[24ch]">
        <p className="eyebrow">How it works</p>
        <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
          Up and running
          <br />
          in minutes.
        </h2>
      </Reveal>

      <ol className="mt-12 grid gap-px md:mt-16 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 90}
            className="border-t border-mist/70 py-8 md:px-7 dark:border-bark"
          >
            <span className="font-pp-mondwest text-[clamp(48px,7vw,96px)] leading-none text-voltage">
              {step.n}
            </span>
            <h3 className="mt-4 font-twk-lausanne text-[20px] font-[400] text-obsidian-ink dark:text-linen">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[34ch] font-twk-lausanne text-[15px] font-[350] leading-relaxed text-obsidian-ink/70 dark:text-linen/70">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
