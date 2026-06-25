import { Reveal } from "./ui/Reveal";

const ROWS = [
  {
    pain: "Leads slip through the cracks — no single source of truth, follow-ups forgotten.",
    promise: "One pipeline holds every lead and every next step, so nothing gets dropped.",
  },
  {
    pain: "Big CRMs are bloated, overpriced, and slow to set up.",
    promise: "The lead-to-deal essentials plus AI — live in minutes, not weeks.",
  },
  {
    pain: "Reps waste hours rewriting follow-ups and summarizing notes.",
    promise: "AI scores the lead, summarizes the history, and drafts the next message in one click.",
  },
];

export function ProblemSolution() {
  return (
    <section className="page-shell py-[80px] md:py-[120px]">
      <Reveal as="div" className="max-w-[24ch]">
        <p className="eyebrow">The problem</p>
        <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
          Your pipeline,
          <br />
          minus the chaos.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden md:mt-16 md:grid-cols-3">
        {ROWS.map((row, i) => (
          <Reveal
            as="div"
            key={i}
            delay={i * 90}
            className="flex flex-col gap-6 border-t border-mist/70 py-8 md:border-l md:border-t-0 md:px-7 md:first:border-l-0 dark:border-bark"
          >
            <div>
              <span className="font-twk-lausanne text-[11px] uppercase tracking-[0.14em] text-sage dark:text-moss-glow">
                Before
              </span>
              <p className="mt-3 font-twk-lausanne text-[17px] font-[350] leading-snug text-obsidian-ink/70 dark:text-linen/70">
                {row.pain}
              </p>
            </div>
            <span className="tick" aria-hidden="true" />
            <div>
              <span className="font-twk-lausanne text-[11px] uppercase tracking-[0.14em] text-obsidian-ink dark:text-linen">
                With AI CRM
              </span>
              <p className="mt-3 font-twk-lausanne text-[17px] font-[400] leading-snug text-obsidian-ink dark:text-linen">
                {row.promise}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
