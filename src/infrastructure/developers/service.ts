import { UpdateDeveloperInput } from "./dto";
import { DevelopersApi } from "./interfaces";
import { dtoToDeveloper } from "./transform";

export class DevelopersService {
  constructor(private api: DevelopersApi) {
    this.api = api;
  }

  async getDeveloper(id: number) {
    const developer = await this.api.getDeveloper(id);
    return dtoToDeveloper(developer);
  }

  async getDevelopers() {
    const developers = await this.api.getDevelopers();
    return developers.map(dtoToDeveloper);
  }

  async updateDeveloper(input: UpdateDeveloperInput) {
    const developer = await this.api.updateDeveloper(input);
    return dtoToDeveloper(developer);
  }
}
