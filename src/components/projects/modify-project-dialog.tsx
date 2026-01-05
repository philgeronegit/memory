"use client";

import { useUpdateProject } from "@/application/mutations/use-update-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/domain/project";
import React, { useState } from "react";

interface ModifyFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
}

interface ModifyForm extends HTMLFormElement {
  readonly elements: ModifyFormElements;
}

interface ModifyProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project;
}

export function ModifyProjectDialog({ open, onOpenChange, project }: ModifyProjectDialogProps) {
  const [formError, setFormError] = useState<string>();
  const updateProject = useUpdateProject();

  async function handleSubmit(event: React.FormEvent<ModifyForm>) {
    event.preventDefault();
    setFormError(undefined);

    const name = event.currentTarget.elements.name.value;
    const description = event.currentTarget.elements.description.value;

    if (!project) {
      setFormError("Aucun projet sélectionné pour la modification.");
      return;
    }

    if (!name.trim()) {
      setFormError("Le nom du projet est requis.");
      return;
    }

    try {
      await updateProject.mutateAsync({
        id: project.id,
        name,
        description
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error updating project:", error);
      setFormError("Une erreur est survenue lors de la modification du projet.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le projet</DialogTitle>
          <DialogDescription>
            Mettre à jour le nom et la description du projet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={project?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                defaultValue={project?.description}
                className="col-span-3"
              />
            </div>
            {formError && (
              <div className="text-red-500 text-sm text-center">
                {formError}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={updateProject.isPending}>
              {updateProject.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
