import { cn } from "@/lib/utils";
import useNotesStore from "@/store/useNotesStore";
import { File, FolderClosed, FolderOpen, Pencil, Trash } from "lucide-react";
import { NodeRendererProps } from "react-arborist";
import { NoteItem } from "./note-item";

export const Node = ({
  node,
  style,
  dragHandle,
  tree
}: NodeRendererProps<NoteItem>) => {
  const { selectedNoteId } = useNotesStore();
  const isSelected = selectedNoteId === Number(node.id);

  return (
    <div
      style={style}
      ref={dragHandle}
      className={cn("flex flex-row justify-between items-center", {
        "bg-slate-200": node.state.isSelected || isSelected
      })}>
      <div
        className={cn("flex flex-row gap-2 overflow-hidden")}
        onClick={() => node.isInternal && node.toggle()}>
        {node.data.isNote ? (
          <File className="flex-shrink-0" />
        ) : node.isOpen ? (
          <FolderOpen className="flex-shrink-0" />
        ) : (
          <FolderClosed className="flex-shrink-0" />
        )}
        <div className="overflow-hidden">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === "Escape") node.reset();
                if (e.key === "Enter") node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <div className="truncate">{node.data.name}</div>
          )}
        </div>
      </div>
      <div className="flex gap-1">
        <button onClick={() => node.edit()} title="Renommer">
          <Pencil size={12} />
        </button>
        <button onClick={() => tree.delete(node.id)} title="Supprimer">
          <Trash size={12} />
        </button>
      </div>
    </div>
  );
};
