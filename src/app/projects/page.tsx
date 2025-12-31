"use client";

import { useDeleteUserFromProject } from '@/application/mutations/use-delete-user-from-project';
import { useProjects } from "@/application/queries/use-projects";
import { AuthWrapper } from "@/components/auth";
import { AddProjectDialog, AddUserToProjectDialog, ModifyProjectDialog } from "@/components/projects";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Project } from "@/domain/project";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { Folder, MoreHorizontal, Pencil, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const { roleUser } = useNotesStore();
  const { data: projects, isLoading, error } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [modifyOpen, setModifyOpen] = useState(false);
  const [projectToModify, setProjectToModify] = useState<Project | null>(null);
  const selectedProject = projects?.find(
    (project) => project.id.toString() === selectedProjectId
  );
  const projectUsers = selectedProject?.users || [];
  const deleteUserFromProject = useDeleteUserFromProject();

  const handleDeleteUser = (userId: number) => {
    if (!selectedProject) return;

    deleteUserFromProject.mutate({
      projectId: selectedProject.id,
      userId: userId
    });
  }

  const handleModify = (project: Project) => {
    setProjectToModify(project);
    setModifyOpen(true);
  };

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
    <AuthWrapper>
      <div className="p-2">
        {hasPermission(roleUser, "view:projects") && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Utilisateurs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id.toString())}
                  className={selectedProjectId === project.id.toString() ? "bg-blue-100 cursor-pointer" : "cursor-pointer"}
                >
                  <TableCell
                    className="w-[100px]">
                    {project.id}
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.createdAt.toString()}</TableCell>
                  <TableCell>{project.userNames?.join(", ")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() => {
                            // rAF lets the dropdown close and Radix clean up aria-hidden/inert
                            // before opening dialogs, preventing the focus/aria lock that froze the page.
                            requestAnimationFrame(() => {
                              handleModify(project);
                            });
                          }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {hasPermission(roleUser, "create:projects") && (
          <div className="mt-2">
            <AddProjectDialog>
              <Button size="icon" title="Ajouter un projet">
                <Folder />
              </Button>
            </AddProjectDialog>
          </div>
        )}

        {selectedProjectId && selectedProject && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Membres du projet</h3>
              {hasPermission(roleUser, "create:projects") && (
                <AddUserToProjectDialog project={selectedProject}>
                  <Button size="sm" variant="outline" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Ajouter un utilisateur
                  </Button>
                </AddUserToProjectDialog>
              )}
            </div>
            {projectUsers.length > 0 ? (
              <div className="border rounded-md divide-y">
                {projectUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{user.username}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        handleDeleteUser(user.id);
                      }}
                      title="Retirer du projet"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-8 text-center text-muted-foreground">
                <p>Aucun membre dans ce projet</p>
              </div>
            )}
          </div>
        )}

        {projectToModify && (
          <ModifyProjectDialog
            open={modifyOpen}
            onOpenChange={(next) => {
              setModifyOpen(next);
              if (!next) setProjectToModify(null);
            }}
            project={projectToModify}
          />
        )}
      </div>
    </AuthWrapper>
  );
}
