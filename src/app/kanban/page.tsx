"use client";

import { AuthWrapper } from '@/components/auth';
import { AddTaskDialog, KanbanBoard } from "@/components/kanban";
import { Button } from "@/components/ui/button";
import { hasPermission } from '@/lib/auth';
import useNotesStore from '@/store/useNotesStore';

export default function Users() {
  const { roleUser } = useNotesStore();

  return (
    <AuthWrapper>
      <div className="h-full p-2">
        <div className="flex justify-center p-2">
          {hasPermission(roleUser, "create:tasks") && (
            <AddTaskDialog>
              <Button>Ajouter une tâche</Button>
            </AddTaskDialog>
          )}

        </div>
        <KanbanBoard />
      </div>
    </AuthWrapper>
  );
}
