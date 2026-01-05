import { TagDto } from "./dto";
import {
  CreateNoteTagInput,
  CreateTagInput,
  DeleteNoteTagInput,
  UpdateNoteTagInput
} from "./service";

export interface TagsApi {
  createTag: (input: CreateTagInput) => Promise<TagDto>;
  createNoteTag: (input: CreateNoteTagInput) => Promise<TagDto>;
  updateNoteTag: (input: UpdateNoteTagInput) => Promise<TagDto>;
  deleteTag: (id: number) => Promise<void>;
  deleteNoteTag: (input: DeleteNoteTagInput) => Promise<void>;
  updateTag: (id: number, input: CreateTagInput) => Promise<TagDto>;
  getTag: (id: number) => Promise<TagDto>;
  getNoteTags: (noteId?: number) => Promise<TagDto[]>;
  getTags: () => Promise<TagDto[]>;
}
