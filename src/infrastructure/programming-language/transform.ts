import { ProgrammingLanguage } from "@/domain";
import { ProgrammingLanguageDto } from "./dto";

export function dtoToProgrammingLanguage(
  dto: ProgrammingLanguageDto
): ProgrammingLanguage {
  return {
    id: dto.id_programming_language,
    name: dto.name
  };
}
