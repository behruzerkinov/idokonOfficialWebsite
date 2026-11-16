import React from 'react';
import { Modal } from './Modal';

export const LightboxModal = ({ isOpen, onClose, image, title, closeLabel }) => (
  <Modal isOpen={isOpen && !!image} onClose={onClose} title={title} closeLabel={closeLabel} maxWidth="max-w-5xl">
    <p className="mb-3 pr-10 text-sm font-medium">{title}</p>
    <img src={image} alt={title} decoding="async" className="h-auto max-h-[75vh] w-full rounded-lg object-contain" />
  </Modal>
);
