import { Note } from "./note";

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
  archivedAt: string | null;
  notes?: Note[] | null;
}
