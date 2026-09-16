import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { PersonalInfo } from '../../components/profile/PersonalInfo';
import { AccountInfo } from '../../components/profile/AccountInfo';
import { PreferencesSection } from '../../components/profile/PreferencesSection';
import { EditProfileModal } from '../../components/profile/EditProfileModal';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserRegistrations } = useData();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const userRegistrations = getUserRegistrations(currentUser.id);
  const registeredCount = userRegistrations.filter((r) => r.status === 'REGISTERED').length;
  const completedCount = userRegistrations.filter((r) => r.checkInStatus === 'CHECKED_IN').length;
  const upcomingCount = userRegistrations.filter(
    (r) => r.status === 'REGISTERED' && r.checkInStatus === 'NOT_CHECKED_IN'
  ).length;

  return (
    <div className="flex flex-col w-full px-gutter-mobile py-space-md space-y-space-md max-w-2xl mx-auto">
      {/* Title Area */}
      <div className="flex flex-col gap-1">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
          My Profile
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your personal details and campus event credentials.
        </p>
      </div>

      {/* Profile Header */}
      <ProfileHeader user={currentUser} onEditClick={() => setIsEditOpen(true)} />

      {/* Role-Adaptive Quick Metrics & Stats */}
      <ProfileStats
        user={currentUser}
        registeredCount={registeredCount || 8}
        completedCount={completedCount || 6}
        upcomingCount={upcomingCount || 2}
      />

      {/* Personal Information */}
      <PersonalInfo user={currentUser} />

      {/* Account & Privileges */}
      <AccountInfo user={currentUser} />

      {/* Preferences & Credentials */}
      <PreferencesSection user={currentUser} />

      {/* Footer Footnote */}
      <div className="flex flex-col items-center justify-center py-2 text-center text-on-surface-variant gap-1 pt-4">
        <div className="flex items-center gap-1.5 font-label-sm text-label-sm opacity-80">
          <span className="material-symbols-outlined text-[14px]">shield</span>
          Apex Institute Academic Identity Mesh v2.4
        </div>
        <p className="font-body-sm text-[11px] opacity-60">
          Connected with apex.edu single sign-on
        </p>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};
