export interface Note {
  id: number;
  title: string;
  content: string;
  type: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt?: string;
  archivedAt?: string;
  projectId?: number;
  username: string;
  email: string;
  totalLikes?: number;
  totalDislikes?: number;
  score?: number;
}

export function getNoteById(notes?: Note[], noteId?: number) {
  if (!noteId || !notes) return;
  return notes.find((u) => u.id === noteId);
}
