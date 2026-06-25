/* ============================================================================
 * EDITABLE CONSTANTS
 * Pricing numbers and the primary CTA destinations live here. Change these in
 * one place and they propagate across the nav, hero, pricing, and final band.
 * ========================================================================== */

/** Where the primary / secondary CTAs point. Wire to your real auth routes. */
export const LINKS = {
  signup: "/signup",
  login: "/login",
  demo: "/login?demo=1",
  docs: "/docs",
} as const;

/** Demo credentials shown in the hero secondary CTA microcopy. */
export const DEMO_CREDENTIALS = {
  email: "demo@aicrm.dev",
  password: "Demo1234!",
} as const;

/* ----------------------------------------------------------------------------
 * BOOKING (Cal.com)
 * Replace `calLink` with your real Cal.com event link, e.g. "acme-sales/demo".
 * The placeholder below is detected at runtime and shows a setup notice instead
 * of a broken embed until you set a real link.
 * -------------------------------------------------------------------------- */
export const BOOKING = {
  /** Cal.com event path: "<username-or-team>/<event-slug>". */
  calLink: "your-cal-username/ai-crm-demo",
  /** Voltage green — used for the Cal.com embed brand color. */
  brandColor: "#2bee4b",
  durationLabel: "20 min",
} as const;

/** True when the Cal.com link is still the unconfigured placeholder. */
export const isCalConfigured = !BOOKING.calLink.startsWith("your-cal-username");

/* ----------------------------------------------------------------------------
 * SIGN-UP FORM OPTIONS
 * -------------------------------------------------------------------------- */
export const INDUSTRIES = [
  "Real estate",
  "Solar & home improvement",
  "Insurance",
  "Marketing / creative agency",
  "Other service business",
] as const;

export const TEAM_SIZES = ["Just me", "2–5", "6–10", "11–25", "25+"] as const;

export const CURRENT_TOOLS = [
  "Spreadsheets",
  "HubSpot",
  "Salesforce",
  "Another CRM",
  "Nothing yet",
] as const;

export const LEAD_VOLUMES = [
  "Under 50 / month",
  "50–200 / month",
  "200–500 / month",
  "500+ / month",
] as const;

/** Monthly prices in USD. Annual is billed at ~2 months free (10x monthly). */
export const PRICING = {
  annualMonthsFree: 2,
  tiers: [
    {
      id: "starter",
      name: "Starter",
      monthly: 0,
      blurb: "For solo operators getting organized.",
      features: [
        "1 user",
        "Up to 100 leads",
        "Drag-and-drop pipeline",
        "Dashboard & analytics",
        "AI in mock mode",
        "Light & dark theme",
      ],
      cta: "Start free",
      highlighted: false,
    },
    {
      id: "pro",
      name: "Pro",
      monthly: 39,
      blurb: "For small teams that want AI doing the busywork.",
      features: [
        "Up to 5 users",
        "Unlimited leads",
        "Full AI assistant (Qualify / Summarize / Follow-up)",
        "File uploads",
        "Notifications",
        "Search, filter & sort",
        "Everything in Starter",
      ],
      cta: "Start free",
      highlighted: true,
      badge: "Most popular",
    },
    {
      id: "team",
      name: "Team",
      monthly: 99,
      blurb: "For growing orgs that need control and roles.",
      features: [
        "Unlimited users",
        "Owner / Manager / Agent roles",
        "Role-based permissions",
        "Multi-tenant isolation",
        "Priority support",
        "Everything in Pro",
      ],
      cta: "Start free",
      highlighted: false,
    },
  ],
} as const;

export type PricingTier = (typeof PRICING.tiers)[number];
