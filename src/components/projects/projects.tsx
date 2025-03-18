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
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
      {isLoading && <p>Loading...</p>}

      <AddProjectDialog>
        <div className="flex justify-end">
          <Button variant="outline" size="icon" title="Ajouter un projet">
            <Plus />
          </Button>
        </div>
      </AddProjectDialog>
    </div>
  );
}
