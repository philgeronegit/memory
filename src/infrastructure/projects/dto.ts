export interface ProjectDto {
  id_project: number;
  name: string;
  description: string;
  access_type: string;
  created_at: string;
  updated_at: string | null;
  archived_at: string | null;
  created_by_id: number;
  created_by_name: string;
  id_users?: string | null;
  users?: string | null;
  users_json?: string | null;
  id_notes?: string | null;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface UpdateProjectInput {
  id: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
