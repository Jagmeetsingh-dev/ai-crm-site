import { Reveal } from "./ui/Reveal";

/** Placeholder logo slots — clearly labeled, no fabricated brands. */
const PLACEHOLDERS = ["Realty", "Solar Co", "Insure+", "Agency", "Home Pro"];

export function SocialProof() {
  return (
    <section aria-label="Trusted by service teams" className="border-y border-mist/70 dark:border-bark">
      <div className="page-shell flex flex-col gap-6 py-[40px] md:flex-row md:items-center md:justify-between">
        <Reveal as="div">
          <p className="eyebrow">Built for service teams</p>
          <p className="mt-2 max-w-[34ch] font-twk-lausanne text-[16px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
            Designed for realtors, solar, insurance, and agency pipelines of 2–25 people.
          </p>
        </Reveal>

        <Reveal as="ul" className="flex flex-wrap items-center gap-x-8 gap-y-4" delay={80}>
          {PLACEHOLDERS.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2 font-twk-lausanne text-[14px] font-[350] text-sage dark:text-moss-glow"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-mist dark:bg-bark" aria-hidden="true" />
              <span>{name}</span>
              <span className="font-times text-[12px] italic opacity-70">(placeholder)</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
