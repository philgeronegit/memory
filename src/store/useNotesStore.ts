import { User } from "@/domain/user";
import { Roles, RoleUser } from "@/lib/auth";
import { authCookies } from "@/lib/auth-cookies";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface NotesState {
  isLoggedIn: boolean;
  user?: User;
  roleUser?: RoleUser;
  noteContent?: string;
  selectedNoteId?: number;
  setLoggedIn: (isLoggedIn: boolean, token?: string) => void;
  setUser: (user: User | undefined) => void;
  setRoleUser: (roleUser: RoleUser | undefined) => void;
  setNoteContent: (noteContent: string) => void;
  setSelectedNoteId: (id: number) => void;
}
const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      user: undefined,
      roleUser: undefined,
      noteContent: undefined,
      selectedNoteId: undefined,
      isLoggedIn: false,
      setLoggedIn: (isLoggedIn, token) => {
        set({ isLoggedIn });
        if (isLoggedIn && token) {
          // Store the access token in the auth cookie
          authCookies.setAuthCookie(token);
        } else {
          // Clear auth cookies when user logs out
          authCookies.clearAllAuthCookies();
          set({ user: undefined, roleUser: undefined });
        }
      },
      setUser: (user) => {
        set({ user });
        if (user) {
          authCookies.setUserCookie(user);
          set({
            roleUser: { id: user.id, role: user.roleValue as keyof Roles }
          });
        } else {
          authCookies.removeUserCookie();
        }
      },
      setRoleUser: (roleUser) => set({ roleUser }),
      setNoteContent: (noteContent) => set({ noteContent }),
      setSelectedNoteId: (id: number) => set({ selectedNoteId: id })
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedNoteId: state.selectedNoteId })
    }
  )
);

export default useNotesStore;
