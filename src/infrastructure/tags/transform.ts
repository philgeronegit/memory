import { Tag } from "@/domain";
import { TagDto } from "./dto";

export function dtoToTag(dto: TagDto): Tag {
  return {
    id: dto.id_tag,
    name: dto.name
  };
}
