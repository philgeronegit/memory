import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function SearchSelect() {
  return (
    <Select defaultValue={"text"}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Recherche par" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type de recherche</SelectLabel>
          <SelectItem value="text">Texte</SelectItem>
          <SelectItem value="tag">Tag</SelectItem>
          <SelectItem value="project">Projet</SelectItem>
          <SelectItem value="contributor">Contributeur</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
