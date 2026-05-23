import { HolmesCapabilities } from "./holmes-capabilities";
import { HolmesFaq } from "./holmes-faq";
import { HolmesFooter } from "./holmes-footer";
import { HolmesHeader } from "./holmes-header";
import { HolmesHero } from "./holmes-hero";
import { HolmesIntelligence } from "./holmes-intelligence";
import { HolmesMacSection } from "./holmes-mac-section";
import { HolmesPipeline } from "./holmes-pipeline";
import { HolmesPricing } from "./holmes-pricing";
import { HolmesSlashSection } from "./holmes-slash-section";
import { LenisProvider } from "./lenis-provider";

export function HolmesLanding() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-white">
        <HolmesHeader />
        <main>
          <HolmesHero />
          <HolmesMacSection />
          <HolmesIntelligence />
          <HolmesPipeline />
          <HolmesSlashSection />
          <HolmesCapabilities />
          <HolmesPricing />
          <HolmesFaq />
        </main>
        <HolmesFooter />
      </div>
    </LenisProvider>
  );
}
