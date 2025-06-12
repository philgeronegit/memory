"use client";

import { useGetProjects } from "@/application/get-projects";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProjectDialog } from "./add-project-dialog";

export function Projects() {
  const { projects, isLoading, error } = useGetProjects();

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <ul>
          {projects?.map((project) => (
            <li key={project.id} className="hover:bg-slate-100 p-1 rounded">
              {project.name} ({project.notes.length} notes)
            </li>
          ))}
        </ul>
      )}
      {isLoading && <p>Chargement...</p>}
      <AddProjectDialog>
        <div className="flex justify-end">
          <Button size="icon" title="Ajouter un projet">
            <Plus />
          </Button>
        </div>
      </AddProjectDialog>
    </div>
  );
}
