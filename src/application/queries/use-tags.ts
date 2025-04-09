import TagsService from "@/infrastructure/tags";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["tags"];
}

export function useTags() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => TagsService.getTags()
  });
}
