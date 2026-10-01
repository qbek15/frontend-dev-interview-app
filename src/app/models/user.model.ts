export type Role = 'admin' | 'editor' | 'viewer';

export type Status = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: string;
}
