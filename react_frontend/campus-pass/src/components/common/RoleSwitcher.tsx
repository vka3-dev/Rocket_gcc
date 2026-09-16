import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, switchRole } = useAuth();

  return (
    <div className="fixed bottom-20 right-4 z-40 bg-on-surface text-inverse-on-surface px-3 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md opacity-90 hover:opacity-100 transition-opacity border border-outline-variant/30">
      <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">swap_horiz</span>
      <span>Role: <strong className="text-primary-fixed">{currentUser.role}</strong></span>
      <button
        onClick={switchRole}
        className="ml-1 px-2.5 py-1 rounded-full bg-primary text-on-primary hover:bg-primary-container active:scale-95 transition-transform"
      >
        Switch
      </button>
    </div>
  );
};
