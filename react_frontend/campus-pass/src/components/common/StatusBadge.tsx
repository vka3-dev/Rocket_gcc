import React from 'react';
import type { EventStatus } from '../../types/event';

interface StatusBadgeProps {
  status: EventStatus | 'UPCOMING' | 'REGISTERED' | 'CANCELLED' | 'CHECKED_IN' | 'NOT_CHECKED_IN' | 'LIVE_NOW';
  checkInTime?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, checkInTime, className = '' }) => {
  switch (status) {
    case 'OPEN':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse"></span>
          Open
        </span>
      );
    case 'FULL':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold ${className}`}>
          <span className="material-symbols-outlined text-[12px]">lock</span>
          Full
        </span>
      );
    case 'COMPLETED':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold ${className}`}>
          <span className="material-symbols-outlined text-[12px]">done_all</span>
          Completed
        </span>
      );
    case 'UPCOMING':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold uppercase ${className}`}>
          Upcoming
        </span>
      );
    case 'REGISTERED':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold ${className}`}>
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          Registered
        </span>
      );
    case 'CANCELLED':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-semibold ${className}`}>
          <span className="material-symbols-outlined text-[14px]">event_busy</span>
          Cancelled
        </span>
      );
    case 'CHECKED_IN':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold ${className}`}>
          <span className="material-symbols-outlined text-[14px]">done_all</span>
          Checked In {checkInTime ? `• ${checkInTime}` : '✓'}
        </span>
      );
    case 'NOT_CHECKED_IN':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
          Not Checked In
        </span>
      );
    case 'LIVE_NOW':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold uppercase ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-ping"></span>
          Live Now
        </span>
      );
    default:
      return null;
  }
};
