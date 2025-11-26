"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useBulkUpdateTaskOrder } from "@/application/mutations/use-bulk-update-task-order";
import { useTasks } from "@/application/queries/use-tasks";
import { toSnakeCase } from "@/lib/utils";
import useNotesStore from "@/store/useNotesStore";
import {
  Announcements,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import type { Column } from "./board-column";
import { BoardColumn, BoardContainer } from "./board-column";
import { coordinateGetter } from "./multiple-containers-keyboard-preset";
import { type Task, TaskCard } from "./task-card";
import { hasDraggableData } from "./utils";

const defaultCols = [
  {
    id: "en_cours" as const,
    title: "En cours"
  },
  {
    id: "a_faire" as const,
    title: "A faire"
  },
  {
    id: "fait" as const,
    title: "Fait"
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export function KanbanBoard() {
  const { roleUser } = useNotesStore();
  const userId = roleUser?.id;
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const data = useTasks({ userId });
  const [tasks, setTasks] = useState<Task[]>([]);
  // const updateTask = useUpdateTask();
  const bulkUpdateTaskOrder = useBulkUpdateTaskOrder();

  useEffect(() => {
    const initialTasks: Task[] =
      data?.data?.map((task) => ({
        id: task.id,
        columnId: toSnakeCase(task.status) as ColumnId,
        title: task.title,
        content: task.description,
        order: task.order || 0
      })) ?? [];

    // Sort tasks by order within each column
    const sortedTasks = initialTasks.sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
    setTasks(sortedTasks);
  }, [data?.data]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter
    })
  );

  // Helper function to calculate new task orders for a column
  function recalculateTaskOrders(columnTasks: Task[]): Task[] {
    return columnTasks.map((task, index) => ({
      ...task,
      order: index + 1
    }));
  }

  // Helper function to update task orders in database
  async function updateTaskOrders(updatedTasks: Task[]) {
    const tasksToUpdate = updatedTasks.map((task) => ({
      id: task.id as number,
      order: task.order || 0,
      status: task.columnId
    }));

    try {
      await bulkUpdateTaskOrder.mutateAsync({
        tasks: tasksToUpdate
      });
    } catch (error) {
      console.error("Failed to update task orders:", error);
    }
  }

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.columnId === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startColumnIdx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.columnId;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${
          active.data.current.task.content
        } at position: ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.content
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    }
  };

  return (
    <DndContext
      accessibility={{
        announcements
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}>
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks
                .filter((task) => task.columnId === col.id)
                .sort((a, b) => (a.order || 0) - (b.order || 0))}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks
                  .filter((task) => task.columnId === activeColumn.id)
                  .sort((a, b) => (a.order || 0) - (b.order || 0))}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    const isActiveAColumn = activeData?.type === "Column";
    const isActiveATask = activeData?.type === "Task";

    // Handle column reordering (existing logic)
    if (isActiveAColumn) {
      // For columns, we can skip if trying to drop on itself
      if (activeId === overId) return;
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );
        console.log(`Active index: ${activeColumnIndex}`);
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
        console.log(`Over index: ${overColumnIndex}`);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }

    // Handle task reordering - update database
    if (isActiveATask) {
      // Update task orders in database after drag operation completes
      updateTaskOrders(tasks);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];

        if (!activeTask || !overTask) return tasks;

        // Move task to new column if different
        if (activeTask.columnId !== overTask.columnId) {
          activeTask.columnId = overTask.columnId;
        }

        // Move the task in the array
        const newTasks = arrayMove(tasks, activeIndex, overIndex);

        // Recalculate orders for affected columns
        const affectedColumns = new Set([
          activeTask.columnId,
          overTask.columnId
        ]);
        const updatedTasks = [...newTasks];

        affectedColumns.forEach((columnId) => {
          const columnTasks = updatedTasks.filter(
            (task) => task.columnId === columnId
          );
          const reorderedTasks = recalculateTaskOrders(columnTasks);

          reorderedTasks.forEach((reorderedTask) => {
            const taskIndex = updatedTasks.findIndex(
              (t) => t.id === reorderedTask.id
            );
            if (taskIndex !== -1) {
              updatedTasks[taskIndex] = reorderedTask;
            }
          });
        });

        return updatedTasks;
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];

        if (!activeTask) return tasks;

        const previousColumnId = activeTask.columnId;
        activeTask.columnId = overId as ColumnId;

        // Get tasks in the target column to determine new order
        const targetColumnTasks = tasks.filter((t) => t.columnId === overId);
        const newOrder = targetColumnTasks.length + 1;
        activeTask.order = newOrder;

        const updatedTasks = [...tasks];
        updatedTasks[activeIndex] = activeTask;

        // Recalculate orders for both affected columns
        const affectedColumns = [previousColumnId, overId as ColumnId];

        affectedColumns.forEach((columnId) => {
          const columnTasks = updatedTasks.filter(
            (task) => task.columnId === columnId
          );
          const reorderedTasks = recalculateTaskOrders(columnTasks);

          reorderedTasks.forEach((reorderedTask) => {
            const taskIndex = updatedTasks.findIndex(
              (t) => t.id === reorderedTask.id
            );
            if (taskIndex !== -1) {
              updatedTasks[taskIndex] = reorderedTask;
            }
          });
        });

        return updatedTasks;
      });
    }
  }
}
