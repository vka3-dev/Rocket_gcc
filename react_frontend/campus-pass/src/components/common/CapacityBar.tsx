import React from 'react';

interface CapacityBarProps {
  registeredCount: number;
  capacity: number;
  showLabels?: boolean;
  className?: string;
}

export const CapacityBar: React.FC<CapacityBarProps> = ({
  registeredCount,
  capacity,
  showLabels = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.round((registeredCount / capacity) * 100));
  const availableSeats = Math.max(0, capacity - registeredCount);
  const isFull = registeredCount >= capacity;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {showLabels && (
        <div className="flex justify-between items-center font-label-sm text-label-sm">
          <span className="text-secondary font-medium">
            Capacity: {registeredCount} / {capacity} Registered
          </span>
          <span className={isFull ? 'text-error font-bold' : 'text-tertiary font-bold'}>
            {isFull ? '0 seats left' : `${availableSeats} seats available`}
          </span>
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isFull ? 'bg-error' : percentage >= 80 ? 'bg-primary-container' : 'bg-tertiary-container'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
