import { ProjectsApi } from "./interfaces";
import { dtoToProject } from "./transform";

export class ProjectsService {
  constructor(private api: ProjectsApi) {
    this.api = api;
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
