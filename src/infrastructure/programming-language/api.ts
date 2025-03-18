import { apiClient } from "../client";
import { ProgrammingLanguageDto } from "./dto";

async function getProgrammingLanguage(id: number) {
  const response = await apiClient.get<ProgrammingLanguageDto>(
    `/programming-language/${id}`
  );
  return response.data;
}

async function getProgrammingLanguages() {
  const response = await apiClient.get<ProgrammingLanguageDto[]>(
    "/programming-language"
  );
  return response.data;
}

const api = { getProgrammingLanguage, getProgrammingLanguages };

export default api;
