import { CreateNoteInput, UpdateNoteInput } from "./dto";
import { NotesApi } from "./interfaces";
import { dtoToNote } from "./transform";

export class NotesService {
  constructor(private api: NotesApi) {
    this.api = api;
  }

  async createNote(input: CreateNoteInput) {
    const note = await this.api.createNote(input);
    return dtoToNote(note);
  }

  async updateNote(input: UpdateNoteInput) {
    const note = await this.api.updateNote(input);
    return dtoToNote(note);
  }

  async deleteNote(id: number) {
    await this.api.deleteNote(id);
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
