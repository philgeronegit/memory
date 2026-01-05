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
  programming_language_name: string;
  id_project?: number;
  project_name?: string;
  id_user: number;
  username: string;
  email: string;
  tags?: string;
  total_likes?: number;
  total_dislikes?: number;
  score?: number;
  access_type?: string;
}

export interface NoteCountDto {
  month: string;
  month_name: string;
  item_count: number;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  type: string;
  is_public: boolean;
  id_programming_language?: number;
  id_project?: number;
  id_user: number;
}

export interface ShareNoteInput {
  note_id: number;
  user_id: number;
}

export interface UpdateNoteInput {
  id: number;
  title?: string;
  content?: string;
  is_public?: boolean;
  id_project?: number;
  id_programming_language?: number;
}

export interface UpdateNoteScoreInput {
  id: number;
  user_id: number;
  score: number;
}
