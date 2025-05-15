import { TechnicalSkill } from "@/domain/technical-skill";
import { TechnicalSkillDto } from "./dto";

export function dtoToTechnicalSkill(dto: TechnicalSkillDto): TechnicalSkill {
  return {
    id: dto.id_technical_skill,
    name: dto.name,
    userId: dto.user_id,
    yearOfExperience: dto.year_experience
  };
}
