"use client";

import { useUpdateNote } from "@/application/mutations/use-update-note";
import { useNote } from "@/application/queries/use-note";
import { EditableText } from "@/components/ui/editable-text";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import useNotesStore from "@/store/useNotesStore";
import { BookOpenText, Pencil, Save } from "lucide-react";
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
  const { data, isLoading, error } = useNote({ noteId: selectedNoteId });
  const [mode, setMode] = useState("edit");
  const updateNote = useUpdateNote();
  const [title, setTitle] = useState("");

  useEffect(() => {
    setPostContent(data?.content || "");
    setTitle(data?.title || "");
  }, [data]);

  const onToggleChange = (value: string) => {
    setMode(value);
  };

  const onNoteSaved = async () => {
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
    await updateNote.mutateAsync({
      id: selectedNoteId,
      is_public: Number(checked)
    });
    toast({
      title: "Note sauvegardée",
      description: <p>La note a été sauvegardée avec succès.</p>
    });
  };

  const onChange = (value: string) => {
    console.log("🚀 ~ onChange ~ value:", value);
    setTitle(value);
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }
  if (!data) {
    return <p>Pas de note sélectionnée</p>;
  }
  if (error) {
    return <p>Erreur: {error.message}</p>;
  }

  return (
    <div className="h-full">
      <header className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          <EditableText text={title} onChange={onChange} />
        </h3>
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
          <Button size="icon" title="Sauvegarder" onClick={onNoteSaved}>
            <Save />
          </Button>
        </div>
      </header>
      <div className="flex items-center space-x-2 mb-4">
        <Switch checked={data.isPublic} onCheckedChange={onNoteCheckedChange} />
        <Label htmlFor="airplane-mode">Publique</Label>
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="">
          {mode === "edit" && (
            <Textarea
              value={postContent}
              onChange={(e) => {
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

        <NoteTags />
      </div>
    </div>
  );
}
