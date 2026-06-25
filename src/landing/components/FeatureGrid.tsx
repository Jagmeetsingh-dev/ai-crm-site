import {
  Kanban,
  Sparkles,
  BarChart3,
  FolderKanban,
  Bell,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LINKS } from "../constants";
import { VoltageButton } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Kanban,
    title: "Drag-and-drop pipeline",
    body: "Move leads across 7 stages on a kanban board. Every change saves instantly.",
  },
  {
    icon: Sparkles,
    title: "AI assistant",
    body: "Qualify, summarize, and draft the next follow-up — each in a single click.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & analytics",
    body: "KPI cards plus charts: leads by month, by source, by stage, and recent activity.",
  },
  {
    icon: FolderKanban,
    title: "Lead workspace",
    body: "One page per lead — notes, tasks, appointments, files, and a full activity timeline.",
  },
  {
    icon: Bell,
    title: "Notifications",
    body: "In-app alerts for new assignments, tasks due, and appointments today, with unread badges.",
  },
  {
    icon: Users,
    title: "Team & roles",
    body: "Invite teammates with Owner, Manager, and Agent permissions.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="page-shell py-[80px] md:py-[120px]">
      <Reveal as="div" className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[20ch]">
          <p className="eyebrow">Everything in one place</p>
          <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
            Lead to deal,
            <br />
            end to end.
          </h2>
        </div>
        <p className="max-w-[40ch] font-twk-lausanne text-[16px] font-[350] text-obsidian-ink/75 dark:text-linen/75">
          The essentials a small sales team actually uses — without the bloat of
          enterprise suites you'll never fully configure.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-px md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Reveal
              as="li"
              key={feature.title}
              delay={(i % 3) * 80}
              className="group border-t border-mist/70 py-8 transition-transform duration-300 hover:-translate-y-1 md:px-7 dark:border-bark"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] bg-pollen/50 text-obsidian-ink transition-colors group-hover:bg-voltage dark:bg-bark dark:text-linen dark:group-hover:bg-voltage dark:group-hover:text-obsidian-ink">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-twk-lausanne text-[20px] font-[400] text-obsidian-ink dark:text-linen">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-[36ch] font-twk-lausanne text-[15px] font-[350] leading-relaxed text-obsidian-ink/70 dark:text-linen/70">
                {feature.body}
              </p>
            </Reveal>
          );
        })}
      </ul>

      <Reveal as="div" className="mt-14 flex justify-center">
        <VoltageButton href={LINKS.signup}>Start free</VoltageButton>
      </Reveal>
    </section>
  );
}
