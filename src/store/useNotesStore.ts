import { create } from "zustand";

export interface NotesState {
  noteContent?: string;
  selectedNoteId?: number;
  setNoteContent: (noteContent: string) => void;
  setSelectedNoteId: (id: number) => void;
}

const useNotesStore = create<NotesState>((set) => ({
  noteContent: undefined,
  selectedNoteId: undefined,
  setNoteContent: (noteContent) => set({ noteContent }),
  setSelectedNoteId: (id: number) => set({ selectedNoteId: id })
}));

export default useNotesStore;
