import { useCreateNote } from "@/application/mutations/use-create-note";
import { useProgrammingLanguages } from "@/application/queries/use-programming-languages";
import { useUserProjects } from "@/application/queries/use-projects";
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
import { Textarea } from '@/components/ui/textarea';
import useNotesStore from "@/store/useNotesStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Switch } from "../ui/switch";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit comporter au moins 2 charactères."
  }),
  content: z.string(),
  isPublic: z.boolean().default(false),
  projectId: z.string().optional(),
  programmingLanguageId: z.string().optional()
});

interface AddNoteDialogProps {
  children: React.ReactNode;
}

export function AddNoteDialog({ children }: AddNoteDialogProps) {
  const { roleUser } = useNotesStore();
  const userId = roleUser?.id;
  const [open, setOpen] = useState(false);
  const [replyError, setReplyError] = useState<string>();
  const createNote = useCreateNote();
  const { data: programmingLanguages } = useProgrammingLanguages();
  const { data: projects } = useUserProjects({ userId });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!userId) {
      setReplyError("Utilisateur non trouvé.");
      return;
    }

    try {
      await createNote.mutateAsync({
        title: data.title,
        content: data.content,
        type: "text",
        is_public: data.isPublic,
        id_project: Number(data.projectId),
        id_programming_language: Number(data.programmingLanguageId),
        id_user: userId
      });
      setOpen(false);
    } catch (error) {
      console.error("Error creating note:", error);
      setReplyError("Une erreur est survenue lors de la création de la note.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer un nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
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
                    <SelectContent defaultValue={field.value}>
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
              name="programmingLanguageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Langage de programmation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un langage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={field.value}>
                      {programmingLanguages &&
                        programmingLanguages.map((language) => (
                          <SelectItem
                            key={language.id}
                            value={String(language.id)}>
                            {language.name}
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
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Est publique</FormLabel>
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

            <DialogFooter>
              <Button type="submit">Ok</Button>
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
