import { KanbanMock } from "./mocks";
import { Reveal } from "./ui/Reveal";

const STAGES = [
  "New",
  "Contacted",
  "Qualified",
  "Appointment",
  "Proposal",
  "Won",
  "Lost",
];

export function PipelineShowcase() {
  return (
    <section id="pipeline" className="page-shell py-[80px] md:py-[120px]">
      <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal as="div" className="order-2 md:order-1">
          <KanbanMock />
          <p className="caption mt-2">
            Drag a card from New to Won — the move saves the instant you drop it.
          </p>
        </Reveal>

        <Reveal as="div" delay={80} className="order-1 md:order-2">
          <p className="eyebrow">The pipeline</p>
          <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
            See every deal,
            <br />
            drag it to done.
          </h2>
          <p className="mt-6 max-w-[44ch] font-twk-lausanne text-[17px] font-[350] leading-relaxed text-obsidian-ink/80 dark:text-linen/80">
            One board, seven stages, optimistic saves. Drag a lead forward and
            the change is instant — no spinners, no lost work. The whole team
            sees the same source of truth.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {STAGES.map((stage) => (
              <li
                key={stage}
                className="rounded-[5px] border border-mist/80 px-3 py-1.5 font-twk-lausanne text-[13px] font-[350] text-obsidian-ink/80 dark:border-bark dark:text-linen/80"
              >
                {stage}
              </li>
            ))}
          </ul>
          <span className="tick mt-7 block" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
