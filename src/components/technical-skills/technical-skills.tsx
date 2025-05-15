"use client";

import { useUserTechnicalSkills } from "@/application/queries/use-user-technical-skill";
import { TechnicalSkill } from "@/domain/technical-skill";
import useNotesStore from "@/store/useNotesStore";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { IncrementorInput } from "../ui/incrementor-input";

export function TechnicalSkills() {
  const { roleUser } = useNotesStore();
  const userId = roleUser?.id;
  const { data: skills, isLoading, error } = useUserTechnicalSkills({ userId });
  const [yearOfExperience, setYearOfExperience] = useState("0");

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
  if (!skills) {
    return (
      <div className="p-2">
        <p>Aucune compétence technique trouvée.</p>
      </div>
    );
  }

  const handleChangeYearOfExperience = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYearOfExperience(event.target.value);
  };

  const handleEditExperience = (skill: TechnicalSkill) => {
    console.log("🚀 ~ handleEditExperience ~ skill:", skill);
  };

  return (
    <div className="p-2">
      <h3>Compétences techniques</h3>

      <p className="p-2">
        <IncrementorInput
          min={0}
          max={50}
          step={1}
          value={yearOfExperience}
          onChange={handleChangeYearOfExperience}
        />
      </p>
      {skills?.map((skill) => (
        <div
          key={skill.id}
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{skill.name}</p>
            <p className="text-sm text-muted-foreground">
              <span>{`${skill.yearOfExperience} ans d'expérience `}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditExperience(skill)}>
                <Pencil />
              </Button>
            </p>
            {/* <Input type="number" defaultValue={skill.yearOfExperience} /> */}
          </div>
        </div>
      ))}

      <div className="flex justify-center gap-2">
        <Button>Ajouter</Button>
      </div>
    </div>
  );
}
