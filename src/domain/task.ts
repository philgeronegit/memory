export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  idStatus: number;
  status: string;
  dueAt: string;
  doneAt: string;
  priority: string;
  idProject: number;
  projectName: string;
  idExecutive: number;
  executiveName: string;
  idDeveloper: number;
  developerName: string;
  order: number;
}
