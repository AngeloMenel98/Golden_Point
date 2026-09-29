'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm z-40
          transition-opacity duration-300 ease-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`
          fixed top-0 right-0 h-full z-50
          w-full md:w-[400px] max-w-full
          bg-white shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gp-gray-light/50 flex-shrink-0">
            {title && (
              <h2
                id="drawer-title"
                className="text-lg font-bold text-gp-dark"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-xl text-gp-gray hover:text-gp-red hover:bg-gp-red/10 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  ,
    document.body
  );
};