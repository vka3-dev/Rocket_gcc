import React from 'react';
import type { Event } from '../../types/event';
import { StatusBadge } from '../common/StatusBadge';
import { useNavigate } from 'react-router-dom';

interface OrganizerEventCardProps {
  event: Event;
  onPreviewClick?: (event: Event) => void;
}

export const OrganizerEventCard: React.FC<OrganizerEventCardProps> = ({
  event,
  onPreviewClick,
}) => {
  const navigate = useNavigate();
  const percentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
  const availableSeats = Math.max(0, event.capacity - event.registeredCount);

  return (
    <article
      className={`p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3 transition-all hover:shadow-md ${
        event.status === 'COMPLETED' ? 'opacity-90' : ''
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col min-w-0">
          <span className="font-label-sm text-label-sm text-secondary">
            Created {event.createdAt}
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight mt-0.5 truncate font-bold">
            {event.title}
          </h2>
        </div>
        <StatusBadge status={event.status} />
      </div>

      {/* Schedule & Venue Details */}
      <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-surface-container-low">
        <div className="flex items-center gap-2 text-secondary">
          <span className="material-symbols-outlined text-[16px] text-primary">event</span>
          <span className="font-body-sm text-body-sm text-on-surface">
            {event.formattedDate} • {event.time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
            {event.location} & {event.room}
          </span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between font-label-sm text-label-sm">
          <span className={`font-semibold ${event.status === 'FULL' ? 'text-error' : 'text-on-surface'}`}>
            Capacity Fill: {percentage}%
          </span>
          <span className={event.status === 'FULL' ? 'text-error font-semibold' : 'text-tertiary font-semibold'}>
            {event.status === 'FULL' ? 'Sold out' : `${availableSeats} seats left`}
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              event.status === 'FULL'
                ? 'bg-error'
                : event.status === 'COMPLETED'
                ? 'bg-secondary'
                : 'bg-primary-container'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm">
          <span>
            Registered: <strong className="text-on-surface">{event.registeredCount}</strong>
          </span>
          <span>
            Max: <strong className="text-on-surface">{event.capacity}</strong>
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <button
          onClick={() => navigate(`/event/${event.id}/participants`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-transform hover:bg-primary font-semibold"
        >
          <span className="material-symbols-outlined text-[16px]">groups</span>
          <span>Participants</span>
          <span className="px-1.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
            {event.registeredCount}
          </span>
        </button>
        <button
          onClick={() => onPreviewClick && onPreviewClick(event)}
          className="inline-flex items-center justify-center gap-1 h-10 px-3 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md active:bg-surface-container hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>Preview</span>
        </button>
        <button
          aria-label="Edit Event"
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-low text-secondary active:text-on-surface hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </button>
      </div>
    </article>
  );
};
