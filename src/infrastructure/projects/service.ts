import {
  CreateProjectInput,
  UpdateProjectInput
} from "@/infrastructure/projects/dto";
import { ProjectsApi } from "./interfaces";
import { dtoToProject } from "./transform";

export class ProjectsService {
  constructor(private api: ProjectsApi) {
    this.api = api;
  }

  async createProject(input: CreateProjectInput) {
    const project = await this.api.createProject(input);
    return dtoToProject(project);
  }

  async updateProject(input: UpdateProjectInput) {
    const project = await this.api.updateProject(input);
    return dtoToProject(project);
  }

  async deleteProject(id: number) {
    await this.api.deleteProject(id);
  }

  async getProject(id: number) {
    const project = await this.api.getProject(id);
    return dtoToProject(project);
  }

  async getProjects() {
    const projects = await this.api.getProjects();
    return projects.map(dtoToProject);
  }
}
