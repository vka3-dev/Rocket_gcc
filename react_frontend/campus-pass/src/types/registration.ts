export type RegistrationStatus = 'REGISTERED' | 'CANCELLED';
export type CheckInStatus = 'NOT_CHECKED_IN' | 'CHECKED_IN';

export interface Registration {
  id: number;
  eventId: number;
  userId: number;
  userName: string;
  userEmail: string;
  userStudentId: string;
  passCode: string; // e.g. "#REG-AI-2026-9042"
  registrationDate: string; // e.g. "18 Sep 2026, 09:14 AM"
  status: RegistrationStatus;
  checkInStatus: CheckInStatus;
  checkInTime?: string;
  cancellationDate?: string;
}
