"use client";

import { useCreateComment } from "@/application/mutations/use-create-comment";
import { useComments } from "@/application/queries/use-comments";
import { useDevelopers } from "@/application/queries/use-developers";
import { useToast } from "@/hooks/use-toast";
import useNotesStore from "@/store/useNotesStore";
import { useState } from "react";
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
  const { data } = useDevelopers();
  const user = data?.[0];
  const createComment = useCreateComment();
  const [isDisabled, setDisabled] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  if (isLoading) {
    return <p>Chargement...</p>;
  }
  if (error) {
    return <p>Erreur: {error.message}</p>;
  }

  const handleAddComment = async () => {
    if (!user) {
      return;
    }
    if (!selectedNoteId) {
      return;
    }

    try {
      setDisabled(true);
      await createComment.mutateAsync({
        id_user: user.id,
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

  return (
    <div className="p-2">
      <div className="my-2 flex flex-col gap-2">
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="">
              <Comment comment={comment} />
              <Separator className="my-1" />
            </div>
          ))}
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
