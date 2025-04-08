import { DragEvent, useCallback, useState } from "react";
import { Input } from "../ui/input";

export default function JsonUploader() {
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [jsonData, setJsonData] = useState<unknown | null>(null);
  console.log("🚀 ~ JsonUploader ~ jsonData:", jsonData);

  const handleFileUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setJsonData(json);
          setError(null);
        } catch {
          setError("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    },
    [setJsonData, setError]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!dragActive) setDragActive(true);
    },
    [dragActive, setDragActive]
  );

  const handleDragLeave = useCallback(() => {
    setDragActive(false);
  }, [setDragActive]);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragActive(false);
      const file = event.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [setDragActive, handleFileUpload]
  );

  return (
    <div
      className={`p-4 border rounded-lg shadow-md w-96 mx-auto ${
        dragActive ? "border-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <Input
        type="file"
        accept="application/json"
        onChange={handleInputChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
