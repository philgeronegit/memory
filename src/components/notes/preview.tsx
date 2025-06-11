"use client";

import { NoteMarkdown } from "@/components/notes/note-markdown";
import useNotesStore from "@/store/useNotesStore";

export function Preview() {
  const { noteContent } = useNotesStore();

  if (!noteContent) {
    return <p>Pas de note sélectionnée</p>;
  }

  return <NoteMarkdown noteContent={noteContent} />;
}
