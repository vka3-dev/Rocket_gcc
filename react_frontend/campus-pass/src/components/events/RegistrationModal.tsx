import React, { useState } from 'react';
import type { Event } from '../../types/event';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface RegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { currentUser } = useAuth();
  const { registerForEvent } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const availableSeats = Math.max(0, event.capacity - event.registeredCount);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const success = registerForEvent(event.id, currentUser);
      setIsSubmitting(false);
      onClose();
      if (success && onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-on-surface/50 backdrop-blur-sm transition-opacity duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl sm:rounded-2xl p-space-md shadow-2xl flex flex-col gap-space-sm transform transition-transform duration-200 animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95">
        {/* Mobile Pull Notch */}
        <div className="w-12 h-1.5 bg-surface-container-high rounded-full mx-auto sm:hidden mb-1" />

        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Confirm Registration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-secondary hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Event Summary Card */}
        <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold uppercase">
                {event.category}
              </span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                {event.title}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
              {availableSeats} seats left
            </span>
          </div>

          <div className="flex flex-col gap-1 text-secondary font-label-sm text-label-sm pt-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">event</span>
              <span>
                {event.formattedDate} • {event.time}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">apartment</span>
              <span>
                {event.location} & {event.room}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
              <span>Host: {event.organizerName}</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="flex gap-2.5 items-start px-1 py-1">
          <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">
            contactless
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Are you sure you want to register for this event? Your digital event pass with check-in
            QR code will be generated immediately and stored in{' '}
            <strong className="text-on-surface font-semibold">My Passes</strong>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 h-11 px-4 rounded-xl bg-surface-container-low text-on-surface font-label-lg text-label-lg active:scale-95 transition-all font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 h-11 px-4 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 font-semibold hover:bg-primary-container"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                Generating Pass...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">check</span>
                Confirm Registration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
