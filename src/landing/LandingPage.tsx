import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { ProblemSolution } from "./components/ProblemSolution";
import { FeatureGrid } from "./components/FeatureGrid";
import { AiSpotlight } from "./components/AiSpotlight";
import { PipelineShowcase } from "./components/PipelineShowcase";
import { DashboardShowcase } from "./components/DashboardShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { RolesSecurity } from "./components/RolesSecurity";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

/**
 * AI CRM marketing landing page — a single, self-contained route.
 * Sections render in the exact order specified by the brief (1–14).
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linen text-obsidian-ink dark:bg-obsidian-ink dark:text-linen">
      {/* 1. Sticky nav */}
      <Nav />

      <main>
        {/* 2. Hero */}
        <Hero />
        {/* 3. Social proof strip */}
        <SocialProof />
        {/* 4. Problem → solution */}
        <ProblemSolution />
        {/* 5. Feature grid */}
        <FeatureGrid />
        {/* 6. AI spotlight */}
        <AiSpotlight />
        {/* 7. Pipeline showcase */}
        <PipelineShowcase />
        {/* 8. Dashboard showcase */}
        <DashboardShowcase />
        {/* 9. How it works */}
        <HowItWorks />
        {/* 10. Roles / team & security */}
        <RolesSecurity />
        {/* 11. Pricing */}
        <Pricing />
        {/* 12. FAQ */}
        <Faq />
        {/* 13. Final CTA band */}
        <FinalCta />
      </main>

      {/* 14. Footer */}
      <Footer />
    </div>
  );
}
