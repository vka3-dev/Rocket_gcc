import React from 'react';
import type { Registration } from '../../types/registration';
import { StatusBadge } from '../common/StatusBadge';
import { useData } from '../../context/DataContext';

interface ParticipantCardProps {
  registration: Registration;
  onPassDetailsClick?: (registration: Registration) => void;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  registration,
  onPassDetailsClick,
}) => {
  const { checkInParticipant } = useData();
  const isCheckedIn = registration.checkInStatus === 'CHECKED_IN';

  const initials = registration.userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="attendee-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-label-lg shrink-0">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                {registration.userName}
              </h2>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono">
                {registration.userStudentId}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-secondary truncate">
              {registration.userEmail}
            </span>
          </div>
        </div>
        <StatusBadge
          status={registration.checkInStatus}
          checkInTime={registration.checkInTime}
          className="shrink-0"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t-0 bg-surface-container-low -mx-4 -mb-4 px-4 py-2.5 rounded-b-xl">
        <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          <span>{registration.registrationDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPassDetailsClick && onPassDetailsClick(registration)}
            className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors font-medium"
          >
            Pass Details
          </button>
          {!isCheckedIn && (
            <button
              onClick={() => checkInParticipant(registration.id)}
              className="px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1 shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px]">how_to_reg</span>
              Check In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
