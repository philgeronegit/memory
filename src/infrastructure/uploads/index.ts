import uploadsApi from "./api";
import { UploadsService } from "./service";

const uploadsService = new UploadsService(uploadsApi);

export default uploadsService;
