import React, { createContext, useContext, useState } from 'react';
import type { Event } from '../types/event';
import type { Registration } from '../types/registration';
import { mockEvents } from '../data/mockEvents';
import { mockRegistrations } from '../data/mockRegistrations';
import type { User } from '../types/user';

interface ToastInfo {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface DataContextType {
  events: Event[];
  registrations: Registration[];
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
  registerForEvent: (eventId: number, user: User) => boolean;
  cancelRegistration: (registrationId: number) => void;
  createEvent: (newEvent: {
    title: string;
    description: string;
    organizerId: number;
    organizerName: string;
    date: string;
    formattedDate: string;
    time: string;
    location: string;
    room: string;
    capacity: number;
    category: string;
  }) => Event;
  checkInParticipant: (registrationId: number) => void;
  getUserRegistrations: (userId: number) => Registration[];
  getEventRegistrations: (eventId: number) => Registration[];
  isUserRegisteredForEvent: (userId: number, eventId: number) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isUserRegisteredForEvent = (userId: number, eventId: number): boolean => {
    return registrations.some(
      (r) => r.userId === userId && r.eventId === eventId && r.status === 'REGISTERED'
    );
  };

  const registerForEvent = (eventId: number, user: User): boolean => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return false;

    // Check if event is full
    if (targetEvent.registeredCount >= targetEvent.capacity) {
      showToast('Registration full for this event', 'error');
      return false;
    }

    // Check if already registered
    if (isUserRegisteredForEvent(user.id, eventId)) {
      showToast('You are already registered for this event', 'info');
      return false;
    }

    const newRegId = Math.max(0, ...registrations.map((r) => r.id)) + 1;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newReg: Registration = {
      id: newRegId,
      eventId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userStudentId: user.studentId,
      passCode: `#REG-${targetEvent.category.substring(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      registrationDate: `${dateStr}, ${timeStr}`,
      status: 'REGISTERED',
      checkInStatus: 'NOT_CHECKED_IN',
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Update event capacity & status
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const newCount = e.registeredCount + 1;
          const newStatus = newCount >= e.capacity ? 'FULL' : e.status;
          return { ...e, registeredCount: newCount, status: newStatus };
        }
        return e;
      })
    );

    showToast('Pass generated! Added to My Passes', 'success');
    return true;
  };

  const cancelRegistration = (registrationId: number) => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === registrationId) {
          return { ...r, status: 'CANCELLED', cancellationDate: dateStr };
        }
        return r;
      })
    );

    // Update event capacity & status back to OPEN
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === reg.eventId) {
          const newCount = Math.max(0, e.registeredCount - 1);
          const newStatus = e.status === 'FULL' ? 'OPEN' : e.status;
          return { ...e, registeredCount: newCount, status: newStatus };
        }
        return e;
      })
    );

    showToast('Registration cancelled. Seat returned to campus pool.', 'info');
  };

  const createEvent = (newEventData: {
    title: string;
    description: string;
    organizerId: number;
    organizerName: string;
    date: string;
    formattedDate: string;
    time: string;
    location: string;
    room: string;
    capacity: number;
    category: string;
  }): Event => {
    const newId = Math.max(0, ...events.map((e) => e.id)) + 1;
    const createdDateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newEvt: Event = {
      ...newEventData,
      id: newId,
      registeredCount: 0,
      status: 'OPEN',
      createdAt: createdDateStr,
    };

    setEvents((prev) => [newEvt, ...prev]);
    showToast(`Event "${newEventData.title}" created successfully!`, 'success');
    return newEvt;
  };

  const checkInParticipant = (registrationId: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === registrationId) {
          return { ...r, checkInStatus: 'CHECKED_IN', checkInTime: timeStr };
        }
        return r;
      })
    );

    showToast('Checked in successfully ✓', 'success');
  };

  const getUserRegistrations = (userId: number) => {
    return registrations.filter((r) => r.userId === userId);
  };

  const getEventRegistrations = (eventId: number) => {
    return registrations.filter((r) => r.eventId === eventId);
  };

  return (
    <DataContext.Provider
      value={{
        events,
        registrations,
        toasts,
        showToast,
        removeToast,
        registerForEvent,
        cancelRegistration,
        createEvent,
        checkInParticipant,
        getUserRegistrations,
        getEventRegistrations,
        isUserRegisteredForEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
