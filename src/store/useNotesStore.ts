import { Comment, Note } from "@/domain";
import { create } from "zustand";

export interface NotesState {
  notes: Note[];
  comments: Comment[];
  selectedNoteId?: number;
  setSelectedNoteId: (id: number) => void;
  setNotes: (notes: Note[]) => void;
  setComments: (comments: Comment[]) => void;
  addNote: (note: Note) => void;
  removeNote: (note: Note) => void;
}

const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  comments: [],
  selectedNoteId: undefined,
  setSelectedNoteId: (id: number) => set({ selectedNoteId: id }),
  setNotes: (notes) => set({ notes }),
  setComments: (comments) => set({ comments }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  removeNote: (note) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== note.id)
    }))
}));

export default useNotesStore;
