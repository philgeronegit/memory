import { StatusDto } from "./dto";

export interface StatusApi {
  getStatuses: () => Promise<StatusDto[]>;
}
