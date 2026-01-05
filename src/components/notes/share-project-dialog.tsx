import { useShareNote } from '@/application/mutations/use-share-note';
import { useProject } from '@/application/queries/use-projects';
import { useRoles } from "@/application/queries/use-roles";
import { useUsers } from '@/application/queries/use-users';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Note } from '@/domain/note';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

const formSchema = z.object({
  userId: z.string().min(1, {
    message: "Veuillez sélectionner un utilisateur."
  })
});

interface ShareNoteDialogProps {
  note?: Note;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ShareNoteDialog({
  note,
  children,
  open,
  onOpenChange
}: ShareNoteDialogProps) {
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
  const [replyError, setReplyError] = useState<string>();
  const { data: roles } = useRoles();
  const { data: allUsers, isLoading: isLoadingUsers } = useUsers();
  const { data: project, isLoading: isLoadingProject } = useProject({ projectId: note?.projectId });

  const projectUserIds = project?.userIds || [];
  // Filter out users that are already in the project
  const availableUsers = allUsers?.filter((user) => !projectUserIds.includes(user.id));

  const shareNote = useShareNote();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await shareNote.mutateAsync({
        note_id: note!.id,
        user_id: Number(data.userId)
      });
      setDialogOpen(false);
    } catch (error) {
      console.error("Error sharing note:", error);
      setReplyError("Une erreur est survenue lors du partage de la note.");
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Partager la note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utilisateur</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un utilisateur" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={field.value}>
                      {availableUsers &&
                        availableUsers.map((user) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user.username} ({user.email})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Partager</Button>
            </DialogFooter>
            {replyError && (
              <div className="text-red-500 text-sm font-bold text-center mt-4">
                {replyError}
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
