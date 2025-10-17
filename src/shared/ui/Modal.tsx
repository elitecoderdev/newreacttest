import { ReactNode } from 'react';
type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};
export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
