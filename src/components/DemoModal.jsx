import React from 'react';
import { Modal } from './Modal';
import { LeadForm } from './LeadForm';

export const DemoModal = ({ isOpen, onClose, t, lang }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={t.demoModal.title} closeLabel={t.menu.close}>
    <h3 className="pr-10 text-xl font-semibold">{t.demoModal.title}</h3>
    <p className="mb-5 mt-2 text-sm" style={{ color: 'var(--muted)' }}>{t.demoModal.subtitle}</p>
    <LeadForm t={t} lang={lang} type="demo" doneLabel={t.menu.close} onDone={onClose} />
  </Modal>
);
