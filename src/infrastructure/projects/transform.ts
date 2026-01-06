import { Project } from "@/domain/project";
import { dtoToUser } from '@/infrastructure/users/transform';
import { ProjectDto } from "./dto";

export function dtoToProject(dto: ProjectDto): Project {
  const project = {
    id: dto.id_project,
    name: dto.name,
    description: dto.description,
    accessType: dto.access_type,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at ?? null,
    archivedAt: dto.archived_at ?? null,
    userIds: dto.id_users?.split(",").map(Number) ?? null,
    userNames: dto.users?.split(",") ?? null,
    users: JSON.parse(dto.users_json || "[]").map(dtoToUser),
    noteIds: dto.id_notes?.split(",").map(Number) ?? null
  };

  return project;
}
