"use client";

import { useCreateTask } from "@/application/mutations/use-create-task";
import { useProjects } from "@/application/queries/use-projects";
import { useStatuses } from '@/application/queries/use-status';
import { useUsers } from "@/application/queries/use-users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit comporter au moins 2 caractères."
  }),
  description: z.string().min(2, {
    message: "La description doit comporter au moins 2 caractères."
  }),
  idProject: z.string().min(1, {
    message: "Veuillez sélectionner un projet."
  }),
  idExecutive: z.string().optional(),
  idDeveloper: z.string().optional()
});

interface AddTaskDialogProps {
  children: React.ReactNode;
}

export function AddTaskDialog({ children }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [replyError, setReplyError] = useState<string>();
  const createTask = useCreateTask();
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: statuses, isLoading: isLoadingStatuses } = useStatuses();
  console.log('🚀 ~ AddTaskDialog ~ statuses:', statuses);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      idProject: "",
      idExecutive: "",
      idDeveloper: ""
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createTask.mutateAsync({
        title: data.title,
        description: data.description,
        id_status: 1,
        id_project: Number(data.idProject),
        id_executive: data.idExecutive ? Number(data.idExecutive) : undefined,
        id_developer: data.idDeveloper ? Number(data.idDeveloper) : undefined
      });
      setOpen(false);
      form.reset();
      setReplyError(undefined);
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
      setReplyError(
        "Une erreur est survenue lors de la création de la tâche : " +
        (error instanceof AxiosError ? error.response?.statusText : String(error))
      );
    }
  }

  if (isLoadingProjects || isLoadingUsers) {
    return <div>Chargement...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une tâche</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour créer une nouvelle tâche.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer le titre de la tâche" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Entrer la description de la tâche"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idProject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projet</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un projet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects &&
                        projects.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={String(project.id)}>
                            {project.name}
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
              name="idExecutive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un responsable (optionnel)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users &&
                        users.map((user) => (
                          <SelectItem
                            key={user.id}
                            value={String(user.id)}>
                            {user.username}
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
              name="idDeveloper"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Développeur</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un développeur (optionnel)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users &&
                        users.map((user) => (
                          <SelectItem
                            key={user.id}
                            value={String(user.id)}>
                            {user.username}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {replyError && (
              <div className="text-sm text-red-500">{replyError}</div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={createTask.isPending}>
                {createTask.isPending ? "Création..." : "Créer la tâche"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
