import React from 'react';
import type { Registration } from '../../types/registration';
import type { Event } from '../../types/event';
import { useData } from '../../context/DataContext';

interface CancellationModalProps {
  registration: Registration | null;
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CancellationModal: React.FC<CancellationModalProps> = ({
  registration,
  event,
  isOpen,
  onClose,
}) => {
  const { cancelRegistration } = useData();

  if (!isOpen || !registration) return null;

  const handleConfirmCancel = () => {
    cancelRegistration(registration.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile bg-on-background/60 backdrop-blur-[4px] transition-opacity duration-200">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-space-lg shadow-xl space-y-space-md animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error-container text-error mx-auto">
          <span className="material-symbols-outlined text-[28px]">warning</span>
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Cancel Registration?
          </h3>
          <p className="font-label-md text-label-md text-primary font-medium">
            {event?.title || 'Campus Event'} • {event?.formattedDate || 'Upcoming'}
          </p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-space-sm text-left">
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Your registration will be cancelled and the seat will become available again for other
            students. This action cannot be undone.
          </p>
        </div>
        <div className="space-y-space-xs pt-1">
          <button
            onClick={handleConfirmCancel}
            className="w-full h-11 bg-error hover:opacity-95 text-on-error rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">delete_forever</span>
            <span>Yes, Cancel Registration</span>
          </button>
          <button
            onClick={onClose}
            className="w-full h-11 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-lg text-label-lg transition-colors font-semibold"
          >
            Keep Registration
          </button>
        </div>
      </div>
    </div>
  );
};
