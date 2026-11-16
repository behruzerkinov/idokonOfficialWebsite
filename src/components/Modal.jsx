import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

/** Accessible modal: traps focus, closes on Esc / backdrop, restores focus. */
export const Modal = ({ isOpen, onClose, title, closeLabel, children, maxWidth = 'max-w-md' }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement;
    const el = ref.current;
    el?.querySelector(FOCUSABLE)?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !el) return;
      const f = [...el.querySelectorAll(FOCUSABLE)];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.dataset.modalOpen = '1';
    return () => {
      document.removeEventListener('keydown', onKey);
      delete document.body.dataset.modalOpen;
      prev?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`pop-in relative max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl bg-white p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
        style={{ boxShadow: 'var(--ring), var(--shadow-pop)' }}
      >
        <button type="button" onClick={onClose} aria-label={closeLabel} className="icon-btn absolute right-3 top-3">
          <X size={20} strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>
  );
};
