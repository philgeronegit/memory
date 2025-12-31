"use client";

import { useDeleteUser } from "@/application/mutations/use-delete-user";
import { useUsers } from "@/application/queries/use-users";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
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
import { YesNoDialog } from "@/components/ui/yes-no-dialog";
import { CreateUserDialog, ModifyPasswordDialog } from "@/components/users";
import { UpdateUserDialog } from '@/components/users/update-user-dialog';
import { User } from "@/domain/user";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { MoreHorizontal, UserPlus2 } from "lucide-react";
import React, { useState } from "react";

export default function Users() {
  const { data: users, isLoading, error } = useUsers();
  const { roleUser } = useNotesStore();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  console.log('🚀 ~ Users ~ selectedUser:', selectedUser);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [isModifyPasswordDialogOpen, setIsModifyPasswordDialogOpen] = useState(false);
  const [isModifyUserDialogOpen, setIsModifyUserDialogOpen] = useState(false);
  const deleteUser = useDeleteUser();

  const handleDeleteDialogClose = React.useCallback(() => {
    // Delay clearing selectedUser to allow dialog animation to complete
    setIsDeleteUserDialogOpen(false);
    setTimeout(() => {
      setSelectedUser(undefined);
    }, 300);
  }, []);

  const handleModifyPasswordDialogClose = React.useCallback(() => {
    setIsModifyPasswordDialogOpen(false);
    // Delay clearing selectedUser to allow dialog animation to complete
    setTimeout(() => {
      setSelectedUser(undefined);
    }, 300);
  }, []);

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
        {hasPermission(roleUser, "view:users") && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="w-[100px]">{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.createdAt.toString()}</TableCell>
                  <TableCell>{user.roleName}</TableCell>
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
                              setSelectedUser(user);
                              setIsModifyUserDialogOpen(true);
                            });
                          }}>
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            // Same rationale: defer until after paint so focus moves off the menu
                            // before showing the dialog.
                            requestAnimationFrame(() => {
                              setSelectedUser(user);
                              setIsModifyPasswordDialogOpen(true);
                            });
                          }}>
                          Modifier mot de passe
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            // Prevent the Radix menu from keeping focus/aria-hidden
                            // on the page by opening the confirm dialog on the next frame.
                            requestAnimationFrame(() => {
                              setSelectedUser(user);
                              setIsDeleteUserDialogOpen(true);
                            });
                          }}>
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {hasPermission(roleUser, "create:users") && (
          <CreateUserDialog>
            <Button size="icon" title="Ajouter un utilisateur">
              <UserPlus2 />
            </Button>
          </CreateUserDialog>
        )}
        <YesNoDialog
          title="Supprimer un utilisateur"
          message={`Êtes-vous sûr de vouloir supprimer l'utilisateur ${selectedUser?.username} ?`}
          isOpen={isDeleteUserDialogOpen}
          onClose={handleDeleteDialogClose}
          onConfirm={() => {
            if (selectedUser) {
              deleteUser.mutate(selectedUser.id, {
                onSuccess: () => {
                  handleDeleteDialogClose();
                },
                onError: (error) => {
                  console.error("Error deleting user:", error);
                  handleDeleteDialogClose();
                }
              });
            }
          }}
        />
        <ModifyPasswordDialog
          user={selectedUser}
          isOpen={isModifyPasswordDialogOpen}
          onClose={handleModifyPasswordDialogClose}
        />
        <UpdateUserDialog
          user={selectedUser}
          isOpen={isModifyUserDialogOpen}
          onClose={() => {
            setIsModifyUserDialogOpen(false);
            setTimeout(() => {
              setSelectedUser(undefined);
            }, 300);
          }}
        />
      </div>
    </AuthWrapper>
  );
}
