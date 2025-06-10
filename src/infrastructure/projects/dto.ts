export interface ProjectDto {
  id_project: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string | null;
  archived_at: string | null;
  id_user: number;
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
