import type { Event } from '../types/event';
import { mockEvents } from '../data/mockEvents';

export const eventService = {
  getAllEvents(): Event[] {
    return [...mockEvents];
  },

  getEventById(id: number): Event | undefined {
    return mockEvents.find((e) => e.id === id);
  },

  getEventsByOrganizer(organizerId: number): Event[] {
    return mockEvents.filter((e) => e.organizerId === organizerId);
  },
};
