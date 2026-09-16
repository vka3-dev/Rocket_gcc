import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterChips } from '../../components/common/FilterChips';
import type { FilterOption } from '../../components/common/FilterChips';
import { OrganizerEventCard } from '../../components/events/OrganizerEventCard';
import { CreateEventModal } from '../../components/events/CreateEventModal';
import { EmptyState } from '../../components/common/EmptyState';

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Status' },
  { id: 'open', label: 'Open' },
  { id: 'full', label: 'Full' },
  { id: 'completed', label: 'Completed' },
];

export const MyEventsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { events } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter events belonging to current organizer
  const myEvents = useMemo(() => {
    return events.filter((evt) => evt.organizerId === currentUser.id);
  }, [events, currentUser.id]);

  const totalEventsCount = myEvents.length;
  const upcomingCount = myEvents.filter((e) => e.status === 'OPEN').length;
  const completedCount = myEvents.filter((e) => e.status === 'COMPLETED').length;
  const totalPax = myEvents.reduce((acc, curr) => acc + curr.registeredCount, 0);

  const filteredEvents = useMemo(() => {
    return myEvents.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.category.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'open') return evt.status === 'OPEN';
      if (activeFilter === 'full') return evt.status === 'FULL';
      if (activeFilter === 'completed') return evt.status === 'COMPLETED';
      return true;
    });
  }, [myEvents, searchQuery, activeFilter]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto pb-12">
      {/* Top Action Header */}
      <section className="px-gutter-mobile py-space-md flex flex-col gap-space-sm bg-surface-bright">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex flex-col min-w-0">
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight font-bold">
              My Events
            </h1>
            <p className="font-body-sm text-body-sm text-secondary truncate">
              Create and manage technical events you organize.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm active:scale-95 transition-transform font-semibold hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Event</span>
          </button>
        </div>

        {/* Summary Metrics (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Total Events
              </span>
              <span className="p-1 rounded-lg bg-surface-container text-primary">
                <span className="material-symbols-outlined text-[16px]">folder_copy</span>
              </span>
            </div>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
              {totalEventsCount}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Upcoming
              </span>
              <span className="p-1 rounded-lg bg-tertiary-fixed text-tertiary">
                <span className="material-symbols-outlined text-[16px]">upcoming</span>
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                {upcomingCount}
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                Active
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Completed
              </span>
              <span className="p-1 rounded-lg bg-secondary-container text-on-secondary-container">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
              </span>
            </div>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
              {completedCount}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Registrations
              </span>
              <span className="p-1 rounded-lg bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-[16px]">group</span>
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                {totalPax}
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">Pax</span>
            </div>
          </div>
        </div>
      </section>

      {/* Controls & Filtering */}
      <section className="px-gutter-mobile py-space-sm flex flex-col gap-2.5">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search events by name or topic..."
        />

        <FilterChips
          options={filterOptions}
          activeId={activeFilter}
          onSelect={setActiveFilter}
        />
      </section>

      {/* Events Listing */}
      <section className="px-gutter-mobile py-space-sm flex flex-col gap-3.5">
        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No events found"
            description="You haven't created any events matching this criteria."
            actionLabel="Create Event"
            onAction={() => setIsCreateModalOpen(true)}
          />
        ) : (
          filteredEvents.map((evt) => <OrganizerEventCard key={evt.id} event={evt} />)
        )}
      </section>

      {/* Onboarding Banner Card */}
      <section className="px-gutter-mobile mt-2">
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3 shadow-sm border border-outline-variant/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-[22px]">celebration</span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold leading-snug">
                Planning your next technical fest?
              </p>
              <p className="font-body-sm text-body-sm text-secondary truncate">
                Create a new event to start managing registrations.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm font-semibold active:opacity-90"
          >
            + New
          </button>
        </div>
      </section>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
