import { Comment as CommentType } from "@/types/comment";

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-2">
      <div>{comment.created_at}</div>
      <div>{comment.content}</div>
    </div>
  );
}
