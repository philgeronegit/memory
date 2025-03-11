"use client";
import { useGetProjects } from "@/application/get-projects";

import { Button } from "@/components/ui/button";
import useNotesStore from "@/store/useNotesStore";
import { NodeApi, Tree } from "react-arborist";
import { AddNoteDialog } from "./add-note-dialog";

export function Notes() {
  const { setSelectedNoteId } = useNotesStore();
  const { projects, isLoading, error } = useGetProjects();

  const data = projects?.map((project) => {
    return {
      id: String(project.id),
      name: project.name,
      children: project.notes?.map((note) => {
        return {
          id: String(note.id),
          name: note.title
        };
      })
    };
  });

  // async function onNoteClick(id: number) {
  //   setSelectedNoteId(id);
  // }

  function onSelect(node: NodeApi[]) {
    console.log("🚀 ~ onSelect ~ node:", node);

    if (node[0]?.id) {
      console.log("🚀 ~ onSelect ~ node[0]?.id:", node[0]?.id);
      setSelectedNoteId(Number(node[0]?.id));
    }
  }

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Notes
      </h3>

      {error && <p>Error: {error.message}</p>}
      {!isLoading && <Tree initialData={data} onSelect={onSelect} />}
      {isLoading && <p>Loading...</p>}

      <AddNoteDialog>
        <Button>Ajouter une note</Button>
      </AddNoteDialog>
    </div>
  );
}
