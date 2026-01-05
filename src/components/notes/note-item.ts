export type NoteItem = {
  id: string;
  name: string;
  isNote: boolean;
  projectId?: number;
  projectName?: string;
  tags?: string[];
  children?: NoteItem[];
};
