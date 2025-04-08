"use client";

import { KanbanBoard } from "@/components/kanban";
import { Button } from "@/components/ui/button";

export default function Users() {
  return (
    <div className="h-full p-2">
      <div className="flex justify-center p-2">
        <Button>Ajouter une tâche</Button>
      </div>
      <KanbanBoard />
    </div>
  );
}
