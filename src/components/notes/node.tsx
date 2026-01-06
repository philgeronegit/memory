import { cn } from "@/lib/utils";
import useNotesStore from "@/store/useNotesStore";
import { File, FileKey, FolderClosed, FolderLock, FolderOpen, FolderOpenDot, Pencil } from "lucide-react";
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

  let noteComponent = <File className="flex-shrink-0" />;
  if (node.data.isNote && !node.data.isPublic) {
    noteComponent = <FileKey className="flex-shrink-0" />;
  }
  if (node.data.isNote === false) {
    if (node.data.isShared) {
      noteComponent = node.isOpen ? (
        <FolderOpenDot className="flex-shrink-0" />
      ) : (
        <FolderLock className="flex-shrink-0" />
      );
    } else {
      noteComponent = node.isOpen ? (
        <FolderOpen className="flex-shrink-0" />
      ) : (
        <FolderClosed className="flex-shrink-0" />
      );
    }
  }

  return (
    <div
      style={style}
      ref={dragHandle}
      className={cn("flex flex-row justify-between items-center", {
        "bg-slate-200 rounded-lg": node.state.isSelected || isSelected
      })}>
      <div
        className={cn("flex flex-row gap-2 overflow-hidden")}
        onClick={() => node.isInternal && node.toggle()}>
        {noteComponent}
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
      </div>
    </div>
  );
};
