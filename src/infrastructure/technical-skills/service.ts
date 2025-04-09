import { TechnicalSkillsApi } from "./interfaces";
import { dtoToTechnicalSkill } from "./transform";

export class TechnicalSkillsService {
  constructor(private api: TechnicalSkillsApi) {
    this.api = api;
  }

  async getTechnicalSkill(id: number) {
    const technicalSkill = await this.api.getTechnicalSkill(id);
    return dtoToTechnicalSkill(technicalSkill);
  }

  async getTechnicalSkills() {
    const technicalSkills = await this.api.getTechnicalSkills();
    return technicalSkills.map(dtoToTechnicalSkill);
  }
}
