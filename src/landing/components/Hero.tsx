import { DEMO_CREDENTIALS, LINKS } from "../constants";
import { VoltageButton, GhostButton } from "./ui/Button";
import { KanbanMock } from "./mocks";
import { Reveal } from "./ui/Reveal";

export function Hero() {
  return (
    <section id="top" className="page-shell pt-[60px] pb-[80px] md:pt-[90px] md:pb-[120px]">
      <Reveal as="div">
        <p className="eyebrow">CRM + AI for service businesses</p>
        <span className="tick mt-4 block" aria-hidden="true" />
      </Reveal>

      {/* The one and only <h1> */}
      <Reveal as="div" delay={60}>
        <h1 className="display-xl mt-6 text-obsidian-ink dark:text-linen">
          Turn every lead
          <br />
          into a <span className="font-pp-mondwest">closed deal.</span>
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end md:gap-12">
        <Reveal as="div" delay={120}>
          <p className="max-w-[44ch] font-twk-lausanne text-[18px] font-[350] leading-[1.45] text-obsidian-ink/85 dark:text-linen/85">
            AI CRM gives realtors, solar, insurance, and agency teams a
            drag-and-drop pipeline, a dashboard that tells the truth, and an AI
            assistant that scores leads and drafts follow-ups — so you close
            more with less busywork.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <VoltageButton href={LINKS.signup}>Start free</VoltageButton>
            <GhostButton href={LINKS.demo} withArrow>
              See the live demo
            </GhostButton>
          </div>

          <p className="mt-5 font-twk-lausanne text-[13px] text-sage dark:text-moss-glow">
            No credit card · Demo data included · Light &amp; dark mode
          </p>
          <p className="mt-1 font-times text-[14px] text-sage dark:text-moss-glow">
            Demo login — {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
          </p>
        </Reveal>

        {/* Product visual tucked beside the headline, editorial-style */}
        <Reveal as="div" delay={180}>
          <KanbanMock />
          <p className="caption mt-2">A live pipeline — drag a lead, the stage saves instantly.</p>
        </Reveal>
      </div>
    </section>
  );
}
