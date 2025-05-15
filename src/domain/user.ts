export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  isAdmin: boolean;
  idRole: number;
  roleName: string;
  roleValue: string;
}
