import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

interface EditableTextProps {
  text: string;
  onChange: (text: string) => void;
  onSave: () => void;
}

export function EditableText({ text, onChange, onSave }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      onSave();
    }
  };

  return (
    <div className="">
      {isEditing ? (
        <Input
          type="text"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="w-full p-1 border-none"
        />
      ) : (
        <div
          className="flex items-center justify-between"
          onMouseEnter={(e) => {
            const icon = e.currentTarget.querySelector("svg");
            if (icon) {
              icon.classList.remove("hidden");
            }
          }}
          onMouseLeave={(e) => {
            const icon = e.currentTarget.querySelector("svg");
            if (icon) {
              icon.classList.add("hidden");
            }
          }}>
          <span>{text}</span>

          <Pencil
            className="hidden ml-2 cursor-pointer w-[16px] h-[20px]"
            onClick={handleEditClick}
          />
        </div>
      )}
    </div>
  );
}
