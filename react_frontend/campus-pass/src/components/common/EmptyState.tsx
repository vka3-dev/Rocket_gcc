import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm text-center flex flex-col items-center justify-center gap-space-sm ${className}`}>
      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{title}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-lg bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
