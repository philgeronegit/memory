"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/infrastructure/client";
import useNotesStore from "@/store/useNotesStore";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const { user } = useNotesStore();
  const userId = user?.id;
  const queryClient = useQueryClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Veuillez sélectionner un fichier à télécharger.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file.name);

    try {
      await apiClient.post("/upload/" + userId, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage("Fichier uploadé avec succès : " + file.name);
      queryClient.invalidateQueries({ queryKey: ["uploads", userId] });
    } catch (error) {
      setMessage("Erreur lors de l'upload : " + error);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-4">
        <div className="relative flex items-center gap-2">
          <Input
            id="file"
            name="file"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <Button type="button" className="pointer-events-none" tabIndex={-1}>
            Choisir un fichier
          </Button>
          {file && (
            <span className="ml-2 text-sm text-gray-600 truncate max-w-xs">
              {file.name}
            </span>
          )}
        </div>
        <Button type="submit">Upload</Button>
      </form>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
