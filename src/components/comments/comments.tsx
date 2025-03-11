"use client";

import { useComments } from "@/application/queries/use-comments";
import useNotesStore from "@/store/useNotesStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Comment from "./comment";

export default function Comments() {
  const { selectedNoteId } = useNotesStore();
  const { data: comments } = useComments({ noteId: selectedNoteId });
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Comments
      </h3>
      <ul>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </ul>
      <div className="flex flex-col gap-2">
        <Input />
        <div className="flex justify-end">
          <Button>Ajouter</Button>
        </div>
      </div>
    </div>
  );
}
