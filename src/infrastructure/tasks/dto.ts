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
  task_order: number;
}

export interface BulkUpdateTaskOrderInput {
  tasks: UpdateTaskOrderInput[];
}

export interface CreateTaskInput {
  title: string;
  description: string;
  id_status: number;
  id_project: number;
  id_executive?: number;
  id_developer?: number;
  priority?: string;
}

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string;
  id_status?: string;
  order?: number;
}

export interface UpdateTaskOrderInput {
  id: number;
  order: number;
  status?: string;
}


