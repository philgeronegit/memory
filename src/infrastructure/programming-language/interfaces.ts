import { ProgrammingLanguageDto } from "./dto";

export interface ProgrammingLanguagesApi {
  getProgrammingLanguage: (id: number) => Promise<ProgrammingLanguageDto>;
  getProgrammingLanguages: () => Promise<ProgrammingLanguageDto[]>;
}
