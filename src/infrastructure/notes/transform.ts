import { Note } from "@/domain";
import { NoteDto } from "./dto";

export function dtoToNote(dto: NoteDto): Note {
  return {
    id: dto.id_note,
    title: dto.title,
    content: dto.content,
    type: dto.type,
    isPublic: dto.is_public,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    archivedAt: dto.archived_at,
    projectId: dto.id_project
  };
}
