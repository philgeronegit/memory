import { UploadsApi } from "./interfaces";
import { dtoToUpload } from "./transform";

export class UploadsService {
  constructor(private api: UploadsApi) {
    this.api = api;
  }

  async getUserUploads(userId?: number) {
    if (!userId) {
      return [];
    }
    const uploads = await this.api.getUserUploads(userId);
    return uploads.map(dtoToUpload);
  }
}
