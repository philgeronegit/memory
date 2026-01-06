import { beforeEach, describe, expect, it, vi } from "vitest";
import { TechnicalSkillsService } from "./service";

const technicalSkillsApiMock = {
  addTechnicalSkillToUser: vi.fn().mockResolvedValue({
    id_technical_skill: 1,
    name: "React",
    user_id: 1,
    year_experience: 5
  }),
  createTechnicalSkill: vi.fn().mockResolvedValue({
    id_technical_skill: 1,
    name: "React",
    user_id: 0,
    year_experience: 0
  }),
  deleteTechnicalSkill: vi.fn().mockResolvedValue(undefined),
  deleteTechnicalSkillFromUser: vi.fn().mockResolvedValue(undefined),
  getTechnicalSkill: vi.fn().mockResolvedValue({
    id_technical_skill: 1,
    name: "React",
    user_id: 0,
    year_experience: 0
  }),
  getTechnicalSkills: vi.fn().mockResolvedValue([
    {
      id_technical_skill: 1,
      name: "React",
      user_id: 0,
      year_experience: 0
    },
    {
      id_technical_skill: 2,
      name: "Node.js",
      user_id: 0,
      year_experience: 0
    },
    {
      id_technical_skill: 3,
      name: "PostgreSQL",
      user_id: 0,
      year_experience: 0
    }
  ]),
  getUserTechnicalSkills: vi.fn().mockResolvedValue([
    {
      id_technical_skill: 1,
      name: "React",
      user_id: 1,
      year_experience: 5
    },
    {
      id_technical_skill: 2,
      name: "Node.js",
      user_id: 1,
      year_experience: 4
    }
  ]),
  updateTechnicalSkill: vi.fn().mockResolvedValue({
    id_technical_skill: 1,
    name: "React.js",
    user_id: 0,
    year_experience: 0
  }),
  updateTechnicalSkillForUser: vi.fn().mockResolvedValue({
    id_technical_skill: 1,
    name: "React",
    user_id: 1,
    year_experience: 6
  })
};

describe("TechnicalSkillsService", () => {
  let technicalSkillsService: TechnicalSkillsService;

  beforeEach(() => {
    vi.clearAllMocks();
    technicalSkillsService = new TechnicalSkillsService(technicalSkillsApiMock);
  });

  it("should add technical skill to user", async () => {
    const input = {
      id_technical_skill: 1,
      user_id: 1,
      year_experience: 5
    };

    const result = await technicalSkillsService.addTechnicalSkillToUser(input);

    expect(technicalSkillsApiMock.addTechnicalSkillToUser).toHaveBeenCalledWith(
      input
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe("React");
  });

  it("should create a technical skill", async () => {
    const input = {
      name: "React"
    };

    const result = await technicalSkillsService.createTechnicalSkill(input);

    expect(technicalSkillsApiMock.createTechnicalSkill).toHaveBeenCalledWith(
      input
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe("React");
  });

  it("should delete a technical skill", async () => {
    await technicalSkillsService.deleteTechnicalSkill(1);
    expect(technicalSkillsApiMock.deleteTechnicalSkill).toHaveBeenCalledWith(1);
  });

  it("should delete technical skill from user", async () => {
    const input = {
      id_technical_skill: 1,
      id_user: 1
    };

    await technicalSkillsService.deleteTechnicalSkillFromUser(input);
    expect(
      technicalSkillsApiMock.deleteTechnicalSkillFromUser
    ).toHaveBeenCalledWith(input);
  });

  it("should get a technical skill by ID", async () => {
    const result = await technicalSkillsService.getTechnicalSkill(1);

    expect(technicalSkillsApiMock.getTechnicalSkill).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.name).toBe("React");
  });

  it("should get all technical skills", async () => {
    const result = await technicalSkillsService.getTechnicalSkills();

    expect(technicalSkillsApiMock.getTechnicalSkills).toHaveBeenCalled();
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe("React");
    expect(result[1].name).toBe("Node.js");
    expect(result[2].name).toBe("PostgreSQL");
  });

  it("should get user technical skills", async () => {
    const result = await technicalSkillsService.getUserTechnicalSkills(1);

    expect(technicalSkillsApiMock.getUserTechnicalSkills).toHaveBeenCalledWith(
      1
    );
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("React");
  });

  it("should update a technical skill", async () => {
    const input = {
      id: 1,
      name: "React.js"
    };

    const result = await technicalSkillsService.updateTechnicalSkill(input);

    expect(technicalSkillsApiMock.updateTechnicalSkill).toHaveBeenCalledWith(
      input
    );
    expect(result.name).toBe("React.js");
  });

  it("should update technical skill for user", async () => {
    const input = {
      id_technical_skill: 1,
      user_id: 1,
      year_experience: 6
    };

    const result =
      await technicalSkillsService.updateTechnicalSkillForUser(input);

    expect(
      technicalSkillsApiMock.updateTechnicalSkillForUser
    ).toHaveBeenCalledWith(input);
    expect(result.id).toBe(1);
    expect(result.name).toBe("React");
    expect(result.yearOfExperience).toBe(6);
  });
});
