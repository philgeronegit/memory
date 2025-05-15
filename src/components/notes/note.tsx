"use client";

import { useUpdateNote } from "@/application/mutations/use-update-note";
import { useUpdateNoteScore } from "@/application/mutations/use-update-note-score";
import { useNote } from "@/application/queries/use-note";
import { useNoteScore } from "@/application/queries/use-note-score";
import { EditableText } from "@/components/ui/editable-text";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import useNotesStore from "@/store/useNotesStore";
import { BookOpenText, Pencil, Save, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { NoteTags } from "./note-tags";

export function Note() {
  const { toast } = useToast();
  const { selectedNoteId, setNoteContent } = useNotesStore();
  const [postContent, setPostContent] = useState("");
  const { roleUser } = useNotesStore();
  const userId = roleUser?.id;
  const { data: note, isLoading, error } = useNote({ noteId: selectedNoteId });
  const { data: noteScore } = useNoteScore({ noteId: selectedNoteId, userId });
  const score = noteScore?.score ?? 0;
  console.log("🚀 ~ Note ~ score:", score);
  const [mode, setMode] = useState("edit");
  const updateNote = useUpdateNote();
  const [title, setTitle] = useState("");
  const updateNoteScore = useUpdateNoteScore();

  useEffect(() => {
    setPostContent(note?.content || "");
    setTitle(note?.title || "");
  }, [note]);

  const onToggleChange = (value: string) => {
    setMode(value);
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
    console.log("Like clicked");

    const hasAlreadyLiked = score === 1;
    console.log("🚀 ~ handleLikeClick ~ hasAlreadyLiked:", hasAlreadyLiked);
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

    console.log("Dislike clicked");
    const hasAlreadyDisliked = score === -1;
    console.log(
      "🚀 ~ handleDislikeClick ~ hasAlreadyDisliked:",
      hasAlreadyDisliked
    );
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

  if (isLoading) {
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
        {`Crée le ${note.createdAt} par ${note.username}`}
        <div className="flex space-x-2">
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
          <Button size="icon" title="Sauvegarder" onClick={onNoteSave}>
            <Save />
          </Button>
        </div>
      </header>
      <div className="flex items-center space-x-2 mb-4">
        <Switch checked={note.isPublic} onCheckedChange={onNoteCheckedChange} />
        <Label htmlFor="airplane-mode">Publique</Label>
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="">
          {mode === "edit" && (
            <Textarea
              value={postContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPostContent(e.target.value);
                setNoteContent(e.target.value);
              }}
              className="h-96"
            />
          )}
          {mode === "read" && (
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={dark}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                }
              }}>
              {postContent}
            </Markdown>
          )}
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
    </div>
  );
}
