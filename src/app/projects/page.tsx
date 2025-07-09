"use client";

import { useGetProjects } from "@/application/get-projects";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { CreateUserDialog } from "@/components/users";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { Folder } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const { roleUser } = useNotesStore();
  const { projects, isLoading, error } = useGetProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="p-2">
        <p>Chargement...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-2">
        <p>Erreur: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {hasPermission(roleUser, "view:projects") && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell
                  className="w-[100px]"
                  onClick={() => setSelectedProjectId(project.id)}>
                  {project.id}
                </TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.createdAt.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {hasPermission(roleUser, "create:projects") && (
        <CreateUserDialog>
          <Button size="icon" title="Ajouter un projet">
            <Folder />
          </Button>
        </CreateUserDialog>
      )}

      <div>{selectedProjectId && <div>Membres du projet:</div>}</div>
    </div>
  );
}
