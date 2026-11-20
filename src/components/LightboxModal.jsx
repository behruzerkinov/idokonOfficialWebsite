import { Modal } from './Modal';
import { Img } from './Img';

export default function LightboxModal({ onClose, image, title, closeLabel }) {
  return (
    <Modal onClose={onClose} title={title} closeLabel={closeLabel} maxWidth="max-w-6xl">
      <p className="mb-4 pr-10 text-[17px] font-semibold">{title}</p>
      <div className="shot">
        <Img name={image} alt={title} sizes="(min-width: 1200px) 1100px, 100vw" />
      </div>
    </Modal>
  );
}
