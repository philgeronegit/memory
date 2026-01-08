import { beforeEach, describe, expect, it, vi } from "vitest";
import { StatusService } from "./service";

const statusApiMock = {
  getStatuses: vi.fn().mockResolvedValue([
    {
      id_status: 1,
      name: "To Do"
    },
    {
      id_status: 2,
      name: "In Progress"
    },
    {
      id_status: 3,
      name: "Done"
    }
  ])
};

describe("StatusService", () => {
  let statusService: StatusService;

  beforeEach(() => {
    vi.clearAllMocks();
    statusService = new StatusService(statusApiMock);
  });

  it("should get all statuses", async () => {
    const result = await statusService.getStatuses();

    expect(statusApiMock.getStatuses).toHaveBeenCalled();
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe("To Do");
    expect(result[1].name).toBe("In Progress");
    expect(result[2].name).toBe("Done");
  });
});
