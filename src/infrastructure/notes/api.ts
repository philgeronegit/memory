import { apiClient } from "../client";
import { CreateNoteInput, NoteDto } from "./dto";

async function createNote(input: CreateNoteInput) {
  const response = await apiClient.post<NoteDto>("/note", input);
  console.log("create note api", response);
  return response.data;
}

async function getNote(id?: number) {
  const response = await apiClient.get<NoteDto>(`/note/${id}`);
  return response.data;
}

async function getNotes() {
  const response = await apiClient.get<NoteDto[]>("/note");
  return response.data;
}

const api = { createNote, getNote, getNotes };

export default api;
