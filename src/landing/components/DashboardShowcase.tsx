import { DashboardMock } from "./mocks";
import { Counter } from "./ui/Counter";
import { Reveal } from "./ui/Reveal";

const KPIS = [
  { label: "Leads tracked", to: 1284, prefix: "", suffix: "" },
  { label: "Pipeline value", to: 412, prefix: "$", suffix: "k" },
  { label: "Avg. win rate", to: 32, prefix: "", suffix: "%" },
];

export function DashboardShowcase() {
  return (
    <section className="page-shell py-[80px] md:py-[120px]">
      <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal as="div">
          <p className="eyebrow">The dashboard</p>
          <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
            Know your
            <br />
            numbers.
          </h2>
          <p className="mt-6 max-w-[44ch] font-twk-lausanne text-[17px] font-[350] leading-relaxed text-obsidian-ink/80 dark:text-linen/80">
            A live dashboard of the KPIs that matter — total leads, pipeline
            value, win rate — plus charts for leads by month, by source, and by
            stage. See at a glance where deals stall and which sources convert.
          </p>

          {/* Animated, clearly illustrative figures */}
          <dl className="mt-9 grid grid-cols-3 gap-6">
            {KPIS.map((kpi) => (
              <div key={kpi.label}>
                <dd className="font-editorial-new text-[clamp(32px,5vw,52px)] leading-none text-obsidian-ink dark:text-linen">
                  <Counter to={kpi.to} prefix={kpi.prefix} suffix={kpi.suffix} />
                </dd>
                <dt className="mt-2 font-twk-lausanne text-[12px] uppercase tracking-wide text-sage dark:text-moss-glow">
                  {kpi.label}
                </dt>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-times text-[13px] italic text-sage dark:text-moss-glow">
            Figures shown are illustrative sample data.
          </p>
        </Reveal>

        <Reveal as="div" delay={80}>
          <DashboardMock />
          <p className="caption mt-2">KPI tiles and a leads-by-month trend, updated live.</p>
        </Reveal>
      </div>
    </section>
  );
}
