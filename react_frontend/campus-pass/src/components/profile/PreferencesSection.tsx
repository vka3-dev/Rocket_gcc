import React, { useState } from 'react';
import type { User } from '../../types/user';
import { useData } from '../../context/DataContext';

interface PreferencesSectionProps {
  user: User;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({ user }) => {
  const { showToast } = useData();
  const [notificationsActive, setNotificationsActive] = useState(
    user.notificationsEnabled ?? true
  );
  const [pinRevealed, setPinRevealed] = useState(false);

  const toggleNotifications = () => {
    const next = !notificationsActive;
    setNotificationsActive(next);
    showToast(next ? 'Pass alerts activated' : 'Pass alerts muted', 'info');
  };

  const togglePin = () => {
    setPinRevealed(!pinRevealed);
  };

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out of CampusPass on this device?')) {
      showToast('Signing out...', 'info');
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
        Preferences & Credentials
      </h3>

      <div className="flex flex-col gap-3 mt-1">
        {/* Pass Notifications Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">notifications_active</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body-md text-body-md text-on-surface font-medium">
                Pass Notifications
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Instant gate alerts & seat RSVP
              </span>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={notificationsActive}
            onClick={toggleNotifications}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none flex items-center ${
              notificationsActive ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-on-primary shadow-md transform transition-transform duration-200 ease-in-out ${
                notificationsActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Digital Kiosk PIN */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">pin</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body-md text-body-md text-on-surface font-medium">
                Digital Kiosk Pass PIN
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono tracking-widest text-on-surface font-bold">
                  {pinRevealed ? user.kioskPin || '4928' : '••••'}
                </span>
                <span className="text-[11px] font-label-sm text-on-surface-variant">
                  (Offline check-in)
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={togglePin}
            aria-label="Toggle PIN Visibility"
            className="p-2 rounded-md hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">
              {pinRevealed ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={handleSignOut}
            className="w-full py-2.5 px-space-md rounded-lg bg-surface-container-lowest text-error font-label-lg text-label-lg shadow-sm hover:bg-error-container/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] font-semibold border border-error/20"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out of CampusPass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
