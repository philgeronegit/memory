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

interface AddProjectDialogProps {
  children: React.ReactNode;
}

export function AddProjectDialog({ children }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [replyError, setReplyError] = useState<string>();
  // const createProject = useCreateProject();

  async function handleSubmit(event: React.FormEvent<ReplyForm>) {
    event.preventDefault();

    const title = event.currentTarget.elements.name.value;
    const content = "";

    // const result = await createProject.mutateAsync({
    //   title,
    //   content,
    //   type: "text",
    //   is_public: true,
    //   id_programming_language: 1,
    //   id_project: 3,
    //   id_user: 1
    // });

    // if (result.error) {
    //   setReplyError(result.error);
    // } else {
    //   setOpen(false);
    // }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un projet</DialogTitle>
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
