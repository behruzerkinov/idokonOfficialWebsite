import { useEffect } from 'react';
import { Partners } from './Partners';
import { ValueGrid } from './ValueGrid';
import { PosInteractiveShowcase } from './PosInteractiveShowcase';
import { SectorSolutions } from './SectorSolutions';
import { HardwareMarketplace } from './HardwareMarketplace';
import { IntegrationMigration } from './IntegrationMigration';
import { CareSection } from './CareSection';
import { HowItWorks } from './HowItWorks';
import { PricingCalculator } from './PricingCalculator';
import { CourseAcademy } from './CourseAcademy';
import { FaqAccordion } from './FaqAccordion';
import { ContactConfigurator } from './ContactConfigurator';
import { Statement } from './Statement';

/** Everything under the hero, one lazy chunk: keeps the first load small so the hero paints sooner. */
export default function BelowFold({ t, lang, picked, onTogglePick, onClearPicked, onOpenSpecs, onContact, onOpenLightbox, onOpenDemo, prefill }) {
  // Sections arrive after first paint, so honour a #hash deep link once they exist
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Partners t={t} />
      <ValueGrid t={t} />
      <PosInteractiveShowcase t={t} onOpenLightbox={onOpenLightbox} />
      <SectorSolutions t={t} />
      <HardwareMarketplace lang={lang} t={t} picked={picked} onTogglePick={onTogglePick} onClearPicked={onClearPicked} onOpenSpecs={onOpenSpecs} onContact={onContact} />
      <IntegrationMigration t={t} onOpenContact={() => onContact({})} />
      <CareSection t={t} lang={lang} />
      <HowItWorks t={t} />
      <PricingCalculator t={t} lang={lang} onSelectPlan={(id) => onContact({ plan: t.pricing[id].name })} />
      <CourseAcademy t={t} onOpenLightbox={onOpenLightbox} />
      <FaqAccordion t={t} />
      <ContactConfigurator t={t} lang={lang} prefill={prefill} />
      <Statement t={t} onOpenDemo={onOpenDemo} />
    </>
  );
}
