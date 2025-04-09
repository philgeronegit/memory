export interface NoteDto {
  id_note: number;
  title: string;
  content: string;
  type: string;
  is_public: boolean;
  created_at: string;
  updated_at?: string;
  archived_at?: string;
  id_programming_language: number;
  id_project?: number;
  id_user: number;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  type: string;
  is_public: boolean;
  id_programming_language: number;
  id_project?: number;
  id_user: number;
}
export interface UpdateNoteInput {
  id: number;
  title?: string;
  content?: string;
  is_public?: boolean;
}
