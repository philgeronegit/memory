import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ReplyFormElements extends HTMLFormControlsCollection {
  aiApiKey: HTMLInputElement;
}

interface ReplyForm extends HTMLFormElement {
  readonly elements: ReplyFormElements;
}

interface OptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OptionsDialog({ isOpen, onClose }: OptionsDialogProps) {
  const [replyError, setReplyError] = useState<string>();

  async function handleSubmit(event: React.FormEvent<ReplyForm>) {
    event.preventDefault();

    const aiApiKey = event.currentTarget.elements.aiApiKey.value;
    if (!aiApiKey) {
      setReplyError("AI API key est requis.");
      return;
    }

    // store in local storage
    localStorage.setItem("aiApiKey", aiApiKey);

    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="aiApiKey" className="text-right">
                AI API key
              </Label>
              <Input id="aiApiKey" name="aiApiKey" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button>Enregistrer</Button>
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
