"use client";

import { useTags } from "@/application/queries/use-tags";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { AddTagDialog } from "./add-tag-dialog";

export function Tags() {
  const { data, isLoading, error } = useTags();

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Tags
      </h3>

      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <div className="flex gap-2">
          {data?.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}

      <AddTagDialog>
        <div className="flex justify-end">
          <Button variant="outline" size="icon" title="Ajouter un tag">
            <Plus />
          </Button>
        </div>
      </AddTagDialog>
    </div>
  );
}
