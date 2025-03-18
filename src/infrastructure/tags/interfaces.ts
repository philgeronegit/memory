import { CreateTagInput, TagDto } from "./dto";

export interface TagsApi {
  createTag: (input: CreateTagInput) => Promise<TagDto>;
  updateTag: (id: number, input: CreateTagInput) => Promise<TagDto>;
  getTag: (id: number) => Promise<TagDto>;
  getTags: () => Promise<TagDto[]>;
}
