import { AddTechnicalSkillToUserInput, CreateTechnicalSkillInput, DeleteTechnicalSkillFromUserInput, TechnicalSkillDto, UpdateTechnicalSkillForUserInput, UpdateTechnicalSkillInput } from "./dto";

export interface TechnicalSkillsApi {
  createTechnicalSkill: (input: CreateTechnicalSkillInput) => Promise<TechnicalSkillDto>;
  deleteTechnicalSkill: (id: number) => Promise<void>;
  deleteTechnicalSkillFromUser: (input: DeleteTechnicalSkillFromUserInput) => Promise<void>;
  getTechnicalSkill: (id?: number) => Promise<TechnicalSkillDto>;
  getTechnicalSkills: () => Promise<TechnicalSkillDto[]>;
  getUserTechnicalSkills: (userId?: number) => Promise<TechnicalSkillDto[]>;
  addTechnicalSkillToUser: (input: AddTechnicalSkillToUserInput) => Promise<TechnicalSkillDto>;
  updateTechnicalSkill: (input: UpdateTechnicalSkillInput) => Promise<TechnicalSkillDto>;
  updateTechnicalSkillForUser: (input: UpdateTechnicalSkillForUserInput) => Promise<TechnicalSkillDto>;
}
