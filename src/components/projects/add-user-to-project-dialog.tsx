import { useAddUserToProject } from "@/application/mutations/use-add-user-to-project";
import { useRemoveUserFromProject } from "@/application/mutations/use-remove-user-from-project";
import { useUsers } from "@/application/queries/use-users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Project } from "@/domain/project";
import { BaseUser } from "@/domain/user";
import { Loader2, UserPlus, X } from "lucide-react";
import React, { useState } from "react";

interface AddUserToProjectDialogProps {
  project: Project;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddUserToProjectDialog({
  project,
  children,
  open,
  onOpenChange
}: AddUserToProjectDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [error, setError] = useState<string>();

  const { data: allUsers, isLoading: isLoadingUsers } = useUsers();
  const addUserMutation = useAddUserToProject();
  const removeUserMutation = useRemoveUserFromProject();

  // Filter out users that are already in the project
  const availableUsers = React.useMemo(() => {
    if (!allUsers) return [];
    const projectUserIds = project.userIds || [];
    return allUsers.filter((user) => !projectUserIds.includes(user.id));
  }, [allUsers, project.userIds]);

  const handleAddUser = async () => {
    if (!selectedUserId) {
      setError("Veuillez sélectionner un utilisateur.");
      return;
    }

    try {
      setError(undefined);
      await addUserMutation.mutateAsync({
        projectId: project.id,
        userId: Number(selectedUserId)
      });
      setSelectedUserId("");
    } catch (err) {
      console.error("Error adding user to project:", err);
      setError("Une erreur est survenue lors de l'ajout de l'utilisateur.");
    }
  };

  const handleRemoveUser = async (user: BaseUser) => {
    try {
      setError(undefined);
      await removeUserMutation.mutateAsync({
        projectId: project.id,
        userId: user.id
      });
    } catch (err) {
      console.error("Error removing user from project:", err);
      setError(
        "Une erreur est survenue lors de la suppression de l'utilisateur."
      );
    }
  };

  const isLoading = addUserMutation.isPending || removeUserMutation.isPending;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gérer les utilisateurs du projet</DialogTitle>
          <DialogDescription>
            Ajoutez ou supprimez des utilisateurs du projet &quot;{project.name}&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current project users */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Utilisateurs actuels ({project.users?.length || 0})
            </label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-muted/50">
              {project.users && project.users.length > 0 ? (
                project.users.map((user) => (
                  <Badge
                    key={user.id}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1">
                    {user.username}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                      onClick={() => handleRemoveUser(user)}
                      disabled={isLoading}>
                      <X className="h-3 w-3" />
                      <span className="sr-only">
                        Supprimer {user.username}
                      </span>
                    </Button>
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Aucun utilisateur assigné
                </span>
              )}
            </div>
          </div>

          {/* Add user section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ajouter un utilisateur</label>
            <div className="flex gap-2">
              <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                disabled={isLoading || isLoadingUsers}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner un utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.length > 0 ? (
                    availableUsers.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.username}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      Aucun utilisateur disponible
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddUser}
                disabled={!selectedUserId || isLoading}
                size="icon">
                {addUserMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                <span className="sr-only">Ajouter l&apos;utilisateur</span>
              </Button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-bold text-center">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
