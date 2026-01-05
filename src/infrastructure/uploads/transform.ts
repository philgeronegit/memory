import { Upload } from "@/domain/upload";
import { UploadDto } from "./dto";

export function dtoToUpload(dto: UploadDto): Upload {
  return {
    name: dto.name,
    size: dto.size,
    type: dto.type,
    url: dto.url,
    modified: dto.modified,
  };
}
