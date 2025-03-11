import { CreateNoteInput, NoteDto } from "./dto";

export interface NotesApi {
  createNote: (input: CreateNoteInput) => Promise<NoteDto>;
  getNote: (id?: number) => Promise<NoteDto>;
  getNotes: () => Promise<NoteDto[]>;
}
