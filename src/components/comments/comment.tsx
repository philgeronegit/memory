import { useUpdateComment } from "@/application/mutations/use-update-comment";
import { Comment as CommentType } from "@/domain/comment";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { BookCheck, Pencil, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const date = new Date(comment.createdAt);
  const [inputValue, setInputValue] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const updateComment = useUpdateComment();
  const { roleUser } = useNotesStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      updateComment.mutateAsync({
        id: comment.id,
        content: inputValue
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleLikeClick = () => {
    const hasAlreadyLiked = comment.score === 1;
    console.log("🚀 ~ handleLikeClick ~ hasAlreadyLiked:", hasAlreadyLiked);

    updateComment.mutateAsync({
      id: comment.id,
      content: comment.content,
      user_id: roleUser?.id,
      score: hasAlreadyLiked ? 0 : 1
    });
  };

  const handleDislikeClick = () => {
    const hasAlreadyDisliked = comment.score === -1;
    console.log(
      "🚀 ~ handleDislikeClick ~ hasAlreadyDisliked:",
      hasAlreadyDisliked
    );

    updateComment.mutateAsync({
      id: comment.id,
      content: comment.content,
      user_id: roleUser?.id,
      score: hasAlreadyDisliked ? 0 : -1
    });
  };

  const handleSpellCheckClick = () => {
    console.log("Spell check clicked");
    // Implement spell check logic here
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
              className="p-1"
            />
          ) : (
            <p className="text-sm font-medium leading-none">
              {comment.content}
            </p>
          )}
          {roleUser &&
            hasPermission(roleUser, "update:ownComments") &&
            roleUser.id === comment.userId && (
              <button onClick={handleEdit} title="Modifier">
                <Pencil size={14} />
              </button>
            )}
        </div>
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
                onClick={handleSpellCheckClick}>
                <Trash2 />
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
