import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { createEvent } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('10:00 AM IST');
  const [location, setLocation] = useState('');
  const [room, setRoom] = useState('');
  const [capacity, setCapacity] = useState(100);
  const [category, setCategory] = useState('Hackathon');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Format date string e.g. "15 Oct 2026"
    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    createEvent({
      title: title.trim(),
      description: description.trim() || 'Join us for this exciting technical symposium on campus!',
      organizerId: currentUser.id,
      organizerName: currentUser.name,
      date,
      formattedDate,
      time,
      location: location.trim() || 'Main Campus Hall',
      room: room.trim() || 'Lab 1',
      capacity: Number(capacity) || 100,
      category,
    });

    // Reset & close
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-200 p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-surface-container-lowest rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
              Create New Event
            </h2>
            <span className="font-label-sm text-label-sm text-tertiary font-medium">
              Newly created events automatically launch with status 'Open'
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Event Name */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface-variant font-medium">
              Event Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Quantum Computing Summit"
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary outline-none focus:bg-surface-container"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface-variant font-medium">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of topic, keynotes, or tracks..."
              className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary outline-none focus:bg-surface-container resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Start Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM IST"
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md outline-none"
              />
            </div>
          </div>

          {/* Venue & Room */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Venue
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Turing Auditorium"
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary outline-none focus:bg-surface-container"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Room / Lab
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Lab 4"
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary outline-none focus:bg-surface-container"
              />
            </div>
          </div>

          {/* Max Capacity & Category */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Max Capacity *
              </label>
              <input
                type="number"
                min="5"
                max="1000"
                required
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 pl-3 pr-7 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none outline-none"
                >
                  <option value="Machine Learning & AI">Machine Learning & AI</option>
                  <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
                  <option value="Decentralized Systems">Decentralized Systems</option>
                  <option value="Cybersecurity & Forensics">Cybersecurity & Forensics</option>
                  <option value="Quantum Computing">Quantum Computing</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-3 text-secondary text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-surface-container-high text-on-surface font-label-lg text-label-lg active:bg-surface-container-highest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1 font-semibold hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Create Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
