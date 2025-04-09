import { useUpdateComment } from "@/application/mutations/use-update-comment";
import { Comment as CommentType } from "@/domain";
import { Pencil, ThumbsDown, ThumbsUp } from "lucide-react";
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
          <button onClick={handleEdit} title="Modifier">
            <Pencil size={14} />
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="text-primary">{comment.username}</span>{" "}
          {date.toLocaleString()}
        </div>
        <div>
          <Button variant="ghost" size="sm" title="Like">
            <ThumbsUp />
          </Button>
          <Button variant="ghost" size="sm" title="Dislike">
            <ThumbsDown />
          </Button>
        </div>
      </div>
    </div>
  );
}
