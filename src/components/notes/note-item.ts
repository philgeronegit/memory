export type NoteItem = {
  id: string;
  name: string;
  isNote: boolean;
  projectId?: number;
  children?: NoteItem[];
};
