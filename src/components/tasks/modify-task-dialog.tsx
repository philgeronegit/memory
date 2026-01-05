"use client";

import { useUpdateTask } from "@/application/mutations/use-update-task";
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
  DialogTitle
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
import { Task } from "@/domain/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
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
  idDeveloper: z.string().optional(),
  status: z.string().optional()
});

interface ModifyTaskDialogProps {
  task?: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModifyTaskDialog({ task, open, onOpenChange }: ModifyTaskDialogProps) {
  const [replyError, setReplyError] = useState<string>();
  const updateTask = useUpdateTask();
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: statuses, isLoading: isLoadingStatuses } = useStatuses();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      idProject: "",
      idExecutive: "",
      idDeveloper: "",
      status: ""
    }
  });

  useEffect(() => {
    if (task && open) {
      form.reset({
        title: task.title ?? "",
        description: task.description ?? "",
        idProject: String(task.idProject) ?? "",
        idExecutive: task.idExecutive ? String(task.idExecutive) : "",
        idDeveloper: task.idDeveloper ? String(task.idDeveloper) : "",
        status: String(task.idStatus) ?? ""
      });
    }
  }, [task, open, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!task) return;

    try {
      await updateTask.mutateAsync({
        id: task.id,
        title: data.title,
        description: data.description,
        id_status: data.status
      });
      onOpenChange(false);
      form.reset();
      setReplyError(undefined);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
      setReplyError(
        "Une erreur est survenue lors de la mise à jour de la tâche : " +
        (error instanceof AxiosError ? error.response?.statusText : String(error))
      );
    }
  }

  if (isLoadingProjects || isLoadingUsers) {
    return <div>Chargement...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier la tâche</DialogTitle>
          <DialogDescription>
            Veuillez modifier les informations de la tâche ci-dessous.
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
                    defaultValue={field.value}
                    value={field.value}>
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
                    defaultValue={field.value}
                    value={field.value}>
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
                    defaultValue={field.value}
                    value={field.value}>
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses &&
                        statuses.map((status) => (
                          <SelectItem
                            key={status.id}
                            value={String(status.id)}>
                            {status.name}
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
              <Button type="submit" disabled={updateTask.isPending}>
                {updateTask.isPending ? "Mise à jour..." : "Modifier la tâche"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
