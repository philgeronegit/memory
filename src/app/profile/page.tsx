"use client";

import { useDevelopers } from "@/application/queries/use-developers";
import { useRoles } from "@/application/queries/use-roles";
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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
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
      required_error: "Cette email n'est pas valide."
    })
    .email(),
  avatarUrl: z.string(),
  role: z.string(),
  isAdmin: z.boolean().default(false)
});

export default function ProfileForm() {
  const { toast } = useToast();
  const developers = useDevelopers();
  const developer = developers?.data?.[0];
  const roles = useRoles();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: developer?.username ?? "",
      email: developer?.email ?? "",
      avatarUrl: developer?.avatarUrl ?? "",
      role: developer?.role ?? "",
      isAdmin: developer?.isAdmin ?? false
    }
  });

  useEffect(() => {
    if (developer) {
      form.reset({
        username: developer.username ?? "",
        email: developer.email ?? "",
        avatarUrl: developer.avatarUrl ?? "",
        role: developer.role ?? "",
        isAdmin: developer.isAdmin ?? false
      });
    }
  }, [developer, form]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
    <div className="flex justify-center p-2">
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
                    {roles?.data &&
                      roles.data.map((role) => (
                        <SelectItem
                          key={role.id}
                          value={role.name.toLowerCase()}>
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

          <Button type="submit">Sauver</Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}
