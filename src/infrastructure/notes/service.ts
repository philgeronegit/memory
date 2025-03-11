import { CreateNoteInput } from "./dto";
import { NotesApi } from "./interfaces";
import { dtoToNote } from "./transform";

export class NotesService {
  constructor(private api: NotesApi) {
    this.api = api;
  }

  async createNote(input: CreateNoteInput) {
    const note = await this.api.createNote(input);
    console.log("createNote", note);
    return dtoToNote(note);
  }

  async getNote(id?: number) {
    if (!id) {
      return null;
    }
    const note = await this.api.getNote(id);
    return dtoToNote(note);
  }

  async getNotes() {
    const notes = await this.api.getNotes();
    return notes.map(dtoToNote);
  }
}
