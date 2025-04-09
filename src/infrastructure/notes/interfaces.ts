import { CreateNoteInput, NoteDto, UpdateNoteInput } from "./dto";

export interface NotesApi {
  createNote: (input: CreateNoteInput) => Promise<NoteDto>;
  updateNote: (input: UpdateNoteInput) => Promise<NoteDto>;
  deleteNote: (id: number) => Promise<void>;
  getNote: (id?: number) => Promise<NoteDto>;
  getNotes: () => Promise<NoteDto[]>;
}
