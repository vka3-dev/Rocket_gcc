import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ParticipantCard } from '../../components/participants/ParticipantCard';
import { CancelledParticipantCard } from '../../components/participants/CancelledParticipantCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EventPassModal } from '../../components/registrations/EventPassModal';
import type { Registration } from '../../types/registration';
import { EmptyState } from '../../components/common/EmptyState';

export const EventParticipantsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { currentUser, isOrganizer } = useAuth();
  const { events, getEventRegistrations } = useData();

  const [activeTab, setActiveTab] = useState<'registered' | 'cancelled'>('registered');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInFilter, setCheckInFilter] = useState<'all' | 'checked-in' | 'not-checked-in'>('all');
  const [selectedPassReg, setSelectedPassReg] = useState<Registration | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const event = useMemo(() => {
    const numericId = Number(eventId);
    return events.find((e) => e.id === numericId);
  }, [events, eventId]);

  // Authorization check: Only organizer who created the event can access
  const isAuthorized = isOrganizer && event && event.organizerId === currentUser.id;

  const allRegistrations = useMemo(() => {
    if (!event) return [];
    return getEventRegistrations(event.id);
  }, [event, getEventRegistrations]);

  const registeredList = useMemo(() => {
    return allRegistrations.filter((r) => r.status === 'REGISTERED');
  }, [allRegistrations]);

  const cancelledList = useMemo(() => {
    return allRegistrations.filter((r) => r.status === 'CANCELLED');
  }, [allRegistrations]);

  const filteredRegistered = useMemo(() => {
    return registeredList.filter((r) => {
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        r.userName.toLowerCase().includes(query) ||
        r.userStudentId.toLowerCase().includes(query) ||
        r.userEmail.toLowerCase().includes(query);

      if (!matchesQuery) return false;

      if (checkInFilter === 'checked-in') return r.checkInStatus === 'CHECKED_IN';
      if (checkInFilter === 'not-checked-in') return r.checkInStatus === 'NOT_CHECKED_IN';
      return true;
    });
  }, [registeredList, searchQuery, checkInFilter]);

  const filteredCancelled = useMemo(() => {
    return cancelledList.filter((r) => {
      const query = searchQuery.toLowerCase();
      return (
        r.userName.toLowerCase().includes(query) ||
        r.userStudentId.toLowerCase().includes(query) ||
        r.userEmail.toLowerCase().includes(query)
      );
    });
  }, [cancelledList, searchQuery]);

  if (!event || !isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-gutter-mobile text-center">
        <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[32px]">block</span>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Unauthorized Access
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-1">
          You can only view participant records for events that you have created as an Organizer.
        </p>
        <Link
          to="/my-events"
          className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm hover:bg-primary-container transition-all"
        >
          Back to My Events
        </Link>
      </div>
    );
  }

  const percentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
  const availableSeats = Math.max(0, event.capacity - event.registeredCount);

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Sticky Context Header */}
      <div className="w-full bg-surface-container-low px-gutter-mobile py-space-sm shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/my-events"
            className="inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors py-1 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className="font-label-lg text-label-lg">Back to My Events</span>
          </Link>
        </div>
      </div>

      <div className="w-full px-gutter-mobile pt-space-md flex flex-col gap-space-lg max-w-4xl mx-auto">
        {/* Event Overview Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md relative overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-space-sm">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                {event.category}
              </span>
              <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface font-bold tracking-tight mt-0.5">
                {event.title}
              </h1>
            </div>
            <StatusBadge status={event.status} />
          </div>

          {/* Meta stats pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">event</span> Date & Time
              </span>
              <span className="font-label-md text-label-md text-on-surface mt-0.5 truncate font-semibold">
                {event.formattedDate}
              </span>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">group</span> Capacity
              </span>
              <span className="font-label-md text-label-md text-on-surface mt-0.5 font-semibold">
                {event.capacity} Max
              </span>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">how_to_reg</span> Registered
              </span>
              <span className="font-label-md text-label-md text-primary font-bold mt-0.5">
                {event.registeredCount} Claimed
              </span>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">event_seat</span> Available
              </span>
              <span className="font-label-md text-label-md text-tertiary font-bold mt-0.5">
                {availableSeats} Left
              </span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-on-surface">
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                Attendance Fill Rate
              </span>
              <span className="font-label-sm text-label-sm font-semibold text-primary">
                {percentage}% Full ({event.registeredCount} / {event.capacity})
              </span>
            </div>
            <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Organizer Notice Banner */}
        <div className="bg-surface-container-low text-on-surface rounded-xl p-space-md shadow-sm flex items-start gap-space-sm border border-outline-variant/20">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary-container">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              Organizer Monitoring Mode
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              View registered attendees, track real-time check-ins, and inspect cancelled seats.
              Capacity is automatically adjusted when cancellations occur.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('registered')}
            className={`flex-1 py-2.5 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'registered'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-secondary hover:text-on-surface font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Registered</span>
            <span className="ml-0.5 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px]">
              {registeredList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 py-2.5 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'cancelled'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-secondary hover:text-on-surface font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
            <span>Cancelled</span>
            <span className="ml-0.5 px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary text-[11px]">
              {cancelledList.length}
            </span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-2.5">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, student ID, or email..."
              className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm"
            />
          </div>

          {activeTab === 'registered' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <div className="relative shrink-0">
                <select
                  value={checkInFilter}
                  onChange={(e) =>
                    setCheckInFilter(e.target.value as 'all' | 'checked-in' | 'not-checked-in')
                  }
                  className="appearance-none bg-surface-container-lowest text-on-surface font-label-sm text-label-sm pl-3 pr-8 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container font-medium"
                >
                  <option value="all">Check-in: All</option>
                  <option value="checked-in">Checked In</option>
                  <option value="not-checked-in">Not Checked In</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>

              <div className="ml-auto shrink-0 font-label-sm text-label-sm text-secondary px-2">
                Active: <strong>{filteredRegistered.length}</strong>
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: Registered Participants */}
        {activeTab === 'registered' && (
          <div className="flex flex-col gap-3">
            {filteredRegistered.length === 0 ? (
              <EmptyState
                icon="group_off"
                title="No registered participants"
                description={
                  searchQuery
                    ? 'No registered attendees match your search query.'
                    : 'No participants have registered for this event yet.'
                }
              />
            ) : (
              filteredRegistered.map((reg) => (
                <ParticipantCard
                  key={reg.id}
                  registration={reg}
                  onPassDetailsClick={(r) => {
                    setSelectedPassReg(r);
                    setIsPassModalOpen(true);
                  }}
                />
              ))
            )}
          </div>
        )}

        {/* TAB 2: Cancelled Participants */}
        {activeTab === 'cancelled' && (
          <div className="flex flex-col gap-3">
            {filteredCancelled.length === 0 ? (
              <EmptyState
                icon="shield_lock"
                title="No cancelled registrations"
                description="No participant has cancelled their registration for this event."
              />
            ) : (
              filteredCancelled.map((reg) => (
                <CancelledParticipantCard key={reg.id} registration={reg} />
              ))
            )}
          </div>
        )}

        {/* Pagination Info */}
        <div className="flex items-center justify-between pt-2 px-1 text-secondary">
          <span className="font-label-sm text-label-sm">
            Showing{' '}
            <strong className="text-on-surface font-semibold">
              {activeTab === 'registered' ? filteredRegistered.length : filteredCancelled.length}
            </strong>{' '}
            records
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="w-9 h-9 rounded-lg bg-surface-container-low text-secondary/40 flex items-center justify-center cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Digital Pass Modal */}
      <EventPassModal
        registration={selectedPassReg}
        event={event}
        isOpen={isPassModalOpen}
        onClose={() => {
          setIsPassModalOpen(false);
          setSelectedPassReg(null);
        }}
      />
    </div>
  );
};
