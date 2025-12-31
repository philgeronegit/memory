export interface Note {
  id: number;
  idUser: number;
  title: string;
  content: string;
  type: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt?: string;
  archivedAt?: string;
  projectId?: number;
  projectName?: string;
  username: string;
  email: string;
  tags: string[];
  totalLikes?: number;
  totalDislikes?: number;
  score?: number;
  accessType?: string;
  programmingLanguage?: string;
  programmingLanguageId?: number;
}

export function getNoteById(notes?: Note[], noteId?: number) {
  if (!noteId || !notes) return;
  return notes.find((u) => u.id === noteId);
}
