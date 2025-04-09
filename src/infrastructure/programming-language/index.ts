import tagsApi from "./api";
import { ProgrammingLanguagesService } from "./service";

const tagsService = new ProgrammingLanguagesService(tagsApi);

export default tagsService;
