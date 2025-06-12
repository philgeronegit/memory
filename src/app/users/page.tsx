"use client";

import { useUsers } from "@/application/queries/use-users";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";

export default function Users() {
  const { data: users, isLoading, error } = useUsers();
  const { roleUser } = useNotesStore();

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
      {hasPermission(roleUser, "view:users") && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead>Role</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {hasPermission(roleUser, "create:users") && <Button>Créer</Button>}
    </div>
  );
}
