export interface TechnicalSkillDto {
  id_technical_skill: number;
  name: string;
  user_id: number;
  year_experience: number;
}

export interface CreateTechnicalSkillInput {
  name: string;
}

export interface AddTechnicalSkillToUserInput {
  id: number;
  userId: number;
  yearOfExperience: number;
}

export interface DeleteTechnicalSkillFromUserInput {
  id: number;
  userId: number;
}

export interface UpdateTechnicalSkillInput {
  id: number;
  name: string;
}

export interface UpdateTechnicalSkillForUserInput {
  id: number;
  userId: number;
  yearOfExperience: number;
}