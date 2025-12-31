"use client";

import { useTasks } from '@/application/queries/use-tasks';
import { AuthWrapper } from "@/components/auth";
import { AddTaskDialog, ModifyTaskDialog } from '@/components/tasks';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Task } from '@/domain/task';
import { hasPermission } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { ListTodo, MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";

export default function Tasks() {
  const { roleUser } = useNotesStore();
  const { data: tasks, isLoading, error } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(
    null
  );
  const [modifyOpen, setModifyOpen] = useState(false);
  const [taskToModify, setTaskToModify] = useState<Task | null>(null);
  const selectedTask = tasks?.find(
    (task) => task.id.toString() === selectedTaskId
  );

  const handleModify = (task: Task) => {
    setTaskToModify(task);
    setModifyOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-2">
        <p>Chargement...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-2">
        <p>Erreur: {error.message}</p>
      </div>
    );
  }

  return (
    <AuthWrapper>
      <div className="p-2">
        {hasPermission(roleUser, "view:tasks") && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Créé par</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead>Développeur</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks?.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id.toString())}
                  className={selectedTaskId === task.id.toString() ? "bg-blue-100 cursor-pointer" : "cursor-pointer"}
                >
                  <TableCell
                    className="w-[100px]">
                    {task.id}
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.createdAt?.toString()}</TableCell>
                  <TableCell>{task.executiveName}</TableCell>
                  <TableCell>{task.projectName}</TableCell>
                  <TableCell>{task.developerName}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() => {
                            // rAF lets the dropdown close and Radix clean up aria-hidden/inert
                            // before opening dialogs, preventing the focus/aria lock that froze the page.
                            requestAnimationFrame(() => {
                              handleModify(task);
                            });
                          }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {hasPermission(roleUser, "create:tasks") && (
          <div className="mt-2">
            <AddTaskDialog>
              <Button size="icon" title="Ajouter une tâche">
                <ListTodo />
              </Button>
            </AddTaskDialog>
          </div>
        )}

        {taskToModify && (
          <ModifyTaskDialog
            open={modifyOpen}
            onOpenChange={(next) => {
              setModifyOpen(next);
              if (!next) setTaskToModify(null);
            }}
            task={taskToModify}
          />
        )}
      </div>
    </AuthWrapper>
  );
}
