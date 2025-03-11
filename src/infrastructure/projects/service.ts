import { ProjectsApi } from "./interfaces";
import { dtoToProject } from "./transform";

export class ProjectsService {
  constructor(private api: ProjectsApi) {
    this.api = api;
  }

  async getProject(id: number) {
    const note = await this.api.getProject(id);
    return dtoToProject(note);
  }

  async getProjects() {
    const notes = await this.api.getProjects();
    return notes.map(dtoToProject);
  }
}
