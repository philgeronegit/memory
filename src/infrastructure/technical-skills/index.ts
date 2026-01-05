import tagsApi from "./api";
import { TechnicalSkillsService } from "./service";

const technicalSkillsService = new TechnicalSkillsService(tagsApi);

export default technicalSkillsService;
