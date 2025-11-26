"use client";

import { AddTaskDialog, KanbanBoard } from "@/components/kanban";
import { Button } from "@/components/ui/button";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Users() {
  useAuthRedirect();

  return (
    <div className="h-full p-2">
      <div className="flex justify-center p-2">
        <AddTaskDialog>
          <Button>Ajouter une tâche</Button>
        </AddTaskDialog>
      </div>
      <KanbanBoard />
    </div>
  );
}
