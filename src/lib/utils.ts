import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSnakeCase(str: string) {
  return str
    .split(" ")
    .map((word) => word)
    .join("_")
    .replace(/[A-Z]/g, (letter) => `${letter.toLowerCase()}`);
}
