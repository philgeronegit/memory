import { ProjectDto } from "./dto";

export interface ProjectsApi {
  getProject: (id: number) => Promise<ProjectDto>;
  getProjects: () => Promise<ProjectDto[]>;
}
