import { LINKS } from "../constants";
import { VoltageButton, GhostButton } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function FinalCta() {
  return (
    <section className="page-shell py-[100px] md:py-[160px]">
      <Reveal as="div" className="flex flex-col items-center text-center">
        <span className="tick mb-8" aria-hidden="true" />
        <h2 className="display-lg max-w-[14ch] text-obsidian-ink dark:text-linen">
          Turn every lead into a closed deal.
        </h2>
        <p className="mt-7 max-w-[44ch] font-twk-lausanne text-[18px] font-[350] text-obsidian-ink/80 dark:text-linen/80">
          Start free today — demo data included, no credit card. Add AI when
          you're ready, with your own key or built-in mock mode.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <VoltageButton href={LINKS.signup}>Start free</VoltageButton>
          <GhostButton href={LINKS.demo} withArrow>
            See the live demo
          </GhostButton>
        </div>
      </Reveal>
    </section>
  );
}
