import React, { useState, useMemo } from 'react';
import type { Registration } from '../../types/registration';
import type { Event } from '../../types/event';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RegistrationCard } from '../../components/registrations/RegistrationCard';
import { EventPassModal } from '../../components/registrations/EventPassModal';
import { CancellationModal } from '../../components/registrations/CancellationModal';
import { EmptyState } from '../../components/common/EmptyState';

export const MyRegistrationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserRegistrations, events } = useData();

  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'cancelled'>('active');
  const [selectedPass, setSelectedPass] = useState<{
    registration: Registration;
    event?: Event;
  } | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [selectedCancel, setSelectedCancel] = useState<{
    registration: Registration;
    event?: Event;
  } | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const userRegistrations = getUserRegistrations(currentUser.id);

  // Calculate metrics
  const totalRegisteredCount = userRegistrations.length;
  const activePasses = useMemo(() => {
    return userRegistrations.filter(
      (r) =>
        r.status === 'REGISTERED' &&
        events.find((e) => e.id === r.eventId)?.status !== 'COMPLETED'
    );
  }, [userRegistrations, events]);

  const pastPasses = useMemo(() => {
    return userRegistrations.filter(
      (r) =>
        r.status === 'REGISTERED' &&
        events.find((e) => e.id === r.eventId)?.status === 'COMPLETED'
    );
  }, [userRegistrations, events]);

  const cancelledPasses = useMemo(() => {
    return userRegistrations.filter((r) => r.status === 'CANCELLED');
  }, [userRegistrations]);

  const checkedInCount = userRegistrations.filter(
    (r) => r.checkInStatus === 'CHECKED_IN'
  ).length;

  const currentTabList =
    activeTab === 'active'
      ? activePasses
      : activeTab === 'past'
      ? pastPasses
      : cancelledPasses;

  const handleViewPass = (registration: Registration, event?: Event) => {
    setSelectedPass({ registration, event });
    setIsPassModalOpen(true);
  };

  const handleCancelClick = (registration: Registration, event?: Event) => {
    setSelectedCancel({ registration, event });
    setIsCancelModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-gutter-mobile space-y-space-lg">
      {/* Header Section */}
      <div className="space-y-space-xs pt-space-xs">
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            Pass Vault
          </span>
        </div>
        <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight font-bold">
          My Registered Events
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          View and manage the events you have registered for.
        </p>
      </div>

      {/* Summary Metric Cards (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-space-sm">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Total Registered
            </span>
            <span className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">event_available</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold leading-none">
              {totalRegisteredCount}
            </span>
            <span className="block font-label-sm text-label-sm text-outline mt-0.5">
              Lifetime passes
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Upcoming
            </span>
            <span className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
              <span className="material-symbols-outlined text-[18px]">upcoming</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg text-primary font-bold leading-none">
              {activePasses.length} Active
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant mt-0.5">
              Upcoming tracks
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Completed
            </span>
            <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">history_edu</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold leading-none">
              {pastPasses.length} Past
            </span>
            <span className="block font-label-sm text-label-sm text-outline mt-0.5">
              Archived record
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Checked In
            </span>
            <span className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg text-tertiary-container font-bold leading-none">
              {checkedInCount} Verified
            </span>
            <span className="block font-label-sm text-label-sm text-tertiary-container mt-0.5">
              Gate cleared
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Segmented Filters */}
      <div className="flex items-center p-1 bg-surface-container rounded-xl gap-1">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-all text-center ${
            activeTab === 'active'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
        >
          Active Passes ({activePasses.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-all text-center ${
            activeTab === 'past'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
        >
          Past Events ({pastPasses.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-all text-center ${
            activeTab === 'cancelled'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
        >
          Cancelled ({cancelledPasses.length})
        </button>
      </div>

      {/* List Container */}
      <div className="space-y-space-md">
        {currentTabList.length === 0 ? (
          <EmptyState
            icon={activeTab === 'cancelled' ? 'shield_lock' : 'confirmation_number'}
            title={
              activeTab === 'cancelled'
                ? 'No cancelled registrations'
                : activeTab === 'past'
                ? 'No past event passes'
                : 'No active event passes'
            }
            description={
              activeTab === 'cancelled'
                ? 'Your active seats are protected and confirmed on the campus registry.'
                : 'Browse available events and register to claim your campus pass.'
            }
          />
        ) : (
          currentTabList.map((reg) => {
            const evt = events.find((e) => e.id === reg.eventId);
            return (
              <RegistrationCard
                key={reg.id}
                registration={reg}
                event={evt}
                onViewPass={handleViewPass}
                onCancelClick={handleCancelClick}
              />
            );
          })
        )}
      </div>

      {/* Digital Pass Modal */}
      <EventPassModal
        registration={selectedPass?.registration || null}
        event={selectedPass?.event || null}
        isOpen={isPassModalOpen}
        onClose={() => {
          setIsPassModalOpen(false);
          setSelectedPass(null);
        }}
      />

      {/* Cancellation Modal */}
      <CancellationModal
        registration={selectedCancel?.registration || null}
        event={selectedCancel?.event || null}
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedCancel(null);
        }}
      />
    </div>
  );
};
