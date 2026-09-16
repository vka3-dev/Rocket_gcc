import type { Registration } from '../types/registration';
import { mockRegistrations } from '../data/mockRegistrations';

export const registrationService = {
  getAllRegistrations(): Registration[] {
    return [...mockRegistrations];
  },

  getRegistrationsByUser(userId: number): Registration[] {
    return mockRegistrations.filter((r) => r.userId === userId);
  },

  getRegistrationsByEvent(eventId: number): Registration[] {
    return mockRegistrations.filter((r) => r.eventId === eventId);
  },
};
