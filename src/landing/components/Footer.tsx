import { LINKS } from "../constants";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "AI", href: "#ai" },
      { label: "Pipeline", href: "#pipeline" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: LINKS.docs },
      { label: "FAQ", href: "#faq" },
      { label: "Live demo", href: LINKS.demo },
      { label: "Log in", href: LINKS.login },
    ],
  },
  {
    heading: "Social",
    links: [
      { label: "X (placeholder)", href: "#" },
      { label: "LinkedIn (placeholder)", href: "#" },
      { label: "GitHub (placeholder)", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-obsidian-ink text-linen">
      <div className="page-shell grid gap-12 py-[60px] md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-10">
        <div>
          <a href="#top" className="font-twk-lausanne text-[16px] font-semibold" aria-label="AI CRM — home">
            <span className="text-linen">AI</span>
            <span className="text-voltage">CRM</span>
          </a>
          <p className="mt-4 max-w-[34ch] font-twk-lausanne text-[14px] font-[350] text-linen/65">
            The lead-to-deal CRM for service businesses, with AI built in.
          </p>
          <span className="tick mt-6 block" aria-hidden="true" />
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="font-twk-lausanne text-[11px] uppercase tracking-[0.14em] text-moss-glow">
              {col.heading}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-twk-lausanne text-[14px] font-[350] text-linen/75 underline-offset-4 transition-colors hover:text-linen hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-bark">
        <div className="page-shell flex flex-col gap-2 py-6 text-linen/55 md:flex-row md:items-center md:justify-between">
          <p className="font-twk-lausanne text-[13px] font-[350]">
            © {new Date().getFullYear()} AI CRM. All rights reserved.
          </p>
          <p className="font-times text-[13px] italic">
            Logos and social links shown are placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
}
