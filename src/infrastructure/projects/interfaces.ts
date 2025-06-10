import { CreateProjectInput, ProjectDto, UpdateProjectInput } from "./dto";

export interface ProjectsApi {
  createProject: (input: CreateProjectInput) => Promise<ProjectDto>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (input: UpdateProjectInput) => Promise<ProjectDto>;
  getProject: (id: number) => Promise<ProjectDto>;
  getProjects: () => Promise<ProjectDto[]>;
}
