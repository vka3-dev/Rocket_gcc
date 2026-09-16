import React, { useState } from 'react';
import type { User } from '../../types/user';
import { useData } from '../../context/DataContext';

interface PersonalInfoProps {
  user: User;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const { showToast } = useData();
  const [copied, setCopied] = useState(false);

  const handleCopyRoll = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(user.studentId).then(() => {
        setCopied(true);
        showToast('Student ID copied!', 'success');
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      showToast(`ID: ${user.studentId}`, 'info');
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Personal Information
          </h3>
        </div>
        <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 bg-tertiary-fixed-dim/20 px-2 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        {/* Full Name */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              person
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Full Legal Name
              </span>
              <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                {user.name}
              </span>
            </div>
          </div>
        </div>

        {/* Institutional Email */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              alternate_email
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Institutional Email
              </span>
              <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                {user.email}
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-tertiary-container text-[18px]">
            verified
          </span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              call
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Phone Number
              </span>
              <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                {user.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Institution */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              school
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Home Institution
              </span>
              <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                {user.institution}
              </span>
            </div>
          </div>
        </div>

        {/* Student Identity Roll */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary-fixed/30 group">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Student Identity Roll
              </span>
              <span className="font-body-md text-body-md text-on-surface font-mono font-semibold tracking-wider">
                {user.studentId}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopyRoll}
            aria-label="Copy Roll Number"
            className="p-2 rounded-md hover:bg-primary-fixed transition-colors text-primary focus:outline-none active:scale-95 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
            {copied && <span className="font-label-sm text-label-sm text-tertiary">Copied</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
