import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const SEARCH_VALUES = {
  TEXT: { label: "Texte", value: "text" },
  TAG: { label: "Tag", value: "tag" },
  PROJECT: { label: "Projet", value: "project" },
  CONTRIBUTOR: { label: "Contributeur", value: "contributor" }
};

type SearchSelectProps = {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function SearchSelect({
  defaultValue,
  onValueChange
}: SearchSelectProps) {
  return (
    <Select defaultValue={defaultValue || "text"} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Recherche par" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type de recherche</SelectLabel>
          {Object.entries(SEARCH_VALUES).map(([key, { label, value }]) => (
            <SelectItem key={key} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
