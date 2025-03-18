"use client";

import { useNotes } from "@/application/queries/use-notes";
import { useProjects } from "@/application/queries/use-projects";
import { useTasks } from "@/application/queries/use-tasks";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface CardsViewProps<T> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  title: string;
  emptyText: string;
  children: React.ReactNode;
}

const CardsView = <T,>({
  data,
  isLoading,
  isError,
  title,
  emptyText,
  children
}: CardsViewProps<T>) => (
  <div>
    <h2>{title}</h2>
    {isLoading && <p>Chargement...</p>}
    {isError && <p>Une erreur est survenue</p>}
    {data && data.length === 0 && <p>{emptyText}</p>}
    <div className="flex gap-2">{children}</div>
  </div>
);

export default function Dashboard() {
  const notes = useNotes();
  const projects = useProjects();
  const tasks = useTasks();
  const mostRecentNotes = notes.data?.slice(0, 3) ?? [];

  return (
    <div className="p-4">
      <CardsView
        data={mostRecentNotes}
        isLoading={notes.isLoading}
        isError={notes.isError}
        title="Notes les plus récentes"
        emptyText="Aucune note">
        {mostRecentNotes &&
          mostRecentNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>{note.content}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </CardsView>
      <h2>Mes tâches</h2>
      {tasks.isLoading && <p>Chargement...</p>}
      {tasks.isError && <p>Une erreur est survenue</p>}
      {tasks?.data && tasks.data.length === 0 && <p>Aucune tâche</p>}
      <div className="flex gap-2">
        {tasks?.data &&
          tasks.data.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.name}</CardTitle>
                <CardDescription>{task.dueDate}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
      <div className="flex gap-2"></div>
      <h2>Mes projets</h2>
      <div className="flex gap-2">
        {projects?.data &&
          projects.data.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
