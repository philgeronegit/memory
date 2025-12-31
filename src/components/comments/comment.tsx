"use client";

import { useDeleteComment } from "@/application/mutations/use-delete-comment";
import { useUpdateComment } from "@/application/mutations/use-update-comment";
import { Comment as CommentType } from "@/domain/comment";
import { useToast } from "@/hooks/use-toast";
import { useSpellCheckOpenAI } from "@/hooks/useSpellCheck";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import {
  BookCheck,
  Check,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Undo2
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const { toast } = useToast();
  const date = new Date(comment.createdAt);
  const [inputValue, setInputValue] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const { roleUser } = useNotesStore();
  const { response, loading, handleSpellCheck, setResponse, undo } =
    useSpellCheckOpenAI();

  const handleSpellCheckClick = async () => {
    await handleSpellCheck(inputValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCommentSpellCheckSave = () => {
    setInputValue(response);
    handleCommentSave();
  };

  const handleCommentSave = async () => {
    setIsEditing(false);
    setResponse("");
    await updateComment.mutateAsync({
      id: comment.id,
      content: response
    });
    toast({
      title: "Commentaire mis à jour",
      description: "Le commentaire a été mis à jour avec succès."
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if esc key pressed, cancel the edit
    if (event.key === "Escape") {
      setIsEditing(false);
      setInputValue(comment.content);
      return;
    }

    // if shift + enter add a new line at the position of the cursor
    if (event.key === "Enter" && event.shiftKey) {
      const { selectionStart, selectionEnd } = event.currentTarget;
      const value = event.currentTarget.value;
      const newValue =
        value.substring(0, selectionStart) +
        "\n" +
        value.substring(selectionEnd);
      setInputValue(newValue);
      event.currentTarget.setSelectionRange(
        selectionStart + 1,
        selectionStart + 1
      );
      event.preventDefault();
      return;
    }

    if (event.key === "Enter") {
      handleCommentSave();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleLikeClick = () => {
    const hasAlreadyLiked = comment.score === 1;

    updateComment.mutateAsync({
      id: comment.id,
      content: comment.content,
      user_id: roleUser?.id,
      score: hasAlreadyLiked ? 0 : 1
    });
  };

  const handleDislikeClick = () => {
    const hasAlreadyDisliked = comment.score === -1;

    updateComment.mutateAsync({
      id: comment.id,
      content: comment.content,
      user_id: roleUser?.id,
      score: hasAlreadyDisliked ? 0 : -1
    });
  };

  const handleDeleteClick = async () => {
    await deleteComment.mutateAsync(comment.id);
    toast({
      title: "Commentaire supprimé",
      description: "Le commentaire a été supprimé avec succès."
    });
  };

  return (
    <div className="mb-2">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <Textarea
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={inputValue}
              disabled={loading}
              className="p-1"
            />
          ) : (
            <p className="text-sm font-medium leading-none">{inputValue}</p>
          )}
          {roleUser &&
            hasPermission(roleUser, "update:ownComments") &&
            roleUser.id === comment.userId && (
              <button onClick={handleEdit} title="Modifier">
                <Pencil size={14} />
              </button>
            )}
        </div>
        {response && (
          <div>
            <p className="text-sm font-medium leading-none text-green-500">
              {response}
            </p>
            <button onClick={() => undo()} title="Annuler">
              <Undo2 size={14} />
            </button>
            <button onClick={handleCommentSpellCheckSave} title="Valider">
              <Check size={14} />
            </button>
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          <span className="text-primary">{comment.username}</span>{" "}
          {date.toLocaleString()}
        </div>
        <div>
          <Button
            variant="ghost"
            size="sm"
            title="Like"
            onClick={handleLikeClick}>
            <ThumbsUp />
            {comment.totalLikes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title="Dislike"
            onClick={handleDislikeClick}>
            <ThumbsDown />
            {comment.totalDislikes}
          </Button>
          <Button
            disabled={loading}
            variant="ghost"
            size="sm"
            title="Spell checker"
            onClick={handleSpellCheckClick}>
            <BookCheck />
          </Button>
          {roleUser &&
            hasPermission(roleUser, "delete:ownComments") &&
            roleUser.id === comment.userId && (
              <Button
                variant="ghost"
                size="sm"
                title="Supprimer"
                onClick={handleDeleteClick}>
                <Trash2 />
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
