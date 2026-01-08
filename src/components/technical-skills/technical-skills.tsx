"use client";

import { useAddTechnicalSkillToUser } from '@/application/mutations/use-add-technical-skill-to-user';
import { useCreateTechnicalSkill } from "@/application/mutations/use-create-technical-skill";
import { useDeleteTechnicalSkillFromUser } from '@/application/mutations/use-delete-technical-skill-from-user';
import { useUpdateTechnicalSkillForUser } from '@/application/mutations/use-update-technical-skill-for-user';
import { useTechnicalSkills } from "@/application/queries/use-technical-skills";
import { useUserTechnicalSkills } from "@/application/queries/use-user-technical-skill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TechnicalSkill } from "@/domain/technical-skill";
import { hasPermission } from '@/lib/auth';
import useNotesStore from "@/store/useNotesStore";
import { Check, Edit2, Plus, Trash2, X } from "lucide-react";
import React from "react";

export function TechnicalSkills() {
  const { roleUser } = useNotesStore();
  const userId = roleUser?.id;
  const { data: userSkills, isLoading, error } = useUserTechnicalSkills({ userId });
  const { data: allSkills } = useTechnicalSkills();
  const createSkill = useCreateTechnicalSkill();
  const updateSkillForUser = useUpdateTechnicalSkillForUser();
  const deleteSkillFromUser = useDeleteTechnicalSkillFromUser();
  const addTechnicalSkillToUser = useAddTechnicalSkillToUser();

  const [selectedSkillName, setSelectedSkillName] = React.useState("");
  const [newSkillName, setNewSkillName] = React.useState("");
  const [yearOfExperience, setYearOfExperience] = React.useState("1");
  const [isCreatingNew, setIsCreatingNew] = React.useState(false);
  const [editingSkillId, setEditingSkillId] = React.useState<number | null>(null);
  const [editYears, setEditYears] = React.useState("");

  if (isLoading) {
    return (
      <div className="p-2">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2">
        <p>Erreur: {error.message}</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-2">
        <p>Veuillez vous connecter pour gérer vos compétences techniques.</p>
      </div>
    );
  }

  const handleAddSkill = async () => {
    if (!userId) return;

    const skillName = isCreatingNew ? newSkillName.trim() : selectedSkillName;
    if (!skillName) return;

    const years = parseInt(yearOfExperience);
    if (isNaN(years) || years < 0) return;

    try {
      let skillId: number;

      if (isCreatingNew) {
        // Create the new skill first
        const createdSkill = await createSkill.mutateAsync({
          name: newSkillName.trim()
        });
        skillId = createdSkill.id;
      } else {
        // Find the existing skill ID
        const existingSkill = allSkills?.find(skill => skill.name === selectedSkillName);
        if (!existingSkill) return;
        skillId = existingSkill.id;
      }

      // Add the skill to the user
      await addTechnicalSkillToUser.mutateAsync({
        id: skillId,
        userId: userId,
        yearOfExperience: years
      });

      // Reset form
      setSelectedSkillName("");
      setNewSkillName("");
      setYearOfExperience("1");
      setIsCreatingNew(false);
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };

  const handleUpdateSkill = async (skillId: number) => {
    const years = parseInt(editYears);
    if (isNaN(years) || years < 0) return;

    try {
      await updateSkillForUser.mutateAsync({
        id: skillId,
        userId: userId,
        yearOfExperience: years
      });
      setEditingSkillId(null);
      setEditYears("");
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    try {
      await deleteSkillFromUser.mutateAsync({
        id: skillId,
        userId: userId
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const startEditing = (skill: TechnicalSkill) => {
    setEditingSkillId(skill.id);
    setEditYears(skill.yearOfExperience.toString());
  };

  const cancelEditing = () => {
    setEditingSkillId(null);
    setEditYears("");
  };

  // Get skills that user doesn't have yet
  const availableSkills = allSkills?.filter(
    skill => !userSkills?.some(userSkill => userSkill.name === skill.name)
  ) || [];

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Compétences techniques</CardTitle>
          <CardDescription>
            Gérez vos compétences techniques et années d&apos;expérience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new skill section */}
          {hasPermission(roleUser, "create:technicalSkills") && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Ajouter une compétence</h4>
              <div className="flex gap-2">
                <Button
                  variant={!isCreatingNew ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsCreatingNew(false)}
                >
                  Choisir existante
                </Button>
                <Button
                  variant={isCreatingNew ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsCreatingNew(true)}
                >
                  Créer nouvelle
                </Button>
              </div>

              <div className="grid gap-3">
                {isCreatingNew ? (
                  <Input
                    placeholder="Nom de la compétence"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                  />
                ) : (
                  <Select value={selectedSkillName} onValueChange={setSelectedSkillName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une compétence" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSkills.length === 0 ? (
                        <SelectItem value="none" disabled>
                          Aucune compétence disponible
                        </SelectItem>
                      ) : (
                        availableSkills.map((skill) => (
                          <SelectItem key={skill.id} value={skill.name}>
                            {skill.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}

                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="Années d'expérience"
                    value={yearOfExperience}
                    onChange={(e) => setYearOfExperience(e.target.value)}
                    className="w-32"
                  />
                  <Button
                    onClick={handleAddSkill}
                    disabled={
                      createSkill.isPending ||
                      (!isCreatingNew && !selectedSkillName) ||
                      (isCreatingNew && !newSkillName.trim())
                    }
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Skills list */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Mes compétences</h4>
            {!userSkills || userSkills.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune compétence technique ajoutée.
              </p>
            ) : (
              <div className="space-y-2">
                {userSkills.map((skill) => (
                  <Card key={skill.id} className="p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <Badge variant="secondary" className="text-sm">
                          {skill.name}
                        </Badge>
                        {editingSkillId === skill.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="50"
                              value={editYears}
                              onChange={(e) => setEditYears(e.target.value)}
                              className="w-24 h-8"
                            />
                            <span className="text-sm text-muted-foreground">
                              {parseInt(editYears) > 1 ? "ans" : "an"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {skill.yearOfExperience} {skill.yearOfExperience > 1 ? "ans" : "an"}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {editingSkillId === skill.id ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleUpdateSkill(skill.id)}
                              disabled={updateSkillForUser.isPending}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={cancelEditing}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            {hasPermission(roleUser, "update:technicalSkills") && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => startEditing(skill)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            )}
                            {hasPermission(roleUser, "delete:technicalSkills") && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => handleDeleteSkill(skill.id)}
                                disabled={deleteSkillFromUser.isPending}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
