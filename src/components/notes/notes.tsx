"use client";

import { useGetProjects } from "@/application/get-projects";
import { useDeleteNote } from "@/application/mutations/use-delete-note";
import { useDeleteProject } from "@/application/mutations/use-delete-project";
import { useUpdateNote } from "@/application/mutations/use-update-note";
import { useUpdateProject } from "@/application/mutations/use-update-project";
import { useNote } from "@/application/queries/use-note";
import { SearchSelect } from "@/components/notes";
import { NoteItem } from "@/components/notes/note-item";
import { AddProjectDialog } from "@/components/projects";
import { Note } from "@/domain/note";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { Folder, NotebookPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NodeApi, Tree, TreeApi } from "react-arborist";
import { useMeasure } from "react-use";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { AddNoteDialog } from "./add-note-dialog";
import { Node } from "./node";

import { SEARCH_VALUES } from "@/components/notes/search-select";

export function Notes() {
  const { roleUser, setNoteContent, selectedNoteId, setSelectedNoteId } =
    useNotesStore();
  const userId = roleUser?.id;
  const { projects, notes, isLoading, error } = useGetProjects(userId);
  const { data: note } = useNote({
    noteId: selectedNoteId
  });
  const [term, setTerm] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_VALUES.TEXT.value);
  const treeRef = useRef<TreeApi<NoteItem> | null>(null);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [ref, { width, height }] = useMeasure();
  const treeWidth = width - 10;
  const treeHeight = height;
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    isNote: boolean;
  } | null>(null);

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
        isPublic: note.isPublic,
        isShared: note.accessType === 'shared',
        projectId: null,
        tags: note.tags,
        children: []
      };
    }) || [];
  const projectsForTree =
    projects?.map((project) => {
      return {
        id: String(project.id),
        name: project.name,
        isNote: false, // Add isNote property for projects
        isPublic: false, // Add isPublic property for projects
        isShared: project.isShared,
        children: project.notes?.map((note: Note) => {
          return {
            id: String(note.id),
            name: note.title,
            isNote: true,
            isPublic: note.isPublic,
            isShared: note.accessType === 'shared',
            projectId: note.projectId,
            projectName: note.projectName,
            tags: note.tags,
            children: []
          };
        })
      };
    }) || [];
  const data = projectsForTree.concat(notesForTree);

  function onSelect(node: NodeApi[]) {
    if (node[0]?.id && node[0]?.data?.isNote) {
      setSelectedNoteId(Number(node[0]?.id));
    }
  }

  const onRename = async ({ id, name }: { id: string; name: string }) => {
    if (!treeRef.current) {
      return;
    }

    const node = treeRef.current.get(id);
    if (node) {
      node.data.name = name;

      if (!node.data.isNote) {
        await updateProject.mutateAsync({
          id: Number(id),
          name
        });
      } else {
        await updateNote.mutateAsync({
          id: Number(id),
          title: name
        });
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      if (!deleteTarget.isNote) {
        await deleteProject.mutateAsync(Number(deleteTarget.id));
      } else {
        await deleteNote.mutateAsync(Number(deleteTarget.id));
      }
      setDeleteTarget(null);
    }
  };

  const onCreate = async ({
    parentId,
    index,
    type
  }: {
    parentId: string | null;
    index: number;
    type: string;
  }) => {
    const newNode = {
      id: String(Date.now()), // Generate a unique ID for the new node
      name: type === "folder" ? "New Folder" : "New Note",
      children: type === "folder" ? [] : undefined
    };
    return newNode;
  };

  const onMove = async ({
    dragIds,
    parentId,
    index
  }: {
    dragIds: string[];
    parentId: string | null;
    index: number;
  }) => {
    const nodeId = dragIds[0];
    const projectId = parentId;
    if (projectId) {
      await updateNote.mutateAsync({
        id: Number(nodeId),
        id_project: Number(projectId)
      });
    }
  };

  const handleSearchMatch = (
    node: NodeApi<NoteItem>,
    term: string
  ): boolean => {
    if (!term) {
      return true; // Show all nodes when search term is empty
    }

    switch (searchType) {
      case SEARCH_VALUES.TEXT.value:
        return node.data.name.toLowerCase().includes(term.toLowerCase());
      case SEARCH_VALUES.TAG.value:
        return Array.isArray(node.data.tags)
          ? node.data.tags.some((tag) =>
            tag.toLowerCase().includes(term.toLowerCase())
          )
          : false;
      case SEARCH_VALUES.PROJECT.value:
        return typeof node.data.projectName === "string"
          ? node.data.projectName.toLowerCase().includes(term.toLowerCase())
          : false;
      default:
        // Default to title search if no specific type is selected
        return node.data.name.toLowerCase().includes(term.toLowerCase());
    }
  };

  // const createFileFolder = (
  //   <>
  //     <button
  //       onClick={() => treeRef.current?.createInternal(treeRef.current.root.id)}
  //       title="Nouveau projet">
  //       <FolderPlus />
  //     </button>
  //     <button
  //       onClick={() => treeRef.current?.createLeaf(treeRef.current.root.id)}
  //       title="Nouvelle note">
  //       <FilePlus />
  //     </button>
  //   </>
  // );

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
    <div className="">
      <div
        className="flex flex-col gap-1"
        ref={ref as unknown as React.RefObject<HTMLDivElement>}>
        <div className="flex flex-row items-center gap-1">
          <h5 className="text-primary scroll-m-20 text-sm font-semibold tracking-tight basis-2/3">
            Recherche par
          </h5>
          <SearchSelect onValueChange={setSearchType} />
        </div>
        <Input
          type="search"
          placeholder="Recherche..."
          className="search-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {/* <div className="">{createFileFolder}</div> */}
        <div id="tree-container" className="h-[75vh]">
          <Tree
            ref={treeRef}
            data={data}
            width={treeWidth}
            height={treeHeight}
            searchTerm={term}
            searchMatch={handleSearchMatch}
            onSelect={onSelect}
            onRename={onRename}
            onCreate={onCreate}
            onMove={onMove}>
            {Node}
          </Tree>
        </div>
      </div>
      <div className="absolute bottom-2 ml-2 pb-4 flex gap-2">
        {hasPermission(roleUser, "create:notes") && (
          <AddNoteDialog>
            <Button size="icon" title="Ajouter une note">
              <NotebookPen />
            </Button>
          </AddNoteDialog>
        )}
        {hasPermission(roleUser, "create:projects") && (
          <AddProjectDialog>
            <Button size="icon" title="Ajouter un projet">
              <Folder />
            </Button>
          </AddProjectDialog>
        )}
      </div>
    </div>
  );
}
