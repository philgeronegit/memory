import { UploadDto } from "./dto";

export interface UploadsApi {
  getUserUploads: (userId: number) => Promise<UploadDto[]>;
}
