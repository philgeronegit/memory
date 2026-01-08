import { beforeEach, describe, expect, it, vi } from "vitest";
import { UploadsService } from "./service";

const uploadsApiMock = {
  getUserUploads: vi.fn().mockResolvedValue([
    {
      name: "document.pdf",
      size: 1024000,
      type: "application/pdf",
      url: "/uploads/document.pdf",
      modified: "2025-01-01 10:00:00"
    },
    {
      name: "image.jpg",
      size: 512000,
      type: "image/jpeg",
      url: "/uploads/image.jpg",
      modified: "2025-01-02 11:00:00"
    }
  ])
};

describe("UploadsService", () => {
  let uploadsService: UploadsService;

  beforeEach(() => {
    vi.clearAllMocks();
    uploadsService = new UploadsService(uploadsApiMock);
  });

  it("should get user uploads", async () => {
    const result = await uploadsService.getUserUploads(1);

    expect(uploadsApiMock.getUserUploads).toHaveBeenCalledWith(1);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("document.pdf");
    expect(result[1].name).toBe("image.jpg");
  });

  it("should return empty array when userId is not provided", async () => {
    const result = await uploadsService.getUserUploads(undefined);

    expect(result).toEqual([]);
    expect(uploadsApiMock.getUserUploads).not.toHaveBeenCalled();
  });
});
