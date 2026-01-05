import { TechnicalSkill } from "./technical-skill";
import { User } from "./user";

export interface Developer extends User {
  technicalSkills?: TechnicalSkill[];
}
