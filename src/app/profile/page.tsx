"use client";

import { useUpdateDeveloper } from "@/application/mutations/use-update-developer";
import { useRoles } from "@/application/queries/use-roles";
import { AuthWrapper } from '@/components/auth';
import { TechnicalSkills } from "@/components/technical-skills";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { hasPermission } from '@/lib/auth';
import useNotesStore from "@/store/useNotesStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 charactères."
  }),
  email: z
    .string({
      required_error: "Cet email n'est pas valide."
    })
    .email(),
  avatarUrl: z.string(),
  role: z.string().nonempty(),
  isAdmin: z.boolean().default(false)
});

export default function ProfileForm() {
  const { toast } = useToast();
  const { data: roles, isLoading } = useRoles();
  const updateDeveloper = useUpdateDeveloper();
  const { roleUser, user } = useNotesStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      avatarUrl: user?.avatarUrl ?? "",
      role: String(user?.idRole) ?? "",
      isAdmin: user?.isAdmin ?? false
    }
  });

  useEffect(() => {
    if (user && roles) {
      form.reset({
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl ?? "",
        role: String(user.idRole),
        isAdmin: user.isAdmin ?? false
      });
    }
  }, [user, form, roles]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!user) return;

    await updateDeveloper.mutateAsync({
      id: user.id,
      username: data.username,
      email: data.email,
      avatar_url: data.avatarUrl,
      id_role: Number(data.role),
      is_admin: data.isAdmin
    });

    toast({
      title: "Profil sauvegardé",
      description: <p>Le profil a été sauvegardé avec succès.</p>
    });
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthWrapper>
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

        {hasPermission(roleUser, "view:technicalSkills") && (
          <TechnicalSkills />
        )}
      </div>
    </AuthWrapper>
  );
}
