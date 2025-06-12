"use client";

import { useUserUploads } from "@/application/queries/use-user-uploads";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Upload } from "@/domain/upload";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/infrastructure/client";
import useNotesStore from "@/store/useNotesStore";
import { useState } from "react";

export function Uploads() {
  const { user } = useNotesStore();
  const {
    data: uploads,
    isLoading,
    error
  } = useUserUploads({
    userId: user?.id
  });
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const { toast } = useToast();

  const handleClick = (upload: Upload) => {
    const fullPath = `![${upload.name}](${BASE_URL}/${upload.path})`;
    navigator.clipboard.writeText(fullPath).then(() => {
      toast({
        title: "URL copiée",
        description: (
          <p>{`URL de l'image copiée dans le presse-papiers : ${fullPath}`}</p>
        )
      });
    });
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <ul>
          {uploads?.map((upload) => (
            <li
              key={upload.path}
              className="cursor-pointer flex justify-between items-center hover:bg-slate-300 p-1 rounded">
              <div
                className="overflow-hidden text-ellipsis"
                onClick={() => handleClick(upload)}>
                {upload.name}
              </div>
              <div>
                <Popover
                  open={openPopover === upload.path}
                  onOpenChange={(open) =>
                    setOpenPopover(open ? upload.path : null)
                  }>
                  <PopoverTrigger asChild>
                    <img
                      src={`${BASE_URL}/${upload.path}`}
                      alt={upload.name}
                      width={64}
                      height={64}
                      className="ml-2 inline-block rounded shadow hover:ring-2 hover:ring-primary transition"
                      onMouseEnter={() => setOpenPopover(upload.path)}
                      onMouseLeave={() => setOpenPopover(null)}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    align="center"
                    className="flex items-center justify-center w-auto h-auto bg-white p-2"
                    onMouseEnter={() => setOpenPopover(upload.path)}
                    onMouseLeave={() => setOpenPopover(null)}>
                    <img
                      src={`${BASE_URL}/${upload.path}`}
                      alt={upload.name}
                      width={256}
                      height={256}
                      className="rounded shadow-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isLoading && <p>Chargement...</p>}
    </div>
  );
}
