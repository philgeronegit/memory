import ProgrammingLanguagesService from "@/infrastructure/programming-language";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["programming-languages"];
}

export function useProgrammingLanguages() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => ProgrammingLanguagesService.getProgrammingLanguages()
  });
}
