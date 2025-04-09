import TagsService from "@/infrastructure/tags";
import { useQuery } from "@tanstack/react-query";

interface GetTagsInput {
  noteId?: number;
}

export function getQueryKey(noteId?: number) {
  return ["tags", noteId];
}

export function useNoteTags({ noteId }: GetTagsInput) {
  return useQuery({
    queryKey: getQueryKey(noteId),
    queryFn: () => TagsService.getNoteTags(noteId),
    enabled: !!noteId
  });
}
