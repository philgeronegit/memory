import { apiClient } from "../client";
import {
  CreateNoteInput,
  NoteCountDto,
  NoteDto,
  ShareNoteInput,
  UpdateNoteInput,
  UpdateNoteScoreInput
} from "./dto";

async function createNote(input: CreateNoteInput) {
  const response = await apiClient.post<NoteDto>("/note", input);
  return response.data;
}

async function deleteNote(id: number) {
  await apiClient.delete(`/note/${id}`);
}

async function getNote(id?: number) {
  const response = await apiClient.get<NoteDto>(`/note/${id}`);
  return response.data;
}

async function getNoteScore(id?: number, userId?: number) {
  const response = await apiClient.get<NoteDto>(
    `/note/${id}?user_id=${userId}`
  );
  return response.data;
}

async function getNotes() {
  const response = await apiClient.get<NoteDto[]>("/note");
  return response.data;
}

async function getUserNotes(userId?: number) {
  const url = `/user/${userId}/note`;
  const response = await apiClient.get<NoteDto[]>(url);
  return response.data;
}

async function getUserNotesCount(userId?: number) {
  const url = `/user/${userId}/note?count=true`;
  const response = await apiClient.get<NoteCountDto[]>(url);
  return response.data;
}

async function shareNote(input: ShareNoteInput) {
  const url = `/note/${input.note_id}/share`;
  const response = await apiClient.post<NoteDto>(url, {
    id_item: input.note_id,
    id_user: input.user_id
  });
  return response.data;
}

async function updateNote(input: UpdateNoteInput) {
  const response = await apiClient.put<NoteDto>(`/note/${input.id}`, input);
  return response.data;
}

async function updateNoteScore(input: UpdateNoteScoreInput) {
  const response = await apiClient.put<NoteDto>(
    `/note/${input.id}/score`,
    input
  );
  return response.data;
}

const api = {
  createNote,
  deleteNote,
  getNote,
  getNoteScore,
  getNotes,
  getUserNotes,
  getUserNotesCount,
  shareNote,
  updateNote,
  updateNoteScore
};

export default api;
