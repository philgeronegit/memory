import { useNotes } from "../queries/use-notes";
import { useUserProjects } from "../queries/use-projects";

export function useGetProjects(userId?: number) {
  const projects = useUserProjects({ userId });
  const notes = useNotes({ userId });
  const projectsWithNotes = projects.data
    ? projects.data.map((project) => {
      return {
        ...project,
        id: String("P" + project.id), // to avoid conflict with note IDs
        notes: notes.data
          ? notes.data.filter((note) => note.projectId === project.id)
          : []
      };
    })
    : [];
  const notesWithoutProject = notes.data
    ? notes.data.filter((note) => !note.projectId)
    : [];
  const notesSharedWithUser = notes.data
    ? notes.data.filter(
      (note) => note.accessType === 'shared'
    ).map(note => ({ ...note, title: note.title + ' (partagée)' }))
    : [];
  notesWithoutProject.push(...notesSharedWithUser);
  return {
    projects: projectsWithNotes,
    notes: notesWithoutProject,
    isLoading: projects.isLoading || notes.isLoading,
    error: projects.error || notes.error
  };
}
