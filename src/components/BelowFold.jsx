import React, { useEffect } from 'react';
import { Partners } from './Partners';
import { HowItWorks } from './HowItWorks';
import { PosInteractiveShowcase } from './PosInteractiveShowcase';
import { SectorSolutions } from './SectorSolutions';
import { CareSection } from './CareSection';
import { HardwareMarketplace } from './HardwareMarketplace';
import { PricingCalculator } from './PricingCalculator';
import { FaqAccordion } from './FaqAccordion';
import { ContactConfigurator } from './ContactConfigurator';
import { Statement } from './Statement';

const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

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
      <HowItWorks t={t} />
      <PosInteractiveShowcase t={t} onOpenLightbox={onOpenLightbox} />
      <SectorSolutions t={t} />
      <CareSection t={t} lang={lang} onOpenLightbox={onOpenLightbox} />
      <HardwareMarketplace lang={lang} t={t} cart={cart} onAddToCart={onAddToCart} onOpenSpecsModal={onOpenSpecsModal} onOpenCart={onOpenCart} onRequestKit={onRequestKit} />
      <PricingCalculator t={t} lang={lang} onSelectPlan={onSelectPlan} />
      <FaqAccordion t={t} onScrollToContact={scrollToContact} />
      <ContactConfigurator t={t} lang={lang} prefill={prefill} />
      <Statement t={t} onOpenDemo={onOpenDemo} />
    </>
  );
}
