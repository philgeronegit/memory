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
  username: string;
  email: string;
  total_likes?: number;
  total_dislikes?: number;
  score?: number;
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
export interface UpdateNoteScoreInput {
  id: number;
  user_id: number;
  score: number;
}
