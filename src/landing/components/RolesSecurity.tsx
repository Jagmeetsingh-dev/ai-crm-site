import { ShieldCheck, KeyRound, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhotoTile } from "./mocks";
import { Reveal } from "./ui/Reveal";

const POINTS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    body: "Multi-tenant by design — every query is scoped to your organization, so one company's leads are never visible to another.",
  },
  {
    icon: UserCog,
    title: "Roles that fit the team",
    body: "Owner, Manager, and Agent permissions decide who can see and change what — without an admin headache.",
  },
  {
    icon: KeyRound,
    title: "Secure by default",
    body: "Sign-in is protected with JWT authentication and bcrypt-hashed passwords. No special setup required.",
  },
];

export function RolesSecurity() {
  return (
    <section className="page-shell py-[80px] md:py-[120px]">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-16">
        <Reveal as="div">
          <PhotoTile
            label="Secure infrastructure"
            caption="Each organization is isolated end to end."
            className="aspect-[4/3]"
          />
        </Reveal>

        <Reveal as="div" delay={80}>
          <p className="eyebrow">Team & trust</p>
          <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
            Built for teams,
            <br />
            safe by design.
          </h2>

          <ul className="mt-9 flex flex-col gap-7">
            {POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] bg-pollen/50 text-obsidian-ink dark:bg-bark dark:text-linen">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-twk-lausanne text-[18px] font-[400] text-obsidian-ink dark:text-linen">
                      {point.title}
                    </h3>
                    <p className="mt-1 max-w-[46ch] font-twk-lausanne text-[15px] font-[350] leading-relaxed text-obsidian-ink/70 dark:text-linen/70">
                      {point.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
