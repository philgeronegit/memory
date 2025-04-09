import { TechnicalSkillDto } from "./dto";

export interface TechnicalSkillsApi {
  getTechnicalSkill: (id: number) => Promise<TechnicalSkillDto>;
  getTechnicalSkills: () => Promise<TechnicalSkillDto[]>;
}
