import React from 'react';
import type { Registration } from '../../types/registration';
import type { Event } from '../../types/event';
import { StatusBadge } from '../common/StatusBadge';
import { useData } from '../../context/DataContext';

interface RegistrationCardProps {
  registration: Registration;
  event?: Event;
  onViewPass: (registration: Registration, event?: Event) => void;
  onCancelClick: (registration: Registration, event?: Event) => void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
  event,
  onViewPass,
  onCancelClick,
}) => {
  const { checkInParticipant } = useData();

  const isCheckedIn = registration.checkInStatus === 'CHECKED_IN';
  const isCancelled = registration.status === 'CANCELLED';

  const handleCheckIn = () => {
    checkInParticipant(registration.id);
  };

  return (
    <div
      className={`bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md ${
        isCancelled ? 'opacity-80' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-space-xs">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isCancelled ? (
              <StatusBadge status="CANCELLED" />
            ) : event?.status === 'COMPLETED' ? (
              <StatusBadge status="COMPLETED" />
            ) : (
              <StatusBadge status="UPCOMING" />
            )}
            <StatusBadge
              status={registration.checkInStatus}
              checkInTime={registration.checkInTime}
            />
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
            {event?.title || 'Campus Tech Event'}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">groups</span>
            Organized by: {event?.organizerName || 'Campus Club'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <span className="material-symbols-outlined text-[26px]">psychology</span>
        </div>
      </div>

      {/* Details box */}
      <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1">
        <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
          <span className="material-symbols-outlined text-[16px] text-primary">calendar_clock</span>
          <span>
            {event?.formattedDate || 'Upcoming'} • {event?.time || 'TBA'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-[16px] text-outline">pin_drop</span>
          <span>
            {event?.location || 'Venue'}, {event?.room || 'Hall'}
          </span>
        </div>
        <div className="text-outline font-label-sm text-label-sm pt-0.5 flex justify-between items-center">
          <span>Registered: {registration.registrationDate}</span>
          <span className="font-mono text-on-surface-variant font-semibold">
            {registration.passCode}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      {!isCancelled && (
        <div className="space-y-space-xs pt-1">
          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => onViewPass(registration, event)}
              className="flex-1 h-10 px-space-md bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span>View Pass</span>
            </button>

            {isCheckedIn ? (
              <div className="flex-1 h-10 px-space-md bg-tertiary/10 text-tertiary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-1.5 cursor-default font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Checked In ✓</span>
              </div>
            ) : (
              <button
                onClick={handleCheckIn}
                className="flex-1 h-10 px-space-md bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg rounded-lg flex items-center justify-center gap-1.5 transition-all font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>Check In</span>
              </button>
            )}
          </div>

          <button
            onClick={() => onCancelClick(registration, event)}
            className="w-full text-center py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/30 rounded-lg transition-colors flex items-center justify-center gap-1 mt-1"
          >
            <span className="material-symbols-outlined text-[15px]">event_busy</span>
            Cancel Registration
          </button>
        </div>
      )}
    </div>
  );
};
