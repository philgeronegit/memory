import { Tag } from "@/domain";
import { Badge } from "../ui/badge";

interface TagProps {
  tag: Tag;
  onDelete: (id: number) => void;
}

export function DeletableTag({ tag, onDelete }: TagProps) {
  return (
    <Badge key={tag.id} className="pr-2">
      {tag.name}
      <span className="cursor-pointer pl-2" onClick={() => onDelete(tag.id)}>
        &times;
      </span>
    </Badge>
  );
}
