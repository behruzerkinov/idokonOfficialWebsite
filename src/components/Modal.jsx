import { useEffect, useRef } from 'react';
import { X } from './icons';

/**
 * Native <dialog> modal: the browser traps focus, handles Esc and restores focus.
 * Mounted only while open; a click on the backdrop (the dialog itself, outside the padded body) closes it.
 */
export const Modal = ({ onClose, title, closeLabel, children, maxWidth = 'max-w-md' }) => {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    d.showModal();
    return () => d.open && d.close();
  }, []);
  return (
    <dialog
      ref={ref} aria-label={title} className={`modal ${maxWidth}`}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="relative p-6 sm:p-8">
        <button type="button" onClick={onClose} aria-label={closeLabel} className="icon-btn absolute right-2 top-2"><X size={20} strokeWidth={1.75} /></button>
        {children}
      </div>
    </dialog>
  );
};
