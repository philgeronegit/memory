import { DeveloperDto } from "./dto";

export interface DevelopersApi {
  getDeveloper: (id: number) => Promise<DeveloperDto>;
  getDevelopers: () => Promise<DeveloperDto[]>;
}
