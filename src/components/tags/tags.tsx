"use client";

import { useDeleteTag } from "@/application/mutations/use-delete-tag";
import { useTags } from "@/application/queries/use-tags";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { AddTagDialog } from "./add-tag-dialog";
import { DeletableTag } from "./deletable-tag";

export function Tags() {
  const { data, isLoading, error } = useTags();
  const deleteTag = useDeleteTag();

  async function onDelete(id: number) {
    await deleteTag.mutateAsync(id);
  }

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-1">
        Tags
      </h3>

      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <div className="flex gap-2 flex-wrap">
          {data?.map((tag) => (
            <DeletableTag key={tag.id} tag={tag} onDelete={onDelete} />
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}

      <AddTagDialog>
        <div className="flex justify-end">
          <Button size="icon" title="Ajouter un tag">
            <Plus />
          </Button>
        </div>
      </AddTagDialog>
    </div>
  );
}
