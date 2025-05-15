import { Task } from "@/domain/task";
import { TaskDto } from "./dto";

export function dtoToTask(dto: TaskDto): Task {
  return {
    id: dto.id_item,
    title: dto.title,
    description: dto.description,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    archivedAt: dto.archived_at,
    status: dto.status,
    dueAt: dto.due_at,
    doneAt: dto.done_at,
    priority: dto.priority,
    idProject: dto.id_project,
    idExecutive: dto.id_executive,
    idDeveloper: dto.id_developer
  };
}
