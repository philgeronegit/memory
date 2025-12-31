import tagsApi from "./api";
import { StatusService } from "./service";

const statusService = new StatusService(tagsApi);

export default statusService;