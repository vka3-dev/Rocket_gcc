import React from 'react';
import type { Registration } from '../../types/registration';

interface CancelledParticipantCardProps {
  registration: Registration;
}

export const CancelledParticipantCard: React.FC<CancelledParticipantCardProps> = ({
  registration,
}) => {
  const initials = registration.userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm opacity-90">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-label-lg shrink-0">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold line-through decoration-secondary">
                {registration.userName}
              </span>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-secondary font-mono">
                {registration.userStudentId}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-secondary truncate">
              {registration.userEmail}
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-semibold shrink-0">
          <span className="material-symbols-outlined text-[14px]">event_busy</span>
          Cancelled
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 bg-surface-container-low -mx-4 -mb-4 px-4 py-2.5 rounded-b-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-secondary font-label-sm text-label-sm">
          <span>Reg: {registration.registrationDate}</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-error font-semibold">
            Cancelled: {registration.cancellationDate || 'Recently'}
          </span>
        </div>
        <span className="text-tertiary font-label-sm text-label-sm inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">published_with_changes</span>
          Seat released back to pool
        </span>
      </div>
    </div>
  );
};
