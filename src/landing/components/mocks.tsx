import { cn } from "@/lib/utils";

/* ============================================================================
 * Illustrative product mockups, rendered as monochrome CSS/SVG surfaces.
 * Per the honesty guardrails: these are clearly-labeled, non-photographic
 * representations of real product surfaces — no stock imagery, no fake metrics
 * presented as customer data.
 * ========================================================================== */

const STAGES = [
  "New",
  "Contacted",
  "Qualified",
  "Appointment",
  "Proposal",
  "Won",
  "Lost",
] as const;

const STAGE_CARDS: Record<string, { name: string; value: string }[]> = {
  New: [{ name: "Marisol R.", value: "$8.2k" }, { name: "Delgado Roofing", value: "$14k" }],
  Contacted: [{ name: "P. Okafor", value: "$5.5k" }],
  Qualified: [{ name: "Sunline Solar", value: "$22k" }, { name: "A. Bianchi", value: "$9k" }],
  Appointment: [{ name: "Verde Agency", value: "$31k" }],
  Proposal: [{ name: "Harbor Insurance", value: "$18k" }],
  Won: [{ name: "Lakeside Realty", value: "$27k" }],
  Lost: [{ name: "QuickFix LLC", value: "$4k" }],
};

/** Compact 7-stage kanban board, monochrome with a single Voltage accent. */
export function KanbanMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "tile bg-linen p-4 ring-1 ring-mist/70 dark:bg-bark dark:ring-bark",
        className
      )}
      role="img"
      aria-label="Drag-and-drop pipeline board showing seven stages from New to Won and Lost, with sample lead cards in each column."
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-twk-lausanne text-[13px] font-medium text-obsidian-ink dark:text-linen">
          Pipeline
        </span>
        <span className="eyebrow">7 stages</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STAGES.map((stage) => (
          <div key={stage} className="w-[120px] shrink-0">
            <div className="mb-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  stage === "Won" ? "bg-voltage" : "bg-sage/60 dark:bg-moss-glow/60"
                )}
                aria-hidden="true"
              />
              <span className="font-twk-lausanne text-[11px] font-[350] uppercase tracking-wide text-sage dark:text-moss-glow">
                {stage}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {(STAGE_CARDS[stage] ?? []).map((card) => (
                <div
                  key={card.name}
                  className={cn(
                    "rounded-[5px] border border-mist/80 bg-linen p-2 dark:border-bark dark:bg-obsidian-ink",
                    stage === "Won" && "border-voltage/50"
                  )}
                >
                  <div className="font-twk-lausanne text-[12px] font-[350] text-obsidian-ink dark:text-linen">
                    {card.name}
                  </div>
                  <div className="font-twk-lausanne text-[11px] text-sage dark:text-moss-glow">
                    {card.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** KPI tiles + a leads-by-month bar chart, monochrome. */
export function DashboardMock({ className }: { className?: string }) {
  const months = [38, 52, 44, 61, 70, 84];
  const max = Math.max(...months);
  const kpis = [
    { label: "Total leads", value: "1,284" },
    { label: "Pipeline value", value: "$412k" },
    { label: "Win rate", value: "32%" },
  ];

  return (
    <div
      className={cn(
        "tile bg-linen p-4 ring-1 ring-mist/70 dark:bg-bark dark:ring-bark",
        className
      )}
      role="img"
      aria-label="Analytics dashboard with KPI tiles for total leads, pipeline value, and win rate, plus a bar chart of leads by month trending upward."
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-twk-lausanne text-[13px] font-medium text-obsidian-ink dark:text-linen">
          Dashboard
        </span>
        <span className="eyebrow">Last 6 months</span>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-[5px] border border-mist/80 p-2.5 dark:border-bark"
          >
            <div className="font-editorial-new text-[22px] leading-none text-obsidian-ink dark:text-linen">
              {kpi.value}
            </div>
            <div className="mt-1 font-twk-lausanne text-[10px] uppercase tracking-wide text-sage dark:text-moss-glow">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-[96px] items-end gap-2">
        {months.map((m, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                "w-full rounded-t-[3px]",
                i === months.length - 1 ? "bg-voltage" : "bg-sage/35 dark:bg-moss-glow/35"
              )}
              style={{ height: `${(m / max) * 84}px` }}
              aria-hidden="true"
            />
            <span className="font-twk-lausanne text-[9px] text-sage dark:text-moss-glow">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A monochrome editorial placeholder tile with a Times caption. */
export function PhotoTile({
  caption,
  label,
  className,
}: {
  caption: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={cn("tile", className)}>
      <div
        className="grid h-full w-full place-items-center bg-gradient-to-br from-bark via-sage to-mist dark:from-obsidian-ink dark:via-bark dark:to-sage"
        role="img"
        aria-label={label}
      >
        <span className="font-editorial-new text-[15px] uppercase tracking-[0.2em] text-linen/70">
          {label}
        </span>
      </div>
      <figcaption className="caption mt-2">{caption}</figcaption>
    </figure>
  );
}
