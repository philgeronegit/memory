export interface UserDto {
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
