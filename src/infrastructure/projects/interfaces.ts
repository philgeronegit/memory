import { CreateProjectInput, ProjectDto, UpdateProjectInput } from "./dto";
import {
  AddUserToProjectInput,
  DeleteUserFromProjectInput
} from "./user-project-dto";

export interface ProjectsApi {
  addUserToProject: (input: AddUserToProjectInput) => Promise<void>;
  createProject: (input: CreateProjectInput) => Promise<ProjectDto>;
  deleteProject: (id: number) => Promise<void>;
  deleteUserFromProject: (input: DeleteUserFromProjectInput) => Promise<void>;
  getProject: (id?: number) => Promise<ProjectDto>;
  getProjects: () => Promise<ProjectDto[]>;
  getUserProjects: (userId?: number) => Promise<ProjectDto[]>;
  updateProject: (input: UpdateProjectInput) => Promise<ProjectDto>;
}
