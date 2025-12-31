"use client";

import { useUpdateMessageForUser } from '@/application/mutations/use-update-message-for-user';
import { useUserMessages } from "@/application/queries/use-user-messages";
import { AuthWrapper } from '@/components/auth';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Message } from '@/domain/message';
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
  const updateMessageForUser = useUpdateMessageForUser();

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

  const handleCheckChange = (check: CheckedState, message: Message) => {
    if (!user) return;
    if (!message) return;

    const readAt = check === true ? new Date() : null;
    updateMessageForUser.mutateAsync({
      id: message.id,
      userId: user?.id,
      readAt
    });
  };

  return (
    <AuthWrapper>
      <div className="p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Utilisateur</TableHead>
              <TableHead>Texte</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead>Lu le</TableHead>
              <TableHead>Lu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages?.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="w-[100px]">{message.userId}</TableCell>
                <TableCell>{message.text}</TableCell>
                <TableCell>
                  {message.createdAt.toLocaleDateString("fr-FR")} {message.createdAt.toLocaleTimeString("fr-FR")}
                </TableCell>
                <TableCell>
                  {message.readAt ? `${message.readAt.toLocaleDateString("fr-FR")} ${message.readAt.toLocaleTimeString("fr-FR")}` : ""}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={message.readAt ? true : false}
                    onCheckedChange={(check) => handleCheckChange(check, message)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthWrapper>
  );
}
