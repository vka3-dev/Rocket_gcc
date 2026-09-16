import type { User } from '../types/user';

export const mockOrganizerUser: User = {
  id: 1,
  name: 'Arun Kumar',
  email: 'arun@example.com',
  role: 'ORGANIZER',
  studentId: 'STU-2024-8842',
  institution: 'Apex Institute of Technology, Dept of CSE',
  phone: '+1 (555) 349-2041',
  department: 'Computer Science & Engineering',
  profileCreated: '15 Jan 2025',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlLEwX1uopPz9lqD-J3EMluoU5YuMaocUkdEhzrA4d6vE_1w1artpUeujg34xQN3rpC0qal14mnKdEVMCKeCjoN5lkmEUfyMj5oepyHm8P4FUCIVELzmXkWpugLKFnbUi_MrY6HQfYeeFneOmzU9RE8uKvoMBuzpLm8F04vdsFFvEN8b3JH6eATetmM__RtGVRaxm0BYWmTug5fnksTKBQy0Jpzbwyec2h5GANcavNKPM27dVyTJOh',
  kioskPin: '9421',
  notificationsEnabled: true,
};

export const mockParticipantUser: User = {
  id: 2,
  name: 'Priya Sharma',
  email: 'priya@example.com',
  role: 'PARTICIPANT',
  studentId: 'STU-2024-1042',
  institution: 'Apex Institute of Technology',
  phone: '+1 (555) 892-4012',
  department: 'Information Technology',
  profileCreated: '15 Jan 2025',
  avatarUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1U_ZG2wL2E6vitA-qgXYPO4mlDabx5cA0hJpFcGaS5aEfh9HIMhU5AnGA69FjjtJ0eUQ8wOfz-gtW6JTdnlDstAYR6wEj8BZfmm1Lou9ENIdUHwT9gLLtOU31fA5AMdyAj3iBojyYy43OG1kOZf2I6YQjoSBoezqUtzUuiHdEAuAiRfOSeYPPuxWc79yPV6hb8xFerYxhsRIdY3mOBWeyQrkJMg-5HLSLXL7azRi3RBrF3UgvcFW3Ph1z0',
  kioskPin: '4928',
  notificationsEnabled: true,
};

export const mockUsers: User[] = [mockOrganizerUser, mockParticipantUser];
