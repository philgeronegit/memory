import { ProgrammingLanguagesApi } from "./interfaces";
import { dtoToProgrammingLanguage } from "./transform";

export class ProgrammingLanguagesService {
  constructor(private api: ProgrammingLanguagesApi) {
    this.api = api;
  }

  async getProgrammingLanguage(id: number) {
    const programmingLanguage = await this.api.getProgrammingLanguage(id);
    return dtoToProgrammingLanguage(programmingLanguage);
  }

  async getProgrammingLanguages() {
    const programmingLanguages = await this.api.getProgrammingLanguages();
    return programmingLanguages.map(dtoToProgrammingLanguage);
  }
}
