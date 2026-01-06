"use client";

import { useUpdateNote } from "@/application/mutations/use-update-note";
import { useUpdateNoteScore } from "@/application/mutations/use-update-note-score";
import { useNote } from "@/application/queries/use-note";
import { useNoteScore } from "@/application/queries/use-note-score";
import { useProgrammingLanguages } from "@/application/queries/use-programming-languages";
import { NoteMarkdown } from "@/components/notes/note-markdown";
import { EditableText } from "@/components/ui/editable-text";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import useNotesStore from "@/store/useNotesStore";
import {
  BookOpenText,
  Pencil,
  Save,
  Share,
  ThumbsDown,
  ThumbsUp
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { NoteTags } from "./note-tags";
import { ShareNoteDialog } from "./share-project-dialog";

export function Note() {
  const { toast } = useToast();
  const { roleUser, selectedNoteId, setNoteContent } = useNotesStore();
  const userId = roleUser?.id;
  const [postContent, setPostContent] = useState("");
  const { data: note, isLoading, error } = useNote({ noteId: selectedNoteId });
  const { data: noteScore, isLoading: isLoadingScore } = useNoteScore({
    noteId: selectedNoteId,
    userId
  });
  const { data: programmingLanguages } = useProgrammingLanguages();
  const score = noteScore?.score ?? 0;
  const [mode, setMode] = useState("edit");
  const updateNote = useUpdateNote();
  const [title, setTitle] = useState("");
  const updateNoteScore = useUpdateNoteScore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isCreatorOfNote = roleUser?.id === note?.idUser;
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  // Focus the textarea when mode changes to "edit"
  useEffect(() => {
    if (mode === "edit" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [mode]);

  useEffect(() => {
    setPostContent(note?.content || "");
    setTitle(note?.title || "");
  }, [note]);

  const onToggleChange = (value: string) => {
    setMode(value);
  };

  const onNoteShare = () => {
    if (!note || !note.projectId) {
      toast({
        title: "Erreur",
        description: <p>Impossible de partager la note. Projet non trouvé.</p>
      });
      return;
    }

    // Logic to share the note
    setShareDialogOpen(true);
  };

  const onNoteSave = async () => {
    if (!selectedNoteId) {
      toast({
        title: "Erreur",
        description: <p>Impossible de sauvegarder la note.</p>
      });
      return;
    }

    await updateNote.mutateAsync({
      id: selectedNoteId,
      title: title,
      content: postContent
    });
    toast({
      title: "Note sauvegardée",
      description: <p>La note a été sauvegardée avec succès.</p>
    });
  };

  const onNoteCheckedChange = async (checked: boolean) => {
    if (!selectedNoteId) {
      toast({
        title: "Erreur",
        description: <p>Impossible de sauvegarder la note.</p>
      });
      return;
    }

    await updateNote.mutateAsync({
      id: selectedNoteId,
      is_public: Boolean(checked)
    });
    toast({
      title: "Note sauvegardée",
      description: <p>La note a été sauvegardée avec succès.</p>
    });
  };

  const onChange = (value: string) => {
    setTitle(value);
  };

  const handleLikeClick = async () => {
    if (!selectedNoteId || !userId) {
      toast({
        title: "Erreur",
        description: <p>Impossible de sauvegarder la note.</p>
      });
      return;
    }

    const hasAlreadyLiked = score === 1;
    let newScore = 1;
    if (hasAlreadyLiked) {
      newScore = 0;
    }
    await updateNoteScore.mutateAsync({
      id: selectedNoteId,
      user_id: userId,
      score: newScore
    });
    toast({
      title: "Score sauvegardé",
      description: <p>Le score a été sauvegardé avec succès.</p>
    });
  };

  const handleDislikeClick = async () => {
    if (!selectedNoteId || !userId) {
      toast({
        title: "Erreur",
        description: <p>Impossible de sauvegarder la note.</p>
      });
      return;
    }

    const hasAlreadyDisliked = score === -1;
    let newScore = -1;
    if (hasAlreadyDisliked) {
      newScore = 0;
    }
    await updateNoteScore.mutateAsync({
      id: selectedNoteId,
      user_id: userId,
      score: newScore
    });
    toast({
      title: "Score sauvegardé",
      description: <p>Le score a été sauvegardé avec succès.</p>
    });
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Fix useEffect dependency warning by memoizing handleClick
  const handleClick = React.useCallback(() => {
    if (contextMenu) setContextMenu(null);
  }, [contextMenu]);

  const onLanguageValueChange = async (value: string) => {
    if (!selectedNoteId) {
      toast({
        title: "Erreur",
        description: <p>Impossible de sauvegarder la note.</p>
      });
      return;
    }
    await updateNote.mutateAsync({
      id: selectedNoteId,
      id_programming_language: Number(value)
    });
    toast({
      title: "Note sauvegardée",
      description: <p>La note a été sauvegardée avec succès.</p>
    });
  };

  useEffect(() => {
    if (contextMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu, handleClick]);

  if (isLoading || isLoadingScore) {
    return <p>Chargement...</p>;
  }
  if (!note) {
    return <p>Pas de note sélectionnée</p>;
  }
  if (error) {
    return <p>Erreur: {error.message}</p>;
  }

  return (
    <div className="h-full">
      <header className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          <EditableText text={title} onChange={onChange} onSave={onNoteSave} />
        </h3>
        <div className="flex space-x-2 items-center">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={onToggleChange}>
            <ToggleGroupItem value="edit" title="Editer">
              <Pencil />
            </ToggleGroupItem>
            <ToggleGroupItem value="read" title="Lire">
              <BookOpenText />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            size="icon"
            title="Sauvegarder"
            onClick={onNoteSave}
            disabled={!isCreatorOfNote}>
            <Save />
          </Button>
          <Button
            size="icon"
            title="Partager"
            onClick={onNoteShare}
            disabled={!isCreatorOfNote}>
            <Share />
          </Button>
        </div>
      </header>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          checked={note.isPublic}
          onCheckedChange={onNoteCheckedChange}
          disabled={!isCreatorOfNote}
        />
        <Label htmlFor="airplane-mode">Publique</Label>
        <Label htmlFor="programming-language">Langage de programmation</Label>
        <Select
          defaultValue={note.programmingLanguageId?.toString() || ""}
          onValueChange={onLanguageValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Langage de programmation" />
          </SelectTrigger>
          <SelectContent>
            {programmingLanguages?.map((language) => (
              <SelectItem key={language.id} value={language.id.toString()}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {
        note.accessType === "shared" && (
          <div className="m-1 p-2 bg-yellow-100 border border-yellow-300 rounded">
            Cette note fait partie d&apos;un projet partagé.
          </div>
        )
      }
      <div className="m-1">{`Créé le ${new Date(
        note.createdAt
      ).toLocaleDateString("fr-FR")} par ${note.username}`}</div>
      {note.updatedAt && (
        <div className="m-1">{`Modifié le ${new Date(
          note.updatedAt
        ).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })} à ${new Date(note.updatedAt).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        })}`}</div>
      )}
      <div className="flex flex-col gap-2 h-full">
        <div className="">
          {mode === "edit" && (
            <>
              <Textarea
                ref={textareaRef}
                value={postContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setPostContent(e.target.value);
                  setNoteContent(e.target.value);
                }}
                className="h-96"
                onContextMenu={handleContextMenu}
                disabled={!isCreatorOfNote}
              />
              {contextMenu && (
                <ul
                  style={{
                    position: "fixed",
                    top: contextMenu.y,
                    left: contextMenu.x,
                    zIndex: 1000,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    padding: 0,
                    listStyle: "none"
                  }}>
                  <li
                    style={{ padding: "8px 16px", cursor: "pointer" }}
                    onClick={() => {
                      document.execCommand("copy");
                      setContextMenu(null);
                    }}>
                    Copier
                  </li>
                  <li
                    style={{ padding: "8px 16px", cursor: "pointer" }}
                    onClick={() => {
                      document.execCommand("cut");
                      setContextMenu(null);
                    }}>
                    Couper
                  </li>
                  <li
                    style={{ padding: "8px 16px", cursor: "pointer" }}
                    onClick={() => {
                      document.execCommand("paste");
                      setContextMenu(null);
                    }}>
                    Coller
                  </li>
                </ul>
              )}
            </>
          )}
          {mode === "read" && <NoteMarkdown noteContent={postContent} />}
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            title="Like"
            onClick={handleLikeClick}>
            <ThumbsUp />
            {note.totalLikes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title="Dislike"
            onClick={handleDislikeClick}>
            <ThumbsDown />
            {note.totalDislikes}
          </Button>
        </div>

        <NoteTags />
      </div>

      <ShareNoteDialog
        note={note}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      />
    </div>
  );
}
