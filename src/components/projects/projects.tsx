"use client";

import { useGetProjects } from "@/application/get-projects";
import { Button } from "@/components/ui/button";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { Folder } from "lucide-react";
import { AddProjectDialog } from "./add-project-dialog";

interface ProjectsProps {
  userId?: number;
}

export function Projects({ userId }: ProjectsProps) {
  const { roleUser } = useNotesStore();
  const { projects, isLoading, error } = useGetProjects(userId);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <ul>
          {projects?.map((project) => (
            <li key={project.id} className="hover:bg-slate-200 p-1 rounded-lg">
              {project.name} ({project.notes.length} notes)
            </li>
          ))}
        </ul>
      )}
      {isLoading && <p>Chargement...</p>}
      <AddProjectDialog>
        <div className="flex justify-end">
          {hasPermission(roleUser, "create:projects") && (
            <AddProjectDialog>
              <Button size="icon" title="Ajouter un projet">
                <Folder />
              </Button>
            </AddProjectDialog>
          )}
        </div>
      </AddProjectDialog>
    </div>
  );
}
