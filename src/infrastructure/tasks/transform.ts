import { Task } from "@/domain";
import { TaskDto } from "./dto";

export function dtoToTask(dto: TaskDto): Task {
  return {
    id: dto.id_item,
    name: dto.name,
    isDone: dto.is_done,
    priority: dto.priority,
    dueDate: dto.due_date
  };
}
