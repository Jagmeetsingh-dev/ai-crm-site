import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "./ui/Reveal";

const FAQS = [
  {
    q: "Who is AI CRM for?",
    a: "Service businesses — realtors, solar, insurance, and agencies — running a 2–25 person sales team.",
  },
  {
    q: "How is it different from HubSpot or Salesforce?",
    a: "It's focused and fast: the lead-to-deal essentials plus AI, without the bloat and price.",
  },
  {
    q: "Do I need an AI / OpenAI key?",
    a: "No. AI features run in a free, deterministic mock mode out of the box; add your own key for live results.",
  },
  {
    q: "Is my data isolated from other companies?",
    a: "Yes — multi-tenant by design; every query is scoped to your organization. Auth uses JWT + bcrypt.",
  },
  {
    q: "Can I invite my team?",
    a: "Yes — with Owner, Manager, and Agent roles.",
  },
  {
    q: "What can the AI do?",
    a: "Score a lead 0–100, summarize its notes and history, and draft the next follow-up — each in one click.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="page-shell py-[80px] md:py-[120px]">
      <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <Reveal as="div">
          <p className="eyebrow">FAQ</p>
          <h2 className="heading mt-4 text-obsidian-ink dark:text-linen">
            Questions,
            <br />
            answered.
          </h2>
          <span className="tick mt-6 block" aria-hidden="true" />
        </Reveal>

        <Reveal as="div" delay={80}>
          <Accordion.Root type="single" collapsible className="flex flex-col">
            {FAQS.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="border-t border-mist/70 last:border-b dark:border-bark"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="font-twk-lausanne text-[18px] font-[400] text-obsidian-ink dark:text-linen">
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="shrink-0 text-sage transition-transform duration-300 group-data-[state=open]:rotate-45 dark:text-moss-glow"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                  <p className="max-w-[56ch] pb-6 font-twk-lausanne text-[16px] font-[350] leading-relaxed text-obsidian-ink/75 dark:text-linen/75">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
