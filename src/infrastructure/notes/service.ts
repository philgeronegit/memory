import { CreateNoteInput, UpdateNoteInput, UpdateNoteScoreInput } from "./dto";
import { NotesApi } from "./interfaces";
import { dtoToNote, dtoToNoteCount } from "./transform";

export class NotesService {
  constructor(private api: NotesApi) {
    this.api = api;
  }

  async createNote(input: CreateNoteInput) {
    const note = await this.api.createNote(input);
    return dtoToNote(note);
  }

  async deleteNote(id: number) {
    await this.api.deleteNote(id);
  }

  async getNote(id?: number) {
    console.log("🚀 ~ NotesService ~ getNote ~ id:", id);
    if (!id) {
      return null;
    }
    const note = await this.api.getNote(id);
    console.log("🚀 ~ NotesService ~ getNote ~ note:", id, note);
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

  async getUserNotes(userId?: number) {
    const notes = await this.api.getUserNotes(userId);
    console.log("🚀 ~ NotesService ~ getUserNotes ~ notes:", notes);
    return notes.map(dtoToNote);
  }

  async getUserNotesCount(userId?: number) {
    const notes = await this.api.getUserNotesCount(userId);
    return notes.map(dtoToNoteCount);
  }

  async updateNote(input: UpdateNoteInput) {
    const note = await this.api.updateNote(input);
    return dtoToNote(note);
  }

  async updateNoteScore(input: UpdateNoteScoreInput) {
    const note = await this.api.updateNoteScore(input);
    return dtoToNote(note);
  }
}
