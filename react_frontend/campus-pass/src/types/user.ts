export type UserRole = 'ORGANIZER' | 'PARTICIPANT';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  studentId: string;
  institution: string;
  phone: string;
  department: string;
  profileCreated: string;
  avatarUrl?: string;
  kioskPin?: string;
  notificationsEnabled?: boolean;
}
