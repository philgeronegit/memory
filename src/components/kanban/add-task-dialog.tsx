import { useCreateTask } from "@/application/mutations/use-create-task";
import { useProjects } from "@/application/queries/use-projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/domain/project";
import useNotesStore from "@/store/useNotesStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
  title: z.string().min(2, {
    message: "Le titre doit comporter au moins 2 caractères."
  }),
  description: z.string(),
  status: z.string(),
  projectId: z.string()
});

interface AddTaskDialogProps {
  children: React.ReactNode;
}

const statusOptions = [
  { value: "A faire", label: "A faire" },
  { value: "En Cours", label: "En Cours" },
  { value: "Fait", label: "Fait" }
];

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ children }) => {
  const { roleUser } = useNotesStore();
  const userId = roleUser?.id;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const createTask = useCreateTask();
  const { data: projects } = useProjects({ userId });
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  useEffect(() => {
    if (projects) {
      setProjectsList(projects);
    }
  }, [projects]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "A faire",
      projectId: ""
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createTask.mutateAsync({
        title: data.title,
        description: data.description,
        id_status: 1,
        id_project: Number(data.projectId),
        id_executive: 9,
        id_developer: Number(userId),
        priority: "medium"
      });
      form.reset();
      setOpen(false);
      setError(undefined);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Une erreur est survenue lors de la création de la tâche.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une tâche</DialogTitle>
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
                    <Input placeholder="Entrer un titre" {...field} />
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
                      placeholder="Entrer une description"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
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
              name="projectId"
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
                      {projectsList?.length > 0 &&
                        projectsList.map((project) => (
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

            {error && (
              <div className="text-red-500 text-sm font-bold text-center mt-4">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button type="submit" disabled={createTask.isPending}>
                {createTask.isPending ? "Création..." : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
