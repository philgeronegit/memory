export type NoteItem = {
  id: string;
  name: string;
  isNote: boolean;
  isPublic: boolean;
  isShared: boolean;
  projectId?: number;
  projectName?: string;
  tags?: string[];
  children?: NoteItem[];
};
