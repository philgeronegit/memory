import { useCreateNote } from "../mutations/use-create-note";

export const ErrorMessages = {
  NotAuthenticated: "You must be signed in to add a note.",
  UnknownError: "An unknown error occurred. Please try again later."
} as const;

interface AddNoteInput {
  title: string;
  content: string;
  type: string;
  is_public: boolean;
  id_programming_language: number;
  id_project?: number;
  id_developer: number;
}

interface Dependencies {
  createNote: ReturnType<typeof useCreateNote>["mutateAsync"];
}

async function addNote(
  { title, content }: AddNoteInput,
  { createNote }: Dependencies
) {
  try {
    await createNote({
      title,
      content,
      type,
      is_public,
      id_programming_language,
      id_project,
      id_developer
    });

    return { error: undefined };
  } catch {
    return { error: ErrorMessages.UnknownError };
  }
}

export function useAddNote() {
  const createNote = useCreateNote();

  return {
    mutateAsync: async (input: AddNoteInput) =>
      addNote(input, { createNote: createNote.mutateAsync }),
    isLoading: createNote.isPending,
    isError: createNote.isError
  };
}
