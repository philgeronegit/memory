import { cn } from "@/lib/utils";
import { File, FolderClosed, FolderOpen, Pencil, Trash } from "lucide-react";
import { NodeRendererProps } from "react-arborist";

export const Node = ({
  node,
  style,
  dragHandle,
  tree
}: NodeRendererProps<{
  id: string;
  name: string;
  isNote: boolean;
  children: { id: string; name: string }[];
}>) => {
  return (
    <div
      style={style}
      ref={dragHandle}
      className={cn("flex flex-row justify-between items-center", {
        "bg-slate-200": node.state.isSelected
      })}>
      <div
        className={cn("flex flex-row gap-2")}
        onClick={() => node.isInternal && node.toggle()}>
        {node.data.isNote ? (
          <File />
        ) : node.isOpen ? (
          <FolderOpen />
        ) : (
          <FolderClosed />
        )}
        <span className="">
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
            <span>{node.data.name}</span>
          )}
        </span>
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
