import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const BottomNav: React.FC = () => {
  const { isOrganizer } = useAuth();

  const organizerLinks = [
    { to: '/events', label: 'Browse Events', icon: 'explore' },
    { to: '/my-events', label: 'My Events', icon: 'calendar_month' },
    { to: '/my-registrations', label: 'My Registrations', icon: 'confirmation_number' },
    { to: '/profile', label: 'Profile', icon: 'person' },
  ];

  const participantLinks = [
    { to: '/events', label: 'Browse Events', icon: 'explore' },
    { to: '/my-registrations', label: 'My Passes', icon: 'confirmation_number' },
    { to: '/profile', label: 'Profile', icon: 'account_circle' },
  ];

  const links = isOrganizer ? organizerLinks : participantLinks;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(11,28,48,0.05)] border-t border-outline-variant/20">
      <div className="flex justify-around items-center h-16 px-gutter-mobile max-w-2xl mx-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[60px] h-14 transition-colors ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`
            }
          >
            <span className="material-symbols-outlined text-[24px]">{link.icon}</span>
            <span className="font-label-sm text-label-sm">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
