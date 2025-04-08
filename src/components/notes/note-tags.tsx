import { useCreateNoteTag } from "@/application/mutations/use-create-note-tag";
import { useDeleteNoteTag } from "@/application/mutations/use-delete-note-tag";
import { useNoteTags } from "@/application/queries/use-note-tags";
import { useTags } from "@/application/queries/use-tags";
import useNotesStore from "@/store/useNotesStore";
import { useEffect, useState } from "react";
import { MultiSelect } from "../multi-select/multi-select";

export function NoteTags() {
  const { selectedNoteId } = useNotesStore();
  const {
    data: noteTags,
    isLoading: isLoadingTags,
    error: errorTags
  } = useNoteTags({ noteId: selectedNoteId });
  const { data: tags } = useTags();
  const createNoteTag = useCreateNoteTag();
  const deleteNoteTag = useDeleteNoteTag();
  const [selectedTags, setSelectedTags] = useState<string[]>();
  console.log("🚀 ~ NoteTags ~ tags:", tags);
  const tagsList =
    tags?.map((tag) => ({
      value: String(tag.id),
      label: tag.name
    })) ?? [];

  useEffect(() => {
    if (!selectedNoteId) {
      return;
    }
    const selectedTags = noteTags?.map((tag) => String(tag.id));
    setSelectedTags(selectedTags);
  }, [noteTags, selectedNoteId]);

  const onValueChange = (tags: string[]) => {
    if (!selectedTags) {
      return;
    }

    if (tags.length > selectedTags.length) {
      // find tag in tags that is not in selectedTags
      const newTag = tags.find((tag) => !selectedTags.includes(tag));
      if (newTag) {
        console.log("new tag", newTag);
      }
    } else {
      const deletedTag = selectedTags.find((tag) => !tags.includes(tag));
      if (deletedTag) {
        console.log("deleted tag", deletedTag);
      }
    }
    setSelectedTags(tags);
  };

  return (
    <div className=" ">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-1">
        Tags
      </h4>
      {errorTags && <p>Erreur: {errorTags.message}</p>}
      {isLoadingTags && <p>Chargement...</p>}
      <div className="flex flex-wrap gap-2">
        <MultiSelect
          options={tagsList}
          onValueChange={onValueChange}
          defaultValue={selectedTags}
          placeholder="Tags"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
    </div>
  );
}
