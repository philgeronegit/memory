export interface DeveloperDto {
  id_user: number;
  username: string;
  email: string;
  avatar_url: string;
  created_at: Date;
  is_admin: boolean;
  id_role: number;
  role_name: string;
  role_value: string;
}

export interface CreateDeveloperInput {
  username: string;
  email: string;
  password: string;
  avatar_url: string;
  is_admin: boolean;
  id_role: number;
}

export interface UpdateDeveloperInput {
  id: number;
  username?: string;
  email?: string;
  avatar_url?: string;
  is_admin?: boolean;
  id_role?: number;
}
