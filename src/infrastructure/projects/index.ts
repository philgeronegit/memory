import projectsApi from "./api";
import { ProjectsService } from "./service";

const projectsService = new ProjectsService(projectsApi);

export default projectsService;
