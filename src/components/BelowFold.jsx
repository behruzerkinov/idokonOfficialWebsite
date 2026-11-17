import React, { useEffect } from 'react';
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

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** Everything under the hero, one chunk: keeps the first load small so the hero paints sooner. */
export default function BelowFold({ t, lang, cart, prefill, onAddToCart, onOpenSpecsModal, onOpenCart, onRequestKit, onSelectPlan, onOpenLightbox, onOpenDemo }) {
  // Sections arrive after first paint, so honour a #hash deep link once they exist
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Partners t={t} />
      <ValueGrid t={t} />
      <PosInteractiveShowcase t={t} onOpenLightbox={onOpenLightbox} />
      <SectorSolutions t={t} />
      <HardwareMarketplace lang={lang} t={t} cart={cart} onAddToCart={onAddToCart} onOpenSpecsModal={onOpenSpecsModal} onOpenCart={onOpenCart} onRequestKit={onRequestKit} />
      <IntegrationMigration t={t} onOpenContact={() => scrollTo('contact')} />
      <CareSection t={t} lang={lang} />
      <HowItWorks t={t} />
      <PricingCalculator t={t} lang={lang} onSelectPlan={onSelectPlan} />
      <CourseAcademy t={t} onOpenLightbox={onOpenLightbox} />
      <FaqAccordion t={t} onScrollToContact={() => scrollTo('contact')} />
      <ContactConfigurator t={t} lang={lang} prefill={prefill} />
      <Statement t={t} onOpenDemo={onOpenDemo} />
    </>
  );
}
