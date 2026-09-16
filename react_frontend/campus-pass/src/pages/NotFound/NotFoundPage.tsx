import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-gutter-mobile text-center">
      <div className="w-16 h-16 rounded-full bg-surface-container text-secondary flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[32px]">map</span>
      </div>
      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
        404 — Page Not Found
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-1">
        The page or resource you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/events"
        className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm hover:bg-primary-container transition-all"
      >
        Back to Browse Events
      </Link>
    </div>
  );
};
