import React from 'react';
import type { Event } from '../../types/event';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';
import { CapacityBar } from '../common/CapacityBar';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  onRegisterClick: (event: Event) => void;
  onDetailsClick?: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegisterClick,
  onDetailsClick,
}) => {
  const { currentUser, isOrganizer } = useAuth();
  const { isUserRegisteredForEvent } = useData();
  const navigate = useNavigate();

  const isOwnEvent = isOrganizer && event.organizerId === currentUser.id;
  const isRegistered = isUserRegisteredForEvent(currentUser.id, event.id);

  return (
    <article className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-space-sm relative overflow-hidden transition-all hover:shadow-md">
      {/* Category & Status Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            {event.category}
          </span>
          {isRegistered ? (
            <StatusBadge status="REGISTERED" />
          ) : (
            <StatusBadge status={event.status} />
          )}
        </div>
        <button
          aria-label="Bookmark"
          className="text-outline hover:text-primary transition-colors p-1"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isRegistered ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
      </div>

      {/* Title & Image Section */}
      <div className="flex gap-3 items-center mt-1">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className={`w-16 h-16 rounded-xl object-cover shrink-0 bg-surface-container ${
              event.status === 'FULL' ? 'filter grayscale contrast-125 opacity-85' : ''
            }`}
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">event</span>
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight truncate">
            {event.title}
          </h2>
          <p className="font-label-sm text-label-sm text-secondary flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            Organized by: {event.organizerName}
          </p>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
        {event.description}
      </p>

      {/* Schedule & Location Grid */}
      <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-2.5 rounded-xl">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm font-semibold truncate">
              {event.formattedDate}
            </span>
            <span className="font-label-sm text-label-sm text-secondary">{event.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm font-semibold truncate">
              {event.location}
            </span>
            <span className="font-label-sm text-label-sm text-secondary truncate">
              {event.room}
            </span>
          </div>
        </div>
      </div>

      {/* Capacity Bar */}
      <CapacityBar registeredCount={event.registeredCount} capacity={event.capacity} />

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          onClick={() => onDetailsClick && onDetailsClick(event)}
          className="flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container"
        >
          <span className="material-symbols-outlined text-[18px]">info</span> Details
        </button>

        {isOwnEvent ? (
          <button
            onClick={() => navigate('/my-events')}
            className="flex-1 max-w-[180px] h-10 px-4 rounded-lg bg-secondary-container text-on-secondary-container font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
            Your Event
          </button>
        ) : isRegistered ? (
          <button
            onClick={() => navigate('/my-registrations')}
            className="flex-1 max-w-[180px] h-10 px-4 rounded-lg bg-surface-container text-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
            View Pass
          </button>
        ) : event.status === 'FULL' ? (
          <button
            disabled
            className="flex-1 max-w-[180px] h-10 px-4 rounded-lg bg-surface-dim text-secondary font-label-lg text-label-lg flex items-center justify-center gap-1 cursor-not-allowed opacity-80"
          >
            <span className="material-symbols-outlined text-[18px]">block</span>
            Registration Full
          </button>
        ) : event.status === 'COMPLETED' ? (
          <button
            disabled
            className="flex-1 max-w-[180px] h-10 px-4 rounded-lg bg-surface-container text-secondary font-label-lg text-label-lg flex items-center justify-center gap-1 cursor-not-allowed opacity-60"
          >
            Event Completed
          </button>
        ) : (
          <button
            onClick={() => onRegisterClick(event)}
            className="flex-1 max-w-[180px] h-10 px-4 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all hover:bg-primary-container font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            Register
          </button>
        )}
      </div>
    </article>
  );
};
