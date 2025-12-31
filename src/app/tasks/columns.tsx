"use client";

import { Project } from "@/domain/index";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "description",
    header: "Description"
  }
];
