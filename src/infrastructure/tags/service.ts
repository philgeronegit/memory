import { TagsApi } from "./interfaces";
import { dtoToTag } from "./transform";

export interface CreateTagInput {
  name: string;
}
export interface CreateNoteTagInput {
  idNote: number;
  idTag: number;
}
export interface UpdateNoteTagInput {
  idNote: number;
  tagIds: number[];
}

export interface DeleteNoteTagInput {
  idNote: number;
  idTag: number;
}

export class TagsService {
  constructor(private api: TagsApi) {
    this.api = api;
  }

  async createTag(input: CreateTagInput) {
    const tag = await this.api.createTag(input);
    return dtoToTag(tag);
  }

  async createNoteTag(input: CreateNoteTagInput) {
    const tag = await this.api.createNoteTag(input);
    return dtoToTag(tag);
  }

  async updateTag(id: number, input: CreateTagInput) {
    const tag = await this.api.updateTag(id, input);
    return dtoToTag(tag);
  }

  async updateNoteTag(input: UpdateNoteTagInput) {
    const tag = await this.api.updateNoteTag(input);
    return dtoToTag(tag);
  }

  async deleteTag(id: number) {
    await this.api.deleteTag(id);
  }

  async deleteNoteTag(input: DeleteNoteTagInput) {
    await this.api.deleteNoteTag(input);
  }

  async getTag(id: number) {
    const tag = await this.api.getTag(id);
    return dtoToTag(tag);
  }

  async getNoteTags(noteId?: number) {
    const tags = await this.api.getNoteTags(noteId);
    return tags.map(dtoToTag);
  }

  async getTags() {
    const tags = await this.api.getTags();
    return tags.map(dtoToTag);
  }
}
