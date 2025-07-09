"use client";

import { useUserMessages } from "@/application/queries/use-user-messages";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useNotesStore from "@/store/useNotesStore";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function Messages() {
  const { user } = useNotesStore();
  const {
    data: messages,
    isLoading,
    error
  } = useUserMessages({
    userId: user?.id
  });

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

  const handleCheckChange = (check: CheckedState) => {
    // Handle checkbox change logic here
    console.log("Checkbox changed:", check);
  };

  return (
    <div className="p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Utilisateur</TableHead>
            <TableHead>Texte</TableHead>
            <TableHead>Date création</TableHead>
            <TableHead>Lu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((message) => (
            <TableRow key={message.id}>
              <TableCell className="w-[100px]">{message.userId}</TableCell>
              <TableCell>{message.text}</TableCell>
              <TableCell>{message.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <Checkbox
                  checked={message.readAt ? true : false}
                  onCheckedChange={handleCheckChange}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
