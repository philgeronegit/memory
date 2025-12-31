"use client";

import { useCreateMessage } from "@/application/mutations/use-create-message";
import { useUsers } from "@/application/queries/use-users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(1, "Le message est requis"),
  userId: z.string().min(1, "L'utilisateur est requis")
});

interface CreateMessageDialogProps {
  children: React.ReactNode;
}

export function CreateMessageDialog({ children }: CreateMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const [replyError, setReplyError] = useState<string>();
  const createMessage = useCreateMessage();
  const { data: users, isLoading } = useUsers();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      userId: ""
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createMessage.mutateAsync({
        text: data.text,
        userId: Number(data.userId)
      });
      setOpen(false);
      form.reset();
      setReplyError(undefined);
    } catch (error) {
      console.error("Erreur lors de la création du message:", error);
      setReplyError(
        "Une erreur est survenue lors de la création du message : " +
        (error instanceof AxiosError
          ? error.response?.statusText
          : String(error))
      );
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un message</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row justify-center p-2 gap-4">
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
                        {users &&
                          users.map((user) => (
                            <SelectItem key={user.id} value={String(user.id)}>
                              {user.username}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Sélectionnez l&apos;utilisateur destinataire du message.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Entrer votre message"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Entrez le contenu du message.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {replyError && (
                <div className="text-red-500 text-sm">{replyError}</div>
              )}

              <Button type="submit" disabled={createMessage.isPending}>
                {createMessage.isPending ? "Création..." : "Créer le message"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
