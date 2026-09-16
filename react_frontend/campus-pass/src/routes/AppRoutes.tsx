import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { BrowseEventsPage } from '../pages/BrowseEvents/BrowseEventsPage';
import { MyEventsPage } from '../pages/MyEvents/MyEventsPage';
import { MyRegistrationsPage } from '../pages/MyRegistrations/MyRegistrationsPage';
import { EventParticipantsPage } from '../pages/EventParticipants/EventParticipantsPage';
import { ProfilePage } from '../pages/Profile/ProfilePage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/events" replace />} />
      <Route path="/events" element={<BrowseEventsPage />} />
      <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={['ORGANIZER']}>
            <MyEventsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event/:eventId/participants"
        element={
          <ProtectedRoute allowedRoles={['ORGANIZER']}>
            <EventParticipantsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/my-registrations" element={<MyRegistrationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
