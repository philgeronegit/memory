import { CreateNoteInput, UpdateNoteInput, UpdateNoteScoreInput } from "./dto";
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

  async updateNoteScore(input: UpdateNoteScoreInput) {
    const note = await this.api.updateNoteScore(input);
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

  async getNoteScore(id?: number, userId?: number) {
    if (!id || !userId) {
      return null;
    }
    const score = await this.api.getNoteScore(id, userId);
    return score;
  }

  async getNotes() {
    const notes = await this.api.getNotes();
    return notes.map(dtoToNote);
  }
}
