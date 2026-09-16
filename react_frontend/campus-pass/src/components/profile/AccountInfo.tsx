import React from 'react';
import type { User } from '../../types/user';

interface AccountInfoProps {
  user: User;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
  const isOrganizer = user.role === 'ORGANIZER';

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
      <div className="flex items-center gap-2 pb-1">
        <span className="material-symbols-outlined text-primary text-[20px]">
          admin_panel_settings
        </span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          Account & Privileges
        </h3>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Current Role Tier
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded uppercase">
              {isOrganizer ? 'Tier 2 Organizer' : 'Student Participant'}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {isOrganizer
              ? 'Can create departmental events, issue pass credentials & participate in cross-campus partner symposiums.'
              : 'Eligible to register for college technical symposia, claim digital passes, and perform contactless venue check-in.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Profile Created
            </span>
            <span className="font-body-md text-body-md text-on-surface font-semibold mt-0.5">
              {user.profileCreated}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {isOrganizer ? 'Symposiums Hosted' : 'Symposia Attended'}
            </span>
            <span className="font-body-md text-body-md text-on-surface font-semibold mt-0.5">
              {isOrganizer ? '12 Published' : '6 Completed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
