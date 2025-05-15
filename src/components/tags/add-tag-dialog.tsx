import { useCreateTag } from "@/application/mutations/use-create-tag";
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
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ReplyFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface ReplyForm extends HTMLFormElement {
  readonly elements: ReplyFormElements;
}

interface AddTagDialogProps {
  children: React.ReactNode;
}

export function AddTagDialog({ children }: AddTagDialogProps) {
  const [open, setOpen] = useState(false);
  const [replyError, setReplyError] = useState<string>();
  const createTag = useCreateTag();

  async function handleSubmit(event: React.FormEvent<ReplyForm>) {
    event.preventDefault();

    const name = event.currentTarget.elements.name.value;

    await createTag.mutateAsync({ name });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button>Ok</Button>
          </DialogFooter>
          {replyError && (
            <div className="text-red-500 text-sm font-bold text-center mt-4">
              {replyError}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
