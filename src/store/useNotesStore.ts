import { User } from "@/domain/user";
import { RoleUser } from "@/lib/auth";
import { create } from "zustand";

export interface NotesState {
  user?: User;
  roleUser?: RoleUser;
  noteContent?: string;
  selectedNoteId?: number;
  setUser: (user: User | undefined) => void;
  setRoleUser: (roleUser: RoleUser | undefined) => void;
  setNoteContent: (noteContent: string) => void;
  setSelectedNoteId: (id: number) => void;
}

const useNotesStore = create<NotesState>((set) => ({
  user: undefined,
  roleUser: undefined,
  noteContent: undefined,
  selectedNoteId: undefined,
  setUser: (user) => set({ user }),
  setRoleUser: (roleUser) => set({ roleUser }),
  setNoteContent: (noteContent) => set({ noteContent }),
  setSelectedNoteId: (id: number) => set({ selectedNoteId: id })
}));

export default useNotesStore;
