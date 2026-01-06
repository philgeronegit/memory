import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProgrammingLanguagesService } from "./service";

const programmingLanguagesApiMock = {
  getProgrammingLanguage: vi.fn().mockResolvedValue({
    id_programming_language: 1,
    name: "JavaScript"
  }),
  getProgrammingLanguages: vi.fn().mockResolvedValue([
    {
      id_programming_language: 1,
      name: "JavaScript"
    },
    {
      id_programming_language: 2,
      name: "TypeScript"
    },
    {
      id_programming_language: 3,
      name: "Python"
    }
  ])
};

describe("ProgrammingLanguagesService", () => {
  let programmingLanguagesService: ProgrammingLanguagesService;

  beforeEach(() => {
    vi.clearAllMocks();
    programmingLanguagesService = new ProgrammingLanguagesService(
      programmingLanguagesApiMock
    );
  });

  it("should get a programming language by ID", async () => {
    const result = await programmingLanguagesService.getProgrammingLanguage(1);

    expect(
      programmingLanguagesApiMock.getProgrammingLanguage
    ).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.name).toBe("JavaScript");
  });

  it("should get all programming languages", async () => {
    const result = await programmingLanguagesService.getProgrammingLanguages();

    expect(programmingLanguagesApiMock.getProgrammingLanguages).toHaveBeenCalled();
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe("JavaScript");
    expect(result[1].name).toBe("TypeScript");
    expect(result[2].name).toBe("Python");
  });
});
