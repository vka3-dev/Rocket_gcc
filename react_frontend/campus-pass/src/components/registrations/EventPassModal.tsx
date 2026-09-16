import React, { useState } from 'react';
import type { Registration } from '../../types/registration';
import type { Event } from '../../types/event';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface EventPassModalProps {
  registration: Registration | null;
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventPassModal: React.FC<EventPassModalProps> = ({
  registration,
  event,
  isOpen,
  onClose,
}) => {
  const { currentUser } = useAuth();
  const { showToast } = useData();
  const [saved, setSaved] = useState(false);

  if (!isOpen || !registration) return null;

  const handleSaveToWallet = () => {
    setSaved(true);
    showToast('Pass saved to wallet', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-on-background/60 backdrop-blur-[4px] transition-opacity duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-xl max-h-[85vh] overflow-y-auto transform transition-all animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95">
        {/* Modal Top Toolbar */}
        <div className="sticky top-0 z-10 bg-surface-container-lowest/90 backdrop-blur px-space-md pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-on-surface-variant">
              Live Entrance Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Ticket Shell */}
        <div className="p-space-md pt-0 space-y-space-md">
          <div className="relative bg-surface rounded-2xl shadow-md overflow-hidden border border-outline-variant/30">
            {/* Indigo Header Strip */}
            <div className="bg-primary text-on-primary p-space-md relative overflow-hidden">
              <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-white/10 blur-xl"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                    stars
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold text-primary-fixed">
                    CampusPass
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-on-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                  OFFICIAL PASS
                </span>
              </div>
              <div className="mt-space-md">
                <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wide">
                  Pass {registration.passCode}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-white leading-snug">
                  {event?.title || 'Campus Event'}
                </h3>
                <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                  Apex Tech Campus • {event?.category || 'Technical Track'}
                </p>
              </div>
            </div>

            {/* Participant Info Bar */}
            <div className="px-space-md py-space-sm bg-surface-container-high/60 flex items-center justify-between">
              <div>
                <span className="block font-label-sm text-label-sm text-outline">
                  Participant Name
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {registration.userName || currentUser.name}
                </span>
              </div>
              <div className="text-right">
                <span className="block font-label-sm text-label-sm text-outline">
                  Student ID
                </span>
                <span className="font-label-md text-label-md font-mono text-primary font-semibold">
                  {registration.userStudentId || currentUser.studentId}
                </span>
              </div>
            </div>

            {/* Mid Event Details */}
            <div className="p-space-md grid grid-cols-2 gap-space-sm text-left">
              <div>
                <span className="block font-label-sm text-label-sm text-outline">
                  Date & Time
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  {event?.formattedDate || 'Upcoming'}
                </span>
                <span className="block font-body-sm text-body-sm text-on-surface-variant">
                  {event?.time || '10:00 AM IST'}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-outline">
                  Venue & Hall
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  {event?.location || 'Turing Auditorium'}
                </span>
                <span className="block font-body-sm text-body-sm text-on-surface-variant">
                  {event?.room || 'Lab 4'}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-outline">Organizer</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">
                  {event?.organizerName || 'Tech Club'}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-outline">
                  Status
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  {registration.checkInStatus === 'CHECKED_IN' ? 'Checked In' : 'Confirmed'}
                </span>
              </div>
            </div>

            {/* Perforated Ticket Divider with Notched Sides */}
            <div className="relative flex items-center justify-center my-1">
              <div className="absolute -left-3 w-6 h-6 rounded-full bg-surface-container-lowest shadow-inner"></div>
              <div className="w-full flex items-center justify-center px-6">
                <div className="w-full border-t-2 border-dashed border-outline-variant"></div>
              </div>
              <div className="absolute -right-3 w-6 h-6 rounded-full bg-surface-container-lowest shadow-inner"></div>
            </div>

            {/* High-Contrast Authentic QR Code Section */}
            <div className="p-space-md text-center space-y-space-sm bg-surface-container-lowest">
              <div className="inline-flex p-3 bg-white rounded-xl shadow-md border border-outline-variant/30">
                <svg className="w-40 h-40 text-on-surface" viewBox="0 0 120 120" fill="currentColor">
                  {/* Outer Corner Finder 1 (Top Left) */}
                  <rect x="10" y="10" width="30" height="30" rx="4" />
                  <rect x="16" y="16" width="18" height="18" fill="#ffffff" />
                  <rect x="21" y="21" width="8" height="8" />
                  {/* Outer Corner Finder 2 (Top Right) */}
                  <rect x="80" y="10" width="30" height="30" rx="4" />
                  <rect x="86" y="16" width="18" height="18" fill="#ffffff" />
                  <rect x="91" y="21" width="8" height="8" />
                  {/* Outer Corner Finder 3 (Bottom Left) */}
                  <rect x="10" y="80" width="30" height="30" rx="4" />
                  <rect x="16" y="86" width="18" height="18" fill="#ffffff" />
                  <rect x="21" y="91" width="8" height="8" />
                  {/* Data Points */}
                  <rect x="46" y="14" width="6" height="6" />
                  <rect x="58" y="14" width="6" height="6" />
                  <rect x="68" y="20" width="6" height="6" />
                  <rect x="48" y="26" width="8" height="6" />
                  <rect x="60" y="32" width="6" height="6" />
                  <rect x="14" y="46" width="6" height="6" />
                  <rect x="26" y="52" width="6" height="6" />
                  <rect x="34" y="46" width="6" height="6" />
                  <rect x="14" y="60" width="8" height="6" />
                  {/* Center Accent Block */}
                  <rect x="48" y="48" width="10" height="10" rx="2" fill="#3525cd" />
                  <rect x="62" y="48" width="6" height="6" />
                  <rect x="72" y="56" width="6" height="6" />
                  <rect x="50" y="62" width="6" height="6" />
                  <rect x="60" y="62" width="10" height="6" />
                  {/* Right Matrix */}
                  <rect x="80" y="48" width="6" height="8" />
                  <rect x="92" y="52" width="8" height="6" />
                  <rect x="104" y="48" width="6" height="6" />
                  <rect x="84" y="62" width="6" height="6" />
                  <rect x="96" y="64" width="6" height="6" />
                  {/* Bottom Alignment */}
                  <rect x="48" y="82" width="8" height="6" />
                  <rect x="60" y="80" width="6" height="8" />
                  <rect x="70" y="86" width="6" height="6" />
                  <rect x="54" y="94" width="8" height="6" />
                  <rect x="68" y="96" width="6" height="8" />
                  <rect x="84" y="84" width="8" height="8" rx="2" />
                  <rect x="98" y="82" width="6" height="6" />
                  <rect x="90" y="96" width="12" height="6" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 font-mono font-bold text-label-md text-on-surface">
                  {registration.passCode}
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto">
                  Present this QR at the venue entrance kiosk for rapid gate check-in
                </p>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-2 flex justify-center items-center gap-1 opacity-70">
                <span className="w-0.5 h-6 bg-on-surface"></span>
                <span className="w-1 h-6 bg-on-surface"></span>
                <span className="w-0.5 h-6 bg-on-surface"></span>
                <span className="w-1.5 h-6 bg-on-surface"></span>
                <span className="w-0.5 h-6 bg-on-surface"></span>
                <span className="w-0.5 h-6 bg-on-surface"></span>
                <span className="w-1.5 h-6 bg-on-surface"></span>
                <span className="w-1 h-6 bg-on-surface"></span>
                <span className="w-0.5 h-6 bg-on-surface"></span>
                <span className="w-2 h-6 bg-on-surface"></span>
                <span className="w-0.5 h-6 bg-on-surface"></span>
                <span className="w-1 h-6 bg-on-surface"></span>
              </div>
            </div>
          </div>

          {/* Pass Action Toolbar */}
          <div className="flex gap-space-sm pt-1 pb-2">
            <button
              onClick={handleSaveToWallet}
              className="flex-1 h-11 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all font-semibold hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">
                {saved ? 'task_alt' : 'download'}
              </span>
              <span>{saved ? 'Saved to Wallet' : 'Save to Wallet'}</span>
            </button>
            <button
              onClick={onClose}
              className="h-11 px-space-md bg-surface-container text-on-surface rounded-xl font-label-lg text-label-lg font-semibold hover:bg-surface-container-high"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
