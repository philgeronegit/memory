import { Note } from "@/domain/note";
import { NoteCount } from "@/domain/note-count";
import { NoteCountDto, NoteDto } from "./dto";

export function dtoToNote(dto: NoteDto): Note {
  return {
    id: dto.id_note,
    idUser: dto.id_user,
    title: dto.title,
    content: dto.content,
    type: dto.type,
    isPublic: dto.is_public,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    archivedAt: dto.archived_at,
    projectId: dto.id_project,
    projectName: dto.project_name,
    username: dto.username,
    email: dto.email,
    tags: dto.tags?.split(",") ?? [],
    totalLikes: dto.total_likes,
    totalDislikes: dto.total_dislikes,
    score: dto.score,
    accessType: dto.access_type,
    programmingLanguage: dto.programming_language_name,
    programmingLanguageId: dto.id_programming_language
  };
}

export function dtoToNoteCount(dto: NoteCountDto): NoteCount {
  return {
    month: dto.month,
    monthName: dto.month_name,
    itemCount: dto.item_count
  };
}
