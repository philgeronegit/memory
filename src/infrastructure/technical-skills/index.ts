import tagsApi from "./api";
import { TechnicalSkillsService } from "./service";

const tagsService = new TechnicalSkillsService(tagsApi);

export default tagsService;
