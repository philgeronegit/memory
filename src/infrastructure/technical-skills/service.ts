import { AddTechnicalSkillToUserInput, CreateTechnicalSkillInput, DeleteTechnicalSkillFromUserInput, UpdateTechnicalSkillForUserInput, UpdateTechnicalSkillInput } from "./dto";
import { TechnicalSkillsApi } from "./interfaces";
import { dtoToTechnicalSkill } from "./transform";

export class TechnicalSkillsService {
  constructor(private api: TechnicalSkillsApi) {
    this.api = api;
  }

  async addTechnicalSkillToUser(input: AddTechnicalSkillToUserInput) {
    const technicalSkill = await this.api.addTechnicalSkillToUser(input);
    return dtoToTechnicalSkill(technicalSkill);
  }


  async createTechnicalSkill(input: CreateTechnicalSkillInput) {
    const technicalSkill = await this.api.createTechnicalSkill(input);
    return dtoToTechnicalSkill(technicalSkill);
  }

  async deleteTechnicalSkill(id: number) {
    await this.api.deleteTechnicalSkill(id);
  }

  async deleteTechnicalSkillFromUser(input: DeleteTechnicalSkillFromUserInput) {
    await this.api.deleteTechnicalSkillFromUser(input);
  }

  async getTechnicalSkill(id?: number) {
    const technicalSkill = await this.api.getTechnicalSkill(id);
    return dtoToTechnicalSkill(technicalSkill);
  }

  async getTechnicalSkills() {
    const technicalSkills = await this.api.getTechnicalSkills();
    return technicalSkills.map(dtoToTechnicalSkill);
  }

  async getUserTechnicalSkills(userId?: number) {
    const technicalSkills = await this.api.getUserTechnicalSkills(userId);
    return technicalSkills.map(dtoToTechnicalSkill);
  }


  async updateTechnicalSkill(input: UpdateTechnicalSkillInput) {
    const technicalSkill = await this.api.updateTechnicalSkill(input);
    return dtoToTechnicalSkill(technicalSkill);
  }

  async updateTechnicalSkillForUser(input: UpdateTechnicalSkillForUserInput) {
    const technicalSkill = await this.api.updateTechnicalSkillForUser(input);
    return dtoToTechnicalSkill(technicalSkill);
  }
}
