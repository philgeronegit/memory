import { BaseUser } from "@/domain/user";
import { Note } from "./note";

export interface Project {
  id: number;
  name: string;
  description: string;
  accessType: string;
  createdAt: string;
  updatedAt: string | null;
  archivedAt: string | null;
  noteIds?: number[] | null;
  notes?: Note[] | null;
  userIds?: number[] | null;
  userNames?: string[] | null;
  users?: BaseUser[] | null;
}
