import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { EASE_OUT } from './Reveal';

export const LightboxModal = ({ isOpen, onClose, image, title }) => {
  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-zinc-950 px-4 py-3">
              <span className="truncate font-mono text-xs text-zinc-300">{title}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Yopish"
                className="cursor-pointer rounded-full p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src={image}
              alt={title}
              decoding="async"
              className="max-h-[80vh] h-auto w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
