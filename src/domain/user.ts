export interface BaseUser {
  id: number;
  username: string;
}

export interface User extends BaseUser {
  email: string;
  avatarUrl: string;
  createdAt: Date;
  isAdmin: boolean;
  idRole: number;
  roleName: string;
  roleValue: string;
  access_token: string;
  expires_in: number;
}
