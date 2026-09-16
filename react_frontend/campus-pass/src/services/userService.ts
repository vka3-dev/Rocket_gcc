import type { User } from '../types/user';
import { mockOrganizerUser, mockParticipantUser, mockUsers } from '../data/mockUsers';

export const userService = {
  getOrganizerUser(): User {
    return { ...mockOrganizerUser };
  },

  getParticipantUser(): User {
    return { ...mockParticipantUser };
  },

  getUserById(id: number): User | undefined {
    return mockUsers.find((u) => u.id === id);
  },
};
