import { Upload } from "@/domain/upload";
import { UploadDto } from "./dto";

export function dtoToUpload(dto: UploadDto): Upload {
  return {
    name: dto.name,
    path: dto.path
  };
}
