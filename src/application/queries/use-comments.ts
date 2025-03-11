import CommentsService from "@/infrastructure/comments";
import { useQuery } from "@tanstack/react-query";

interface GetCommentsInput {
  noteId?: number;
}

export function getQueryKey(noteId?: number) {
  return ["comments", noteId];
}

export function useComments({ noteId }: GetCommentsInput) {
  return useQuery({
    queryKey: getQueryKey(noteId),
    queryFn: () => CommentsService.getComments(noteId),
    enabled: !!noteId
  });
}
