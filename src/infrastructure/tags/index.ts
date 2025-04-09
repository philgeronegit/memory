import tagsApi from "./api";
import { TagsService } from "./service";

const tagsService = new TagsService(tagsApi);

export default tagsService;
