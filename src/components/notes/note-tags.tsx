import { useCreateTag } from "@/application/mutations/use-create-tag";
import { useUpdateNoteTag } from "@/application/mutations/use-update-note-tag";
import { useNote } from "@/application/queries/use-note";
import { useNoteTags } from "@/application/queries/use-note-tags";
import { useTags } from "@/application/queries/use-tags";
import { useToast } from "@/hooks/use-toast";
import useNotesStore from "@/store/useNotesStore";
import { useEffect, useState } from "react";
import { MultiSelect } from "../multi-select/multi-select";

export function NoteTags() {
  const { toast } = useToast();
  const { roleUser, selectedNoteId } = useNotesStore();
  const { data: note } = useNote({ noteId: selectedNoteId });
  const {
    data: noteTags,
    isLoading: isLoadingTags,
    error: errorTags
  } = useNoteTags({ noteId: selectedNoteId });
  const { data: tags } = useTags();
  const createTag = useCreateTag();
  const updateNoteTag = useUpdateNoteTag();
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const tagsList =
    tags?.map((tag) => ({
      value: String(tag.id),
      label: tag.name
    })) ?? [];
  const isCreatorOfNote = roleUser?.id === note?.idUser;

  useEffect(() => {
    if (!selectedNoteId) {
      return;
    }
    const selectedTags = noteTags?.map((tag) => String(tag.id));
    setSelectedTags(selectedTags);
  }, [noteTags, selectedNoteId]);

  const onCreateNewTag = async (name: string) => {
    if (!selectedNoteId) {
      toast({
        title: "Erreur",
        description: (
          <p>Impossible de créer un nouveau tag sans note sélectionnée.</p>
        )
      });
      return;
    }
    const tag = await createTag.mutateAsync({ name });
    // await updateNoteTag.mutateAsync({
    //   idNote: selectedNoteId,
    //   tagIds: tags.map((tag) => Number(tag))
    // });
    // toast({
    //   title: "Tag créé",
    //   description: <p>Le tag "{name}" a été créé avec succès.</p>
    // });
  };

  const onValueChange = async (tags: string[]) => {
    if (!selectedNoteId) {
      return;
    }

    await updateNoteTag.mutateAsync({
      idNote: selectedNoteId,
      tagIds: tags.map((tag) => Number(tag))
    });
    toast({
      title: "Tags mis à jour",
      description: <p>Les tags ont été mis à jour.</p>
    });

    // if (!selectedTags) {
    //   return;
    // }

    // if (tags.length > selectedTags.length) {
    //   // find tag in tags that is not in selectedTags
    //   const newTag = tags.find((tag) => !selectedTags.includes(tag));
    //   if (newTag) {
    //     console.log("new tag", newTag);
    //   }
    // } else {
    //   const deletedTag = selectedTags.find((tag) => !tags.includes(tag));
    //   if (deletedTag) {
    //     console.log("deleted tag", deletedTag);
    //   }
    // }
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
          onCreateNew={onCreateNewTag}
          defaultValue={selectedTags}
          placeholder="Tags"
          variant="inverted"
          animation={2}
          maxCount={3}
          disabled={!isCreatorOfNote}
        />
      </div>
    </div>
  );
}
