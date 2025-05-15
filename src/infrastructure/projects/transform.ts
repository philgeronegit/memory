import { Project } from "@/domain/project";
import { ProjectDto } from "./dto";

export function dtoToProject(dto: ProjectDto): Project {
  return {
    id: dto.id_project,
    name: dto.name,
    description: dto.description,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at ?? null,
    archivedAt: dto.archived_at ?? null
  };
}
