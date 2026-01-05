import {
  CreateNoteInput,
  NoteCountDto,
  NoteDto,
  ShareNoteInput,
  UpdateNoteInput,
  UpdateNoteScoreInput
} from "./dto";

export interface NotesApi {
  createNote: (input: CreateNoteInput) => Promise<NoteDto>;
  deleteNote: (id: number) => Promise<void>;
  getNote: (id?: number) => Promise<NoteDto>;
  getNoteScore: (id?: number, userId?: number) => Promise<NoteDto>;
  getNotes: () => Promise<NoteDto[]>;
  getUserNotes: (userId?: number) => Promise<NoteDto[]>;
  getUserNotesCount: (userId?: number) => Promise<NoteCountDto[]>;
  shareNote: (input: ShareNoteInput) => Promise<NoteDto>;
  updateNote: (input: UpdateNoteInput) => Promise<NoteDto>;
  updateNoteScore: (input: UpdateNoteScoreInput) => Promise<NoteDto>;
}
