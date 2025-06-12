"use client";

import { useUserUploads } from "@/application/queries/use-user-uploads";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FileUpload } from "@/components/uploads";
import { BASE_URL } from "@/infrastructure/client";
import useNotesStore from "@/store/useNotesStore";
import { useState } from "react";

export default function Uploads() {
  const { user } = useNotesStore();
  const {
    data: uploads,
    isLoading,
    error
  } = useUserUploads({
    userId: user?.id
  });
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-2">
        <p>Chargement...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-2">
        <p>Erreur: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <FileUpload />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Chemin</TableHead>
            <TableHead>Thumbnail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads?.map((upload) => (
            <TableRow key={upload.path}>
              <TableCell className="w-[100px]">{upload.name}</TableCell>
              <TableCell>{upload.path}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
