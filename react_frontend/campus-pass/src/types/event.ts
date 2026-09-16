export type EventStatus = 'OPEN' | 'FULL' | 'COMPLETED';

export interface Event {
  id: number;
  title: string;
  description: string;
  organizerId: number;
  organizerName: string;
  date: string; // e.g. "2026-09-24"
  formattedDate: string; // e.g. "24 Sep 2026"
  time: string; // e.g. "10:00 AM IST"
  location: string; // e.g. "Turing Auditorium"
  room: string; // e.g. "Lab 4"
  capacity: number;
  registeredCount: number;
  status: EventStatus;
  category: string;
  imageUrl?: string;
  createdAt: string;
}
