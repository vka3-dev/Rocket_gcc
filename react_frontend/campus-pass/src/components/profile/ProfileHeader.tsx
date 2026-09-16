import React from 'react';
import type { User } from '../../types/user';

interface ProfileHeaderProps {
  user: User;
  onEditClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditClick }) => {
  const isOrganizer = user.role === 'ORGANIZER';

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-center gap-space-md min-w-0">
          <div className="relative flex-shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xl ring-2 ring-primary/20">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary"
              title="Active Credential"
            >
              <span className="material-symbols-outlined text-[10px]">verified</span>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                {user.name}
              </h2>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-tertiary-fixed-dim/20 text-tertiary font-label-sm text-[10px] uppercase font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1 animate-pulse" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant mt-0.5 min-w-0">
              <span className="material-symbols-outlined text-[15px] text-primary shrink-0">mail</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {user.email}
              </span>
              <span
                className="material-symbols-outlined text-[14px] text-tertiary-container shrink-0"
                title="Institution Verified"
              >
                verified_user
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant/80 truncate mt-0.5">
              {user.institution}
            </p>
          </div>
        </div>

        <button
          onClick={onEditClick}
          aria-label="Edit Profile"
          className="flex-shrink-0 p-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </div>

      <div className="flex items-center justify-between pt-space-xs border-t-0 bg-surface-container-low/70 p-space-sm rounded-lg px-space-md py-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            {isOrganizer ? 'Tier 2 Identity Status' : 'Tier 1 Identity Status'}
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2.5 py-0.5 rounded-full uppercase">
          {user.role}
        </span>
      </div>
    </div>
  );
};
