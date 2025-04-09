export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  status: string;
  dueAt: string;
  doneAt: string;
  priority: string;
  idProject: number;
  idExecutive: number;
  idDeveloper: number;
}
