import { DeveloperDto, UpdateDeveloperInput } from "./dto";

export interface DevelopersApi {
  updateDeveloper: (input: UpdateDeveloperInput) => Promise<DeveloperDto>;
  getDeveloper: (id: number) => Promise<DeveloperDto>;
  getDevelopers: () => Promise<DeveloperDto[]>;
}
