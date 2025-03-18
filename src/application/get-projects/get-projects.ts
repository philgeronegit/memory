import { useNotes } from "../queries/use-notes";
import { useProjects } from "../queries/use-projects";

export function useGetProjects() {
  const projects = useProjects();
  const notes = useNotes();
  const projectsWithNotes = projects.data
    ? projects.data.map((project) => {
        return {
          ...project,
          notes: notes.data
            ? notes.data.filter((note) => note.projectId === project.id)
            : []
        };
      })
    : [];
  const notesWithoutProject = notes.data
    ? notes.data.filter((note) => !note.projectId)
    : [];
  return {
    projects: projectsWithNotes,
    notes: notesWithoutProject,
    isLoading: projects.isLoading || notes.isLoading,
    error: projects.error || notes.error
  };
}
