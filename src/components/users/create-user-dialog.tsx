"use client";

import { useCreateUser } from "@/application/mutations/use-create-user";
import { useRoles } from "@/application/queries/use-roles";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 charactères."
  }),
  password: z.string().min(4, {
    message: "Le mot de passe doit comporter au moins 4 charactères."
  }),
  email: z
    .string({
      required_error: "Cet email n'est pas valide."
    })
    .email(),
  avatarUrl: z.string(),
  role: z.number().min(1).optional(),
  isAdmin: z.boolean().default(false)
});

interface CreateUserDialogProps {
  children: React.ReactNode;
}

export function CreateUserDialog({ children }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [replyError, setReplyError] = useState<string>();
  const createUser = useCreateUser();
  const { data: roles, isLoading } = useRoles();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      avatarUrl: "",
      role: 0,
      isAdmin: false
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createUser.mutateAsync({
        username: data.username,
        password: data.password,
        email: data.email,
        avatar_url: data.avatarUrl,
        id_role: Number(data.role),
        is_admin: data.isAdmin
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      setReplyError(
        "Une erreur est survenue lors de la création de l'utilisateur."
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
          <DialogTitle>Créer un utilisateur</DialogTitle>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        {...field}
                      />
                    </FormControl>
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
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent defaultValue={field.value}>
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
