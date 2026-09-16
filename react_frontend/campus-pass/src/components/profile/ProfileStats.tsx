import React from 'react';
import type { User } from '../../types/user';

interface ProfileStatsProps {
  user: User;
  registeredCount?: number;
  completedCount?: number;
  upcomingCount?: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  user,
  registeredCount = 8,
  completedCount = 6,
  upcomingCount = 2,
}) => {
  const isOrganizer = user.role === 'ORGANIZER';

  if (isOrganizer) {
    return (
      <>
        {/* Organizer Quick Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Organized
              </span>
              <span className="p-1.5 rounded-lg bg-primary-fixed/40 text-primary">
                <span className="material-symbols-outlined text-[18px]">campaign</span>
              </span>
            </div>
            <div>
              <div className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">
                12
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Active tech symposiums
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Attended
              </span>
              <span className="p-1.5 rounded-lg bg-secondary-container text-on-secondary-fixed-variant">
                <span className="material-symbols-outlined text-[18px]">local_activity</span>
              </span>
            </div>
            <div>
              <div className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">
                05
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Partner club passes
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Participant View
  return (
    <>
      {/* Quick Metrics Row */}
      <div className="grid grid-cols-2 gap-space-sm">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Registered
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">event_available</span>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight">
              {String(registeredCount).padStart(2, '0')}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Passes</span>
          </div>
          <p className="font-label-sm text-[11px] text-on-surface-variant mt-1">
            Total Enrolled Symposia
          </p>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Attended
            </span>
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed-dim/30 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight">
              {String(completedCount).padStart(2, '0')}
            </span>
            <span className="font-body-sm text-body-sm text-tertiary font-medium">75% Rate</span>
          </div>
          <p className="font-label-sm text-[11px] text-on-surface-variant mt-1">
            Events Checked In
          </p>
        </div>
      </div>

      {/* Academic Pass Summary Section */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Academic Pass Summary
          </h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            AY 2024–25
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Registered</span>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                {registeredCount} Events
              </span>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-tertiary-fixed-dim/40 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Completed</span>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                {completedCount} Events
              </span>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">upcoming</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Upcoming</span>
              <span className="font-headline-sm text-headline-sm font-semibold text-primary">
                {upcomingCount} Active
              </span>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Verified Scans</span>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                {completedCount} Scans
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
