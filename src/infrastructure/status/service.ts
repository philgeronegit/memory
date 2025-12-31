import { StatusApi } from "./interfaces";
import { dtoToStatus } from "./transform";

export class StatusService {
  constructor(private api: StatusApi) {
    this.api = api;
  }

  async getStatuses() {
    const statuses = await this.api.getStatuses();
    return statuses.map(dtoToStatus);
  }
}
