import { CreateTagInput } from "./dto";
import { TagsApi } from "./interfaces";
import { dtoToTag } from "./transform";

export class TagsService {
  constructor(private api: TagsApi) {
    this.api = api;
  }

  async createTag(input: CreateTagInput) {
    const tag = await this.api.createTag(input);
    return dtoToTag(tag);
  }

  async updateTag(id: number, input: CreateTagInput) {
    const tag = await this.api.updateTag(id, input);
    return dtoToTag(tag);
  }

  async getTag(id: number) {
    const tag = await this.api.getTag(id);
    return dtoToTag(tag);
  }

  async getTags() {
    const tags = await this.api.getTags();
    return tags.map(dtoToTag);
  }
}
