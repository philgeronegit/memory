import { describe, expect, it, vitest } from "vitest";

import { TagsService } from "./service";

const tagsApiMock = {
  createTag: vitest.fn().mockResolvedValue({
    id_tag: 1,
    name: "funny"
  }),
  createNoteTag: vitest.fn().mockResolvedValue({
    id_tag: 2,
    name: "important"
  }),
  updateNoteTag: vitest.fn().mockResolvedValue({
    id_tag: 2,
    name: "important"
  }),
  deleteTag: vitest.fn(),
  deleteNoteTag: vitest.fn(),
  updateTag: vitest.fn().mockResolvedValue({
    id_tag: 1,
    name: "updated funny"
  }),
  getTag: vitest.fn().mockResolvedValue({
    id_tag: 1,
    name: "funny"
  }),
  getNoteTags: vitest.fn().mockResolvedValue([
    {
      id_tag: 1,
      name: "funny"
    },
    {
      id_tag: 2,
      name: "important"
    }
  ]),
  getTags: vitest.fn().mockResolvedValue([
    {
      id_tag: 1,
      name: "funny"
    },
    {
      id_tag: 2,
      name: "important"
    }
  ])
};

describe("TagsService", () => {
  it("should create a tag", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const input = { name: "funny" };
    const result = await tagsService.createTag(input);

    expect(tagsApiMock.createTag).toHaveBeenCalledWith(input);
    expect(result).toEqual({ id: 1, name: "funny" });
  });

  it("should create a note tag", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const input = { idNote: 1, idTag: 2 };
    const result = await tagsService.createNoteTag(input);

    expect(tagsApiMock.createNoteTag).toHaveBeenCalledWith(input);
    expect(result).toEqual({ id: 2, name: "important" });
  });

  it("should update a tag", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const input = { name: "updated funny" };
    const result = await tagsService.updateTag(1, input);

    expect(tagsApiMock.updateTag).toHaveBeenCalledWith(1, input);
    expect(result).toEqual({ id: 1, name: "updated funny" });
  });

  it("should update a note tag", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const input = { idNote: 1, tagIds: [2] };
    const result = await tagsService.updateNoteTag(input);

    expect(tagsApiMock.updateNoteTag).toHaveBeenCalledWith(input);
    expect(result).toEqual({ id: 2, name: "important" });
  });

  it("should delete a tag", async () => {
    const tagsService = new TagsService(tagsApiMock);
    await tagsService.deleteTag(1);

    expect(tagsApiMock.deleteTag).toHaveBeenCalledWith(1);
  });

  it("should delete a note tag", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const input = { idNote: 1, idTag: 2 };
    await tagsService.deleteNoteTag(input);

    expect(tagsApiMock.deleteNoteTag).toHaveBeenCalledWith(input);
  });

  it("should return note tags", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const result = await tagsService.getNoteTags(1);

    expect(tagsApiMock.getNoteTags).toHaveBeenCalledWith(1);
    expect(result).toEqual([
      { id: 1, name: "funny" },
      { id: 2, name: "important" }
    ]);
  });

  it("should return tags", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const result = await tagsService.getTags();

    expect(tagsApiMock.getTags).toHaveBeenCalled();
    expect(result).toEqual([
      { id: 1, name: "funny" },
      { id: 2, name: "important" }
    ]);
  });

  it("should return tag by id", async () => {
    const tagsService = new TagsService(tagsApiMock);
    const result = await tagsService.getTag(1);

    expect(tagsApiMock.getTag).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: "funny" });
  });
});
