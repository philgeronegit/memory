import { apiClient } from "../client";
import { AddTechnicalSkillToUserInput, CreateTechnicalSkillInput, DeleteTechnicalSkillFromUserInput, TechnicalSkillDto, UpdateTechnicalSkillForUserInput, UpdateTechnicalSkillInput } from "./dto";

async function createTechnicalSkill(input: CreateTechnicalSkillInput) {
  const response = await apiClient.post<TechnicalSkillDto>("/technical-skill", {
    name: input.name
  });
  return response.data;
}

async function deleteTechnicalSkill(id: number) {
  await apiClient.delete(`/technical-skill/${id}`);
}

async function deleteTechnicalSkillFromUser(input: DeleteTechnicalSkillFromUserInput) {
  await apiClient.delete(
    `/user/${input.userId}/technical-skill/${input.id}`
  );
}

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

async function addTechnicalSkillToUser(input: AddTechnicalSkillToUserInput) {
  const response = await apiClient.post<TechnicalSkillDto>(
    `/user/${input.userId}/technical-skill/${input.id}`,
    { year_experience: input.yearOfExperience }
  );
  return response.data;
}

async function updateTechnicalSkill(input: UpdateTechnicalSkillInput) {
  const response = await apiClient.put<TechnicalSkillDto>(
    `/technical-skill/${input.id}`,
    { name: input.name }
  );
  return response.data;
}

async function updateTechnicalSkillForUser(input: UpdateTechnicalSkillForUserInput) {
  const response = await apiClient.put<TechnicalSkillDto>(
    `/user/${input.userId}/technical-skill/${input.id}`,
    { year_experience: input.yearOfExperience }
  );
  return response.data;
}

const api = {
  addTechnicalSkillToUser,
  createTechnicalSkill,
  deleteTechnicalSkill,
  deleteTechnicalSkillFromUser,
  getTechnicalSkill,
  getTechnicalSkills,
  getUserTechnicalSkills,
  updateTechnicalSkill,
  updateTechnicalSkillForUser
};
export default api;
