import { apiClient } from "../client";
import { TechnicalSkillDto } from "./dto";

async function getTechnicalSkill(id?: number) {
  const response = await apiClient.get<TechnicalSkillDto>(
    `/technical-skill/${id}`
  );
  return response.data;
}

async function getTechnicalSkills() {
  const response = await apiClient.get<TechnicalSkillDto[]>("/technical-skill");
  return response.data;
}

async function getUserTechnicalSkills(userId?: number) {
  const response = await apiClient.get<TechnicalSkillDto[]>(
    `/user/${userId}/technical-skill`
  );
  return response.data;
}

const api = { getTechnicalSkill, getTechnicalSkills, getUserTechnicalSkills };

export default api;
