export interface TaskDto {
  id_item: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string;
  status: string;
  due_at: string;
  done_at: string;
  priority: string;
  id_project: number;
  id_executive: number;
  id_developer: number;
}

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string;
  id_status?: string;
}
