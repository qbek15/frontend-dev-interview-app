export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}
