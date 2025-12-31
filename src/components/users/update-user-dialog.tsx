"use client";

import { useUpdateUser } from '@/application/mutations/use-update-user';
import { useRoles } from "@/application/queries/use-roles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User } from "@/domain/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from 'axios';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formUpdateSchema } from "./user-form-schema";

interface UpdateUserDialogProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateUserDialog({ user, isOpen, onClose }: UpdateUserDialogProps) {
  const [replyError, setReplyError] = useState<string>();
  const updateUser = useUpdateUser();
  const { data: roles, isLoading } = useRoles();

  const form = useForm<z.infer<typeof formUpdateSchema>>({
    resolver: zodResolver(formUpdateSchema),
    defaultValues: {
      username: "",
      email: "",
      avatarUrl: "",
      role: "0",
      isAdmin: false
    }
  });

  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        username: user.username ?? "",
        email: user.email ?? "",
        avatarUrl: user.avatarUrl ?? "",
        role: String(user.idRole) ?? "0",
        isAdmin: Boolean(user.isAdmin) ?? false
      });
    }
  }, [user, isOpen, form]);

  async function onSubmit(data: z.infer<typeof formUpdateSchema>) {
    if (!user) return;

    try {
      await updateUser.mutateAsync({
        id: user.id,
        username: data.username,
        email: data.email,
        avatar_url: data.avatarUrl,
        id_role: Number(data.role),
        is_admin: data.isAdmin
      });
      onClose();
      form.reset();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      setReplyError(
        "Une erreur est survenue lors de la mise à jour de l'utilisateur : " + (error instanceof AxiosError ? error.response?.statusText : String(error))
      );
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier l&apos;utilisateur</DialogTitle>
          <DialogDescription>
            Veuillez modifier les informations de l&apos;utilisateur ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row justify-center p-2 gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrer votre nom" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ceci est le nom qui sera affiché dans les commentaires.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrer votre email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrer votre avatar URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles &&
                          roles.map((role) => (
                            <SelectItem key={role.id} value={String(role.id)}>
                              {role.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Est admin</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-center gap-2">
                <Button type="submit">Sauvegarder</Button>
              </div>
            </form>
          </Form>
        </div>
        {replyError && (
          <div className="text-red-500 text-sm mt-2">{replyError}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
