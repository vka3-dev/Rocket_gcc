import React, { useState, useMemo } from 'react';
import type { Event } from '../../types/event';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterChips } from '../../components/common/FilterChips';
import type { FilterOption } from '../../components/common/FilterChips';
import { EventCard } from '../../components/events/EventCard';
import { RegistrationModal } from '../../components/events/RegistrationModal';
import { EmptyState } from '../../components/common/EmptyState';

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Status' },
  { id: 'open', label: 'Available (Open)' },
  { id: 'full', label: 'Almost Full' },
  { id: 'registered', label: 'Registered' },
  { id: 'completed', label: 'Completed' },
];

export const BrowseEventsPage: React.FC = () => {
  const { events, isUserRegisteredForEvent } = useData();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortByDateDesc, setSortByDateDesc] = useState(false);

  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        // Search query filter
        const matchesSearch =
          evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.organizerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Status filter
        if (activeFilter === 'all') return true;
        if (activeFilter === 'open') return evt.status === 'OPEN';
        if (activeFilter === 'full') return evt.status === 'FULL';
        if (activeFilter === 'completed') return evt.status === 'COMPLETED';
        if (activeFilter === 'registered') {
          return isUserRegisteredForEvent(currentUser.id, evt.id);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortByDateDesc) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [events, searchQuery, activeFilter, isUserRegisteredForEvent, currentUser.id, sortByDateDesc]);

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Discovery Canvas Header */}
      <section className="px-gutter-mobile py-space-md flex flex-col gap-space-sm">
        <div className="flex flex-col">
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight font-bold">
            Browse Events
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Discover upcoming technical events and register to participate.
          </p>
        </div>

        {/* Stepper Progression Hint Bar */}
        <div className="mt-space-xs bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              1
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
              Select Event
            </span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline">arrow_forward</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
              2
            </span>
            <span className="font-label-sm text-label-sm text-secondary truncate font-medium">
              Claim Pass
            </span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline">arrow_forward</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">
              3
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate font-medium">
              Scan QR Day
            </span>
          </div>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col gap-space-sm mt-space-xs">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events by title, track, or organizer..."
          />

          <div className="flex items-center justify-between gap-space-sm">
            <FilterChips
              options={filterOptions}
              activeId={activeFilter}
              onSelect={setActiveFilter}
              className="flex-1"
            />
            <button
              onClick={() => setSortByDateDesc(!sortByDateDesc)}
              className="h-8 px-2.5 rounded-lg bg-surface-container-low text-on-surface flex items-center gap-1 font-label-sm text-label-sm shadow-sm shrink-0 hover:bg-surface-container font-semibold"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">sort</span>
              <span>Date {sortByDateDesc ? '↓' : '↑'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Event List */}
      <section className="px-gutter-mobile flex flex-col gap-space-md pb-space-lg">
        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No events found"
            description="No events match your current search query or filter selection."
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          />
        ) : (
          filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} onRegisterClick={handleRegisterClick} />
          ))
        )}
      </section>

      {/* Confirm Registration Modal */}
      <RegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};
