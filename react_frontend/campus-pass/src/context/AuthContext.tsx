import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../types/user';
import { mockOrganizerUser, mockParticipantUser } from '../data/mockUsers';

interface AuthContextType {
  currentUser: User;
  switchRole: () => void;
  setRole: (role: UserRole) => void;
  isOrganizer: boolean;
  isParticipant: boolean;
  updateCurrentUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockParticipantUser);

  const switchRole = () => {
    if (user.role === 'ORGANIZER') {
      setUser(mockParticipantUser);
    } else {
      setUser(mockOrganizerUser);
    }
  };

  const setRole = (role: UserRole) => {
    if (role === 'ORGANIZER') {
      setUser(mockOrganizerUser);
    } else {
      setUser(mockParticipantUser);
    }
  };

  const updateCurrentUser = (updated: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        switchRole,
        setRole,
        isOrganizer: user.role === 'ORGANIZER',
        isParticipant: user.role === 'PARTICIPANT',
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
