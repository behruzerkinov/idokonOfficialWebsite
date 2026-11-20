import { Modal } from './Modal';
import { LeadForm } from './LeadForm';

export default function DemoModal({ onClose, t, lang }) {
  return (
    <Modal onClose={onClose} title={t.demoModal.title} closeLabel={t.menu.close}>
      <h3 className="t-h3 pr-10">{t.demoModal.title}</h3>
      <p className="mb-5 mt-2 text-sm" style={{ color: 'var(--fg-3)' }}>{t.demoModal.subtitle}</p>
      <LeadForm t={t} lang={lang} type="demo" doneLabel={t.menu.close} onDone={onClose} />
    </Modal>
  );
}
