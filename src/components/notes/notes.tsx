"use client";

import { useGetProjects } from "@/application/get-projects";
import { useDeleteNote } from "@/application/mutations/use-delete-note";
import { useUpdateNote } from "@/application/mutations/use-update-note";
import { useNote } from "@/application/queries/use-note";
import useNotesStore from "@/store/useNotesStore";
import { FilePlus, FolderPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NodeApi, Tree } from "react-arborist";
import { useMeasure } from "react-use";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { AddNoteDialog } from "./add-note-dialog";
import { Node } from "./node";

export function Notes() {
  const { setNoteContent, selectedNoteId, setSelectedNoteId } = useNotesStore();
  const { projects, notes, isLoading, error } = useGetProjects();
  const { data: note } = useNote({
    noteId: selectedNoteId
  });
  const [term, setTerm] = useState("");
  const treeRef = useRef(null);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const [ref, { width, height }] = useMeasure();
  const treeWidth = width - 10;
  const treeHeight = height;

  useEffect(() => {
    if (note) {
      setNoteContent(note.content);
    }
  }, [note, setNoteContent]);

  const notesForTree =
    notes?.map((note) => {
      return {
        id: String(note.id),
        name: note.title,
        isNote: true,
        projectId: null,
        children: []
      };
    }) || [];
  const projectsForTree =
    projects?.map((project) => {
      return {
        id: String(project.id),
        name: project.name,
        children: project.notes?.map((note) => {
          return {
            id: String(note.id),
            name: note.title,
            isNote: true,
            projectId: note.projectId,
            children: []
          };
        })
      };
    }) || [];
  const data = projectsForTree.concat(notesForTree);

  function onSelect(node: NodeApi[]) {
    if (node[0]?.id) {
      setSelectedNoteId(Number(node[0]?.id));
    }
  }

  const onRename = async ({ id, name }: { id: string; name: string }) => {
    console.log("🚀 ~ onRename ~ id, name:", id, typeof id, name);
    if (!treeRef.current) {
      return;
    }

    const node = treeRef.current.get(id);
    if (node) {
      node.data.name = name;

      await updateNote.mutateAsync({
        id: Number(id),
        title: name
      });
    }
  };
  const onDelete = async ({ ids }: { ids: string[] }) => {
    console.log("onDelete", ids);
    if (!ids.length) {
      return;
    }

    await deleteNote.mutateAsync(Number(ids[0]));
  };
  const onCreate = async ({ parentId, index, type }) => {
    console.log(
      "🚀 ~ onCreate ~ parentId, index, type:",
      parentId,
      index,
      type
    );
    const newNode = {
      id: String(Date.now()), // Generate a unique ID for the new node
      name: type === "folder" ? "New Folder" : "New Note",
      children: type === "folder" ? [] : undefined
    };
    return newNode;
  };
  const onMove = ({
    dragIds,
    parentId,
    index
  }: {
    dragIds: string[];
    parentId: number;
    index: number;
  }) => {
    console.log("onMove", dragIds, parentId, index);
  };

  const createFileFolder = (
    <>
      <button
        onClick={() => treeRef.current?.createInternal(treeRef.current.root.id)}
        title="Nouveau projet">
        <FolderPlus />
      </button>
      <button
        onClick={() => treeRef.current?.createLeaf(treeRef.current.root.id)}
        title="Nouvelle note">
        <FilePlus />
      </button>
    </>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner>Chargement des notes...</Spinner>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Erreur : {error.message}</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col gap-1 h-full" ref={ref}>
        <Input
          type="text"
          placeholder="Recherche..."
          className="search-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <div className="">{createFileFolder}</div>
        <div className="h-ful">
          <Tree
            ref={treeRef}
            data={data}
            width={treeWidth}
            height={treeHeight}
            searchTerm={term}
            searchMatch={(node, term) =>
              node.data.name.toLowerCase().includes(term.toLowerCase())
            }
            onSelect={onSelect}
            onRename={onRename}
            onDelete={onDelete}
            onCreate={onCreate}
            onMove={onMove}>
            {Node}
          </Tree>
        </div>
      </div>
      <div className="absolute bottom-2 ml-2">
        <AddNoteDialog>
          <div className="flex justify-end">
            <Button>Ajouter une note</Button>
          </div>
        </AddNoteDialog>
      </div>
    </div>
  );
}
