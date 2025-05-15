"use client";

import { useCreateComment } from "@/application/mutations/use-create-comment";
import { useComments } from "@/application/queries/use-comments";
import { useToast } from "@/hooks/use-toast";
import useNotesStore from "@/store/useNotesStore";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Comment from "./comment";

export default function Comments() {
  const { selectedNoteId } = useNotesStore();
  const {
    data: comments,
    error,
    isLoading
  } = useComments({ noteId: selectedNoteId });
  const { roleUser } = useNotesStore();
  const createComment = useCreateComment();
  const [isDisabled, setDisabled] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }
  if (error) {
    return <p>Erreur: {error.message}</p>;
  }

  const handleAddComment = async () => {
    if (!roleUser) {
      return;
    }
    if (!selectedNoteId) {
      return;
    }

    try {
      setDisabled(true);
      await createComment.mutateAsync({
        id_user: roleUser.id,
        id_item: selectedNoteId,
        content: comment
      });
      setComment("");
      toast({
        title: "Commentaire sauvegardé",
        description: <p>Le commentaire a été sauvegardé avec succès.</p>
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'ajout du commentaire",
        description: (error as Error).message
      });
    } finally {
      setDisabled(false);
    }
  };

  const handleCommentCHange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  if (!comments) {
    return <p>Pas de note sélectionnée</p>;
  }

  return (
    <div
      id="comments-container"
      className="flex flex-col h-full overflow-hidden p-2">
      <div className="flex-1 flex flex-col overflow-y-auto gap-2">
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="">
              <Comment comment={comment} />
              <Separator className="my-1" />
            </div>
          ))}
        <div ref={commentsEndRef} />
      </div>
      <div className="flex flex-col gap-2">
        <Input value={comment} onChange={handleCommentCHange} />
        <Button disabled={isDisabled} onClick={handleAddComment}>
          Ajouter un commentaire
        </Button>
      </div>
    </div>
  );
}
