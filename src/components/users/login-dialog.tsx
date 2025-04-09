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
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface ReplyForm extends HTMLFormElement {
  readonly elements: ReplyFormElements;
}

interface LoginDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function LoginDialog({ open, setOpen }: LoginDialogProps) {
  const [replyError, setReplyError] = useState<string>();

  async function handleSubmit(event: React.FormEvent<ReplyForm>) {
    event.preventDefault();

    const username = event.currentTarget.elements.username.value;
    const password = event.currentTarget.elements.password.value;
    console.log("🚀 ~ handleSubmit ~ username:", username, password);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Utilisateur
              </Label>
              <Input id="username" name="username" className="col-span-3" />
              <Label htmlFor="password" className="text-right">
                Mot de passe
              </Label>
              <Input id="password" name="password" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button>Login</Button>
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
