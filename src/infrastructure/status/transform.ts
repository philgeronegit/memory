import { Status } from '@/domain/status';
import { StatusDto } from "./dto";

export function dtoToStatus(dto: StatusDto): Status {
  return {
    id: dto.id_status,
    name: dto.name
  };
}
