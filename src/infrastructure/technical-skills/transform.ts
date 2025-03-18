import { TechnicalSkill } from "@/domain";
import { TechnicalSkillDto } from "./dto";

export function dtoToTechnicalSkill(dto: TechnicalSkillDto): TechnicalSkill {
  return {
    id: dto.id_technical_skill,
    name: dto.name,
    yearOfExperience: dto.year_experience
  };
}
