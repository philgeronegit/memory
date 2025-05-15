import { useState } from "react";

const EditableDiv = () => {
  const [content, setContent] = useState("Editer ce texte...");

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent((e.target as HTMLDivElement).innerText);
  };

  return (
    <div
      className="p-1 border border-gray-300 rounded"
      contentEditable
      onInput={handleInput}>
      {content}
    </div>
  );
};

export default EditableDiv;
