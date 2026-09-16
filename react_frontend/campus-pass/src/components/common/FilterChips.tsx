import React from 'react';

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  activeId,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1 overflow-x-auto py-1 no-scrollbar ${className}`}>
      {options.map((opt) => {
        const isActive = opt.id === activeId;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 shadow-sm transition-all ${
              isActive
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
