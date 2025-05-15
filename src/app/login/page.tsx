"use client";

import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/users";
import useNotesStore from "@/store/useNotesStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [open, setOpen] = useState(false);
  const { user } = useNotesStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <div className="p-4 text-center">
        Vous devez vous connecter pour utiliser cette application
      </div>
      <div className="flex justify-center p-2">
        <Button onClick={() => setOpen(true)}>Login</Button>
      </div>

      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  );
}
