import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { currentUser, isOrganizer } = useAuth();
  const location = useLocation();

  // Determine label based on current route
  const getPageLabel = () => {
    switch (location.pathname) {
      case '/profile':
        return 'Profile';
      case '/events':
        return 'Browse Events';
      case '/my-events':
        return 'My Events';
      case '/my-registrations':
        return 'My Registered Events';
      default:
        if (location.pathname.includes('/participants')) {
          return 'Event Participants';
        }
        return 'CampusPass';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm max-w-4xl mx-auto w-full">
        {/* Logo and Brand */}
        <div className="flex items-center gap-space-sm min-w-0">
          <Link to="/events" className="flex items-center gap-space-sm min-w-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-lg flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">
              CampusPass
            </span>
          </Link>
          <span
            className={`inline-flex items-center px-space-xs py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-semibold ${
              isOrganizer
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-secondary-container text-on-secondary-fixed-variant'
            }`}
          >
            {currentUser.role}
          </span>
        </div>

        {/* User Info & Profile Avatar */}
        <div className="flex items-center gap-space-sm flex-shrink-0">
          <span className="hidden sm:inline-block font-label-md text-label-md text-on-surface-variant font-medium">
            {getPageLabel()}
          </span>
          <Link
            to="/profile"
            className="flex items-center justify-center p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40"
            title={`${currentUser.name} (${currentUser.role})`}
          >
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
