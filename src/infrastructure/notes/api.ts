import { apiClient } from "../client";
import { CreateNoteInput, NoteDto, UpdateNoteInput } from "./dto";

async function createNote(input: CreateNoteInput) {
  const response = await apiClient.post<NoteDto>("/note", input);
  return response.data;
}

async function updateNote(input: UpdateNoteInput) {
  const response = await apiClient.put<NoteDto>(`/note/${input.id}`, input);
  return response.data;
}

async function deleteNote(id: number) {
  await apiClient.delete(`/note/${id}`);
}

async function getNote(id?: number) {
  const response = await apiClient.get<NoteDto>(`/note/${id}`);
  return response.data;
}

async function getNotes() {
  const response = await apiClient.get<NoteDto[]>("/note");
  return response.data;
}

const api = { createNote, deleteNote, getNote, getNotes, updateNote };

export default api;
