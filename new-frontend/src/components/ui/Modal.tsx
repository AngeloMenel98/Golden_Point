'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal = ({ isOpen, onClose, title, children, showCloseButton = true }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      setIsClosing(false);
      dialog.showModal(); // Native API: Handles backdrop & focus trap
      document.body.style.overflow = 'hidden';
    } else if (dialog.open) {
      // Handle exit animation
      setIsClosing(true);
      const animationDuration = 200;
      const timer = setTimeout(() => {
        dialog.close();
        setIsClosing(false);
        document.body.style.overflow = 'unset';
        previousFocus.current?.focus(); // Return focus to trigger
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={onClose} // Handles "Escape" key
      className={`
        fixed inset-0 m-auto max-w-[1000px] w-[95vw] min-w-[320px] h-fit max-h-[95vh]
        backdrop:bg-black/60 backdrop:backdrop-blur-sm 
        bg-gp-light p-0 rounded-2xl 
        shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        ${isOpen && !isClosing ? 'open:animate-in open:fade-in open:zoom-in-95' : ''}
        ${isClosing ? 'modal-animate-out' : ''}
      `}
      aria-labelledby="modal-title"
    >
      <div className="p-6">
        <header className="flex justify-between items-center mb-2 flex-shrink-0 pb-2 border-b border-gp-pastel/30">
          <h2 id="modal-title" className="text-xl font-bold text-gp-dark">{title}</h2>
          {showCloseButton && (
            <button onClick={onClose} className="p-2 hover:bg-gp-pastel/20 rounded-full transition-colors">
              ✕
            </button>
          )}
        </header>
        <div className="modal-content -mx-6 -mb-6 px-6 pb-6">{children}</div>
      </div>
    </dialog>,
    document.body
  );
};
